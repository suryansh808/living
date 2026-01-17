export const PaginationSkeleton = () => {
  return (
    <div className="flex justify-center gap-4 py-6 shimmer">
      <div className="bg-gray-200 h-8 w-24 rounded"></div>
      <div className="bg-gray-200 h-8 w-32 rounded"></div>
      <div className="bg-gray-200 h-8 w-24 rounded"></div>
    </div>
  );
};
