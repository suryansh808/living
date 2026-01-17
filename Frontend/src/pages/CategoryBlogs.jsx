import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as blogService from "../services/blogService";
import { BlogCard } from "../Components/BlogCard";
import { CategorySkeleton } from "../Components/CategorySkeleton";
import Footer from "../Components/Footer";


const CategoryBlogs = () => {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryBlogs = async () => {
      try {
        const { data } = await blogService.getPostsByCategory(slug)
        setPosts(data);
      } catch (err) {
        console.error("Error fetching category blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryBlogs();
  }, [slug]);

  if (loading) {
    return (
         <div className="px-2.5 py-6">
      <div className="max-w-7xl mx-auto">
        <CategorySkeleton />
      </div>
    </div>
    )
  }

  return (
    <>
    <div className="px-2.5 py-6 min-h-screen">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="lg:text-2xl font-bold capitalize">{slug.replace("-", " ")}</h1>
          <Link to="/blog">
            <button className="text-indigo-600 cursor-pointer">← Back to Blogs</button>
          </Link>
        </div>

        {/* Empty State */}
        {posts.length === 0 ? (
          <p>No blogs found in this category.</p>
        ) : (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default CategoryBlogs;
