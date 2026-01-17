import { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { Toaster, toast } from "react-hot-toast";
import { clearCategoryCache } from "../utils/cache";
import * as adminService from "../services/adminService";
import { ConfirmDialog } from "../Components/ConfirmDialog";
import AdminSidebar from "./AdminSidebar";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  // INLINE EDIT STATES
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const { data } = await adminService.fetchCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("Category name required");

    try {
      await adminService.createCategory(name);
      toast.success("Category Created");

      clearCategoryCache();
      setName("");
      loadCategories();
    } catch {
      toast.error("Create failed");
    }
  };

  const startEdit = (cat) => {
    setEditId(cat._id);
    setEditName(cat.name);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditName("");
  };

  const handleUpdate = async (id) => {
    if (!editName.trim()) {
      return toast.error("Category name required");
    }

    try {
      await adminService.updateCategory(id, editName);

      toast.success("Category Updated Successfully");

      clearCategoryCache();

      setEditId(null);
      setEditName("");

      loadCategories();
    } catch {
      toast.error("Failed to update category");
    }
  };

  const confirmDelete = async () => {
    try {
      await adminService.deleteCategory(deleteId);

      toast.success("Category Deleted");
      clearCategoryCache();

      setDeleteId(null);
      loadCategories();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <AdminLayout sidebar={<AdminSidebar />}>
      <main className="flex-1 p-8">
        <Toaster />

        <h1 className="text-2xl font-bold mb-6">Manage Categories</h1>

        {/* CREATE CATEGORY */}
        <div className="bg-white p-6 rounded-xl shadow">
          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Category name"
              className="w-full border rounded px-3 py-2"
            />

            <button className="px-6 whitespace-nowrap cursor-pointer bg-indigo-600 text-white rounded">
              Add New
            </button>
          </form>
        </div>

        {/* CATEGORY LIST */}
        <div className="mt-4 bg-white p-6 rounded-xl shadow">
          {loading ? (
            <p>Loading...</p>
          ) : (
            categories.map((cat) => (
              <div
                key={cat._id}
                className="flex justify-between items-center border-b py-2"
              >
                {/* IF THIS ROW IS IN EDIT MODE */}
                {editId === cat._id ? (
                  <input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-3 py-1 rounded w-1/2"
                  />
                ) : (
                  <span>{cat.name}</span>
                )}

                <div className="flex items-center gap-4">
                  {/* EDIT MODE BUTTONS */}
                  {editId === cat._id ? (
                    <>
                      <button
                        onClick={() => handleUpdate(cat._id)}
                        title="Save"
                        className="text-green-600 text-xl cursor-pointer"
                      >
                        <i className="fa fa-check"></i>
                      </button>

                      <button
                        onClick={cancelEdit}
                        title="Cancel"
                        className="text-gray-600 text-xl cursor-pointer"
                      >
                        <i className="fa fa-times"></i>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setDeleteId(cat._id)}
                        title="Delete Category"
                        className="text-red-600 text-xl cursor-pointer"
                      >
                        <i className="fa fa-trash"></i>
                      </button>

                      <button
                        onClick={() => startEdit(cat)}
                        title="Edit Category"
                        className="text-blue-600 text-xl cursor-pointer"
                      >
                        <i className="fa fa-pencil-square-o"></i>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {deleteId && (
          <ConfirmDialog
            message="Are you sure you want to delete?"
            onConfirm={confirmDelete}
            onCancel={() => setDeleteId(null)}
          />
        )}
      </main>
    </AdminLayout>
  );
};

export default CategoriesPage;
