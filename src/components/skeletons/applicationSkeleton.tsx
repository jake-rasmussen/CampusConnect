import { Skeleton } from "../ui/skeleton";

const ApplicationSkeleton = () => {
  return (
    <>
      <div className="col-span-2 flex w-full flex-col items-center md:col-span-1 lg:col-span-3">
        <h1 className="text-2xl font-semibold underline">Open Applications</h1>
        <div className="flex flex-wrap justify-center">
          <div className="flex flex-wrap justify-center">
            <Skeleton className="mb-0 mr-4 mt-6 h-[15rem] w-[15rem] rounded-xl" />
            <Skeleton className="mb-0 mr-4 mt-6 h-[15rem] w-[15rem] rounded-xl" />
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationSkeleton;
