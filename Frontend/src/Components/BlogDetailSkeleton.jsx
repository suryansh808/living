export const BlogDetailSkeleton = () => {
  return (
    <div className="px-3 py-6 shimmer">
      <div className="max-w-3xl mx-auto space-y-6">

        <div className="bg-gray-200 h-4 w-32 rounded"></div>

        <div className="bg-gray-300 h-10 w-3/4 rounded"></div>

        <div className="flex gap-4">
          <div className="bg-gray-200 h-4 w-24 rounded"></div>
          <div className="bg-gray-200 h-4 w-20 rounded"></div>
          <div className="bg-gray-200 h-4 w-28 rounded"></div>
        </div>

        <div className="bg-gray-300 h-80 w-full rounded-xl"></div>

        <div className="space-y-3">
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-full rounded"></div>
          <div className="bg-gray-200 h-4 w-5/6 rounded"></div>
          <div className="bg-gray-200 h-4 w-4/6 rounded"></div>
        </div>

      </div>
    </div>
  );
};
