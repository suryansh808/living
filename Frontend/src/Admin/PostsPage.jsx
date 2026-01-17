import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Toaster, toast } from "react-hot-toast";
import { getDriveMedia } from "../utils/driveImage";
import * as adminService from "../services/adminService";
import { ConfirmDialog } from "../Components/ConfirmDialog";
import AdminSidebar from "./AdminSidebar";
import { PostPreview } from "../Components/PostPreview";


const initialForm = {
  mediaType: "image",
  mediaUrl: "",
  title: "",
  paragraph: "",
  postedBy: "",
};

const PostsPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [posts, setPosts] = useState([]);

  const [form, setForm] = useState(initialForm);

  const [modalOpen, setModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);

  const [loadingCat, setLoadingCat] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await adminService.fetchCategories();
        setCategories(data);

        if (data.length) {
          setSelectedCategory(data[0]);
          loadPosts(data[0]._id);
        }
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCat(false);
      }
    };

    load();
  }, []);

  const loadPosts = async (categoryId) => {
    try {
      setLoadingPosts(true);
      const { data } = await adminService.fetchPostsByCategory(categoryId);
      setPosts(data);
    } catch {
      toast.error("Failed to load posts");
    } finally {
      setLoadingPosts(false);
    }
  };

  // OPEN MODAL FOR CREATE
  const openCreateModal = () => {
    setEditId(null);
    setForm(initialForm);
    setModalOpen(true);
  };

  // OPEN MODAL FOR EDIT
  const openEditModal = (post) => {
    setEditId(post._id);

    setForm({
      mediaType: post.mediaType || "image",
      mediaUrl: post.mediaUrl || "",
      title: post.title || "",
      paragraph: post.paragraph || "",
      postedBy: post.postedBy || "",
    });

    setModalOpen(true);
  };

  // SINGLE SUBMIT HANDLER FOR BOTH CREATE + EDIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedCategory) return;

    try {
      const processed = getDriveMedia(form.mediaUrl, form.mediaType);

      const payload = {
        ...form,
        mediaUrl: processed.url,
        mediaType: processed.type,
      };

      if (editId) {
        // EDIT MODE
        await adminService.updatePost(editId, payload);
        toast.success("Post Updated Successfully");
      } else {
        // CREATE MODE
        await adminService.createPost({
          categoryId: selectedCategory._id,
          ...payload,
        });

        toast.success("Post Created Successfully");
      }

      setModalOpen(false);
      setEditId(null);
      setForm(initialForm);

      loadPosts(selectedCategory._id);
    } catch {
      toast.error("Operation failed");
    }
  };

  const confirmDelete = async () => {
    try {
      await adminService.deletePost(deleteId);

      toast.success("Post Deleted");

      setDeleteId(null);
      loadPosts(selectedCategory._id);
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setEditId(null);
    setForm(initialForm);
  };

  const isEditing = Boolean(editId);

  return (
    <AdminLayout sidebar={<AdminSidebar />}>
      <main className="flex-1 p-8">
        <Toaster />

        <h1 className="text-2xl font-bold mb-6">Manage Posts</h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-4 rounded-xl">
            {loadingCat ? (
              <p>Loading...</p>
            ) : (
              categories.map((cat) => (
                <div
                  key={cat._id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    loadPosts(cat._id);
                  }}
                  className={`p-2 cursor-pointer ${
                    selectedCategory?._id === cat._id
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </div>
              ))
            )}
          </div>

          <div className="col-span-3 bg-white p-6 rounded-xl">
            <button
              onClick={openCreateModal}
              className="bg-indigo-600 cursor-pointer text-white px-4 py-2 rounded mb-4"
            >
              Add Post
            </button>

            {loadingPosts ? (
              <p>Loading...</p>
            ) : posts.length === 0 ? (
              <p>No posts in this category</p>
            ) : (
              posts.map((p) => (
                <div key={p._id} className="flex justify-between border-b py-2">
                  <span>{p.title}</span>

                  <div className="flex items-center gap-5">
                    <button
                      onClick={() => setDeleteId(p._id)}
                      className="text-red-600 text-xl cursor-pointer"
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>

                    <button
                      onClick={() => openEditModal(p)}
                      className="text-blue-600 text-xl cursor-pointer"
                    >
                      <i className="fa fa-pencil-square-o"></i>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* SINGLE UNIFIED MODAL */}
      {modalOpen && (
  <form
    onSubmit={handleSubmit}
    className="fixed inset-0 bg-black/40 flex items-center justify-center"
  >
    <div className="bg-white p-6 rounded-xl w-225 grid grid-cols-2 gap-6">

      {/* LEFT SIDE – FORM */}
      <div className="space-y-3">
        <h3 className="font-semibold text-lg">
          {isEditing ? "Edit Post" : "Create Post"}
        </h3>

        <select
          className="w-full border px-3 py-2"
          value={form.mediaType}
          onChange={(e) =>
            setForm({ ...form, mediaType: e.target.value })
          }
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          placeholder="Media URL"
          required
          className="w-full border p-2"
          value={form.mediaUrl}
          onChange={(e) =>
            setForm({ ...form, mediaUrl: e.target.value })
          }
        />

        <input
          placeholder="Posted By"
          required
          className="w-full border p-2"
          value={form.postedBy}
          onChange={(e) =>
            setForm({ ...form, postedBy: e.target.value })
          }
        />

        <input
          placeholder="Title"
          required
          className="w-full border p-2"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <textarea
          placeholder="Paragraph"
          required
          className="w-full border p-2 min-h-40 resize-none"
          value={form.paragraph}
          onChange={(e) =>
            setForm({ ...form, paragraph: e.target.value })
          }
        />

        <button className="bg-indigo-600 cursor-pointer text-white p-2 w-full">
          {isEditing ? "Update Post" : "Publish Post"}
        </button>

        <button
          type="button"
          onClick={handleClose}
          className="bg-red-600 cursor-pointer text-white p-2 w-full"
        >
          Cancel
        </button>
      </div>

      {/* RIGHT SIDE – LIVE PREVIEW */}
      <PostPreview form={form} />

    </div>
  </form>
)}


        {deleteId && (
          <ConfirmDialog
            message="Delete this post?"
            onConfirm={confirmDelete}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </main>
    </AdminLayout>
  );
};

export default PostsPage;
