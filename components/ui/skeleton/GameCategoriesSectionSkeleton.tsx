import { Skeleton } from "@/components/ui/skeleton";

function GameCardSkeleton() {
  return (
    <div className="mx-2.5 flex-shrink-0">
      <Skeleton className="w-[124px] h-[124px] rounded-[12px]" />
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="relative mr-2.5 h-[124px] w-[288px] rounded-[10px] overflow-hidden flex-shrink-0">
      <Skeleton className="w-full h-full" />
      <div className="absolute inset-0 flex flex-col justify-center p-4 gap-2">
        <Skeleton className="h-5 w-[100px] bg-white/40" />
        <Skeleton className="h-3 w-[60px] bg-white/30" />
      </div>
    </div>
  );
}

function GameRowSkeleton() {
  return (
    <div className="flex items-center">
      <CategoryCardSkeleton />
      {Array.from({ length: 6 }).map((_, i) => (
        <GameCardSkeleton key={i} />
      ))}
      <div className="flex items-center justify-center h-[124px] w-[33px] flex-shrink-0">
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
    </div>
  );
}

export default function GameCategoriesSectionSkeleton({
  rowCount = 6,
}: {
  rowCount?: number;
}) {
  return (
    <div className="flex bg-white flex-col w-full mt-5 rounded-[5px] py-5 pl-5 shadow-[0_6px_16.3px_rgba(0,0,0,0.5)]">
      <Skeleton className="h-9 w-[360px] my-3 rounded-md" />

      <div className="flex flex-col gap-5">
        {Array.from({ length: rowCount }).map((_, i) => (
          <GameRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}