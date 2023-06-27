import { Skeleton } from "../ui/skeleton";

const DescriptionSkeleton = () => {
  return (
    <>
      <div className="relative max-w-6xl py-6 text-center md:px-6 md:py-0">
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <Skeleton className="h-[1.5rem] w-[85vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[75vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[70vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[80vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[77.5vw] rounded-full" />
        </div>
      </div>
    </>
  );
};

export default DescriptionSkeleton;
