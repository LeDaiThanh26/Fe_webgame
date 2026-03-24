import { cn } from "@/lib/utils";

/**
 * Skeleton – primitive loading placeholder
 * Dùng như: <Skeleton className="h-8 w-[300px]" />
 */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-gray-200",
        className
      )}
    />
  );
}
