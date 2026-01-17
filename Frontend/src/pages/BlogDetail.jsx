import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as blogService from "../services/blogService";
import {BlogDetailSkeleton} from "../Components/BlogDetailSkeleton"
import { LazyImage } from "../Components/LazyImage";
import Footer from "../Components/Footer";

const BlogDetail = () => {
  const { slug, id } = useParams();


  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await blogService.getBlogById(id);
        setPost(data);
      } catch (err) {
        console.error("Error fetching blog detail:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  if (loading) {
    return <BlogDetailSkeleton />;
  }

  if (!post) {
    return <div className="text-center py-20">Blog not found.</div>;
  }

  return (
   <>
    <div className="px-2.5 py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        <Link to={`/blog/category/${slug}`} className="text-indigo-600 text-sm">
          ← Back to {slug} blogs
        </Link>

        <h1 className="lg:text-3xl font-bold mt-4 mb-3 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 text-sm text-gray-600 mb-6">
          <span>
            by <span className="text-indigo-600">{post.postedBy || "Anantha Living"}</span>
          </span>
          <span>•</span>
          <span>{formatDate(post.createdAt)}</span>
          <span>•</span>
          <span className="text-indigo-600">{post.category?.name}</span>
        </div>

       {post.mediaType === "video" ? (
 <iframe
    src={post.mediaUrl}
    className="w-full h-105 rounded-xl mb-6"
    allow="autoplay; fullscreen"
    allowFullScreen
    referrerPolicy="no-referrer"
  />
) : (
  <LazyImage
    src={post.imageUrl || post.mediaUrl}
    referrerPolicy="no-referrer"
    alt={post.title}
    className="w-full h-105 object-cover rounded-xl mb-6"
  />
)}


        <article className="prose max-w-none text-gray-800 leading-relaxed">
            <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} className="text-gray-700 text-justify">{post.paragraph}</pre>
        </article>

      </div>
    </div>
    <Footer/>
   </>
  );
};

export default BlogDetail;
