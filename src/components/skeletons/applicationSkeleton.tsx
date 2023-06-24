import { Skeleton } from "../ui/skeleton";

const ApplicationSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center">
      <Skeleton className="mb-0 mr-4 mt-6 h-[15rem] w-[15rem] rounded-xl" />
      <Skeleton className="mb-0 mr-4 mt-6 h-[15rem] w-[15rem] rounded-xl" />
    </div>
  );
};

export default ApplicationSkeleton;
