export const CategorySkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="shimmer rounded-xl overflow-hidden"
        >
          <div className="bg-gray-300 h-52 w-full"></div>

          <div className="p-3 space-y-2">
            <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
            <div className="bg-gray-200 h-4 w-1/3 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
