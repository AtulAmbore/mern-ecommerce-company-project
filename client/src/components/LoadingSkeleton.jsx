import { ProductCardSkeleton } from "./ProductCardSkeleton";

export function LoadingSkeleton() {
  return (
    <div className="w-full grid grid-cols-5 gap-2">
      {Array.from({ length: 10 }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
}
