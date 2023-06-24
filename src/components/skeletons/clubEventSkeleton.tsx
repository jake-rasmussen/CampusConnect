import { Skeleton } from "../ui/skeleton";

const ClubEventSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      <Skeleton className="h-[10rem] w-full rounded-2xl" />
      <Skeleton className="h-[10rem] w-full rounded-2xl" />
    </div>
  );
};

export default ClubEventSkeleton;
