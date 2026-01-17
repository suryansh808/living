import React from "react";

export const PostPreview = ({ form }) => {
  const { mediaType, mediaUrl, title, paragraph, postedBy } = form;

  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <h4 className="font-semibold mb-2">Live Preview</h4>

      <div className="rounded-xl overflow-hidden mb-3">
        {mediaType === "image" ? (
          <img
            src={mediaUrl}
            alt="preview"
            className="w-full h-40 object-cover"
          />
        ) : (
         <iframe
    src={mediaUrl}
    className="w-full h-60 rounded-xl mb-6"
    allow="autoplay; fullscreen"
    allowFullScreen
    referrerPolicy="no-referrer"
  />
        )}
      </div>

      <h3 className="font-bold text-indigo-600">
        {title || "Your title here"}
      </h3>

      <p className="text-sm text-gray-500">
        by {postedBy || "Author name"}
      </p>

      <p className="mt-2 text-sm text-gray-700 line-clamp-3">
        {paragraph || "Your content preview will appear here..."}
      </p>
    </div>
  );
};
