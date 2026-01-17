import { Link } from "react-router-dom";
import { LazyImage } from "./LazyImage";



export const BlogCard = ({ post }) => {
  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const categorySlug = post.category?.slug || "general";

  return (
    <Link to={`/blog/category/${categorySlug}/${post._id}`}>
      <div className="card max-w-100 border-b border-gray-200 hover:scale-105 transition ease-linear rounded-xl overflow-hidden">
        <div className="relative overflow-hidden">
        {post.mediaType === "video" ? (
 <iframe
    src={post.mediaUrl}
    className="w-full h-52"
    allow="autoplay; fullscreen"
    allowFullScreen
    referrerPolicy="no-referrer"
  />
) : (
  <LazyImage
    src={post.imageUrl || post.mediaUrl}
    referrerPolicy="no-referrer"
    className="w-full h-52 object-cover"
    alt={post.title}
  />
)}

          <span className="absolute bg-indigo-600 text-white bottom-3 left-3 px-3 py-1 text-sm rounded-2xl">
            {post.category?.name}
          </span>
        </div>

        <div className="content p-2 space-y-1">
          <h3 className="tracking-tight line-clamp-2 text-indigo-600 font-bold">
            {post.title}
          </h3>

          <div className="flex items-center justify-start gap-2 text-sm">
            <h2>
              by <span className="text-indigo-600">{post.postedBy || "Anantha Living"}</span>
            </h2>
            <span className="flex items-center gap-1 text-xs text-gray-600">
              <i className="fa fa-clock-o"></i>
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
