import * as blogService from "../services/blogService";
import { getCache, setCache } from "../utils/cache";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import API from "../API";
// import axios from "axios";
import { BlogCard } from "../Components/BlogCard";
import {SkeletonCard} from "../Components/SkeletonCard"
import { HeroSkeleton } from "../Components/HeroSkeleton";
import { PaginationSkeleton } from "../Components/PaginationSkeleton";
import { LazyImage } from "../Components/LazyImage";
import Footer from "../Components/Footer";

const Blog = () => {
  const [heroPost, setHeroPost] = useState(null);
  const [categories, setCategories] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 const [page, setPage] = useState(1);
 const [totalPages, setTotalPages] = useState(1);

  // Fetch hero post (random)
const fetchHeroPost = async () => {
  try {
    const { data } = await blogService.getHeroPost();
    setHeroPost(data);
  } catch (err) {
    console.error("Error fetching hero post:", err);
    setError("Failed to load hero post");
  }
};



  // Fetch categories WITH CACHE
const fetchCategories = async () => {
  const cached = getCache("categories");

    
  if (cached) {
    setCategories(cached);
    return;
  }

  try {
    const { data } = await blogService.getCategories();
    setCategories(data);
    setCache("categories", data);
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
};


  // Fetch latest posts
const fetchLatestPosts = async () => {
  try {
    const { data } = await blogService.getLatestPosts();
    setLatestPosts(data);
  } catch (err) {
    console.error("Error fetching latest posts:", err);
  }
};



  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
    await Promise.allSettled([
  fetchHeroPost(),
  fetchCategories(),
  fetchLatestPosts(),

]);

      setLoading(false);
    };

    fetchAllData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

if (loading) {
  return (
    <>
      <HeroSkeleton />

      <div className="px-2.5 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            {[...Array(6)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

{loading ? <PaginationSkeleton /> : (
  <div className="flex justify-center gap-3 mt-6">
    ...
  </div>
)}


  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  const heroCategorySlug = heroPost?.category?.slug || "general";


  return (
    <div>
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/">
            <i className="fa fa-arrow-left mr-1"></i> Back
          </Link>
          <h2>Blogs</h2>
          <span>
           
          </span>
        </div>
      </header>

      {/* Hero Section */}
      {heroPost && (
        <section className="px-2.5 py-4">
          <div className="max-w-7xl mx-auto">
            <div>
              <div className="rounded-2xl relative overflow-hidden w-full">
               {heroPost.mediaType === "video" ? (
   <iframe
    src={heroPost.mediaUrl}
    className="h-105 w-full"
    allow="autoplay; fullscreen"
    allowFullScreen
    referrerPolicy="no-referrer"
  />
) : (
  <LazyImage
    src={ heroPost.imageUrl || heroPost.mediaUrl}
    className="h-105 w-full object-cover"
    alt={heroPost.title}
  />
)}

                <span className="absolute bg-indigo-600 text-white bottom-5 left-3 px-4 py-1 rounded-2xl">
                  {heroPost.category?.name}
                </span>
              </div>
              <div className="content space-y-2 mt-2">
                <h2 className="text-indigo-600 font-bold">{heroPost.title}</h2>
                <div className="sub-content flex items-center gap-5">
                  <h3>
                    by <span className="text-indigo-600">{heroPost.postedBy || "AnanthaLiving"}</span>
                  </h3>
                  <span className="flex items-center gap-1 text-gray-600">
                    <i className="fa fa-clock-o"></i>
                    {formatDate(heroPost.createdAt)}
                  </span>
                </div>
                <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }} className="text-gray-700 text-justify line-clamp-5">{heroPost.paragraph}</pre>
                <Link to={`/blog/category/${heroCategorySlug}/${heroPost._id}`}>
                  <button className="px-2 py-2 bg-indigo-600 active:scale-105 transition-all ease-linear cursor-pointer text-white rounded-md">
                    READ MORE
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

       {/* Latest Stories */}
      <section className="px-2.5 py-4">
        <div className="max-w-7xl mx-auto border-t border-gray-200 py-10">
          <div className="flex items-center justify-between border-b border-gray-200 py-2">
            <h2>Latest Stories</h2>
          </div>
          <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 py-8">
            {latestPosts.map((post) => (
              <BlogCard  key={post._id} post={post} />
            ))}
          </div>
        </div>
         <div className="flex justify-center gap-3 mt-6">
  <button
    disabled={page === 1}
    onClick={() => {
      setPage(page - 1);
      fetchLatestPosts(page - 1);
    }}
    className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
  >
    Previous
  </button>

  <span className="px-4 py-2">Page {page} of {totalPages}</span>

  <button
    disabled={page === totalPages}
    onClick={() => {
      setPage(page + 1);
      fetchLatestPosts(page + 1);
    }}
    className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
  >
    Next
  </button>
         </div>

      </section>

      {/* Category Sections */}
      {categories.map((category) => (
        <BlogSection key={category._id} title={category.name} slug={category.slug} />
      ))}

      {/* Share Your Story */}
      <section className="px-2.5 py-4">
        <div className="max-w-7xl mx-auto border-t border-gray-200 py-10">
          <div className="space-y-4 text-justify text-gray-600">
            <p>
            Are you a changemaker, an innovative entrepreneur, or a visionary turning meaningful ideas into real-world impact? Do you know an inspiring individual whose journey is quietly transforming lives and communities?
            </p>
            <p>
              At Ananta Living, we celebrate stories that matter stories of purpose-driven startups, sustainable living pioneers, mindful travelers, cultural custodians, and everyday heroes creating positive change. We shine a spotlight on those reviving traditions, nurturing nature, empowering communities, and redefining the way we live.
            </p>
            <p>
              If your journey embodies resilience, creativity, and conscious progress big or small we want to share it with the world. Let your story inspire others to live better, think better, and build a better tomorrow.
            </p>
            <p><i class="fa fa-envelope text-red-600"></i> Write to us at support@ananthaliving.com</p>
          </div>
        </div>
      </section>

      <Footer/>
    </div>
  );
};

// BlogSection Component for category-wise posts
const BlogSection = ({ title, slug }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // console.log("slug id and name" ,  slug , title)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const {data} = await blogService.getPostsByCategory(slug);
        // console.log("data by category", data)
        setPosts(data);
      } catch (err) {
        console.error(`Error fetching ${title} posts:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [slug, title]);

  if (loading) return <div className="text-center py-10">Loading {title}...</div>;
  if (posts.length === 0) return null;

  return (
    <section className="px-2.5 py-4">
      <div className="max-w-7xl mx-auto border-t border-gray-200 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-bold text-xl">{title}</h2>
          <Link to={`/blog/category/${slug}`}>
            <button className="text-indigo-600 cursor-pointer">See All</button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};



export default Blog;