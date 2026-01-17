export const CategorySkeleton = () => (
  <div className="animate-pulse space-y-2">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="h-9 bg-gray-200 rounded"
      />
    ))}
  </div>
);

export const PostSkeleton = () => (
  <div className="animate-pulse space-y-3">
    {Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className="h-12 bg-gray-200 rounded"
      />
    ))}
  </div>
);


