export const HeroSkeleton = () => {
  return (
    <section className="px-2.5 py-4 shimmer">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-gray-300 h-80 w-full rounded-2xl"></div>

          <div className="space-y-3 mt-4">
            <div className="bg-gray-200 h-6 w-2/3 rounded"></div>

            <div className="flex gap-4">
              <div className="bg-gray-200 h-4 w-32 rounded"></div>
              <div className="bg-gray-200 h-4 w-24 rounded"></div>
            </div>

            <div className="bg-gray-200 h-4 w-full rounded"></div>
            <div className="bg-gray-200 h-4 w-5/6 rounded"></div>

            <div className="bg-gray-300 h-10 w-32 rounded-md"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
