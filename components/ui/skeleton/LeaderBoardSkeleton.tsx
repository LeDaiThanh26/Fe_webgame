import { Skeleton } from "@/components/ui/skeleton";

function PlayerCardSkeleton() {
  return (
    <div className="flex gap-2 items-center justify-center mx-3 border-b border-orange-400 pb-2">
      <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />

      <div className="w-[165px] flex flex-col gap-1.5">
        <Skeleton className="h-4 w-[120px] rounded" />
        <Skeleton className="h-3 w-[140px] rounded" />
        <Skeleton className="h-3 w-[130px] rounded" />
      </div>

      <Skeleton className="w-[60px] h-[60px] rounded-full flex-shrink-0" />
    </div>
  );
}

export default function LeaderBoardSkeleton() {
  return (
    <div className="bg-white flex flex-col gap-3 h-[660px] shadow-[0_6px_16.3px_rgba(0,0,0,0.5)] rounded-[5px]">
      <div className="bg-red-200 w-full h-13 rounded-t-[5px] flex items-center justify-center">
        <Skeleton className="h-6 w-[160px] rounded" />
      </div>

      {Array.from({ length: 7 }).map((_, i) => (
        <PlayerCardSkeleton key={i} />
      ))}
    </div>
  );
}
