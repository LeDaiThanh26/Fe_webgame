import { Skeleton } from "@/components/ui/skeleton";

function GameCardV2Skeleton() {
  return (
    <div className="flex flex-col gap-2">
      <div className="mx-2.5">
        <Skeleton className="w-[124px] h-[124px] rounded-[12px]" />
      </div>
      <div className="flex flex-col mx-2.5 gap-1">
        <Skeleton className="h-4 w-[100px] rounded" />
        <Skeleton className="h-3 w-[70px] rounded" />
      </div>
    </div>
  );
}

export default function CategorySectionSkeleton() {
  return (
    <div className="flex flex-col">
      <div className="flex z-10 w-fit">
        <Skeleton className="w-[250px] h-[42px] rounded-sm" />
        <Skeleton className="w-[200px] -ml-[10px] h-[42px] rounded-tr-xl" />
        <Skeleton className="w-[170px] -ml-[20px] h-[42px] rounded-tr-xl" />
      </div>

      <div className="flex flex-col bg-white gap-5 p-5 px-2.5 rounded-b-[5px] rounded-r-[5px] shadow-[0_6px_16.3px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col gap-6">
          <div className="flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <GameCardV2Skeleton key={i} />
            ))}
          </div>
          <div className="flex">
            {Array.from({ length: 6 }).map((_, i) => (
              <GameCardV2Skeleton key={i} />
            ))}
          </div>
        </div>
        <Skeleton className="h-3 w-[80px] self-end mr-3 rounded" />
      </div>
    </div>
  );
}
