export function ProductCardSkeleton() {
  return (
    <div
      className="bg-white rounded-2xl shadow-md p-4 flex flex-col animate-pulse"
      data-testid="product-skeleton"
    >
      {/* Image Skeleton */}
      <div className="h-48 w-full rounded-xl bg-gray-200" />

      {/* Content */}
      <div className="mt-4 flex flex-col gap-3 grow">
        {/* Title */}
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-1/2" />

        {/* Brand / Category */}
        <div className="flex justify-between mt-2">
          <div className="h-3 bg-gray-200 rounded w-1/4" />
          <div className="h-3 bg-gray-200 rounded w-1/4" />
        </div>

        {/* Rating */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-4 w-4 bg-gray-200 rounded" />
            ))}
          </div>
          <div className="h-3 w-8 bg-gray-200 rounded" />
        </div>

        {/* Price */}
        <div className="flex gap-2 mt-2">
          <div className="h-5 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
        </div>
      </div>

      {/* Button */}
      <div className="mt-4 h-10 bg-gray-300 rounded-full" />
    </div>
  );
}
