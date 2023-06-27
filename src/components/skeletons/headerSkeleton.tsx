import { Skeleton } from "../ui/skeleton";

const TitleSkeleton = () => {
  return (
    <>
      <header className="relative bg-gradient-to-r from-secondary to-primary shadow-2xl">
        <div className="flex justify-center px-4 py-20 md:px-24 lg:px-8 lg:py-28">
          <div className="relative flex items-center justify-center text-center">
            <Skeleton className="h-[5.5rem] w-[50vw] rounded-full" />
          </div>
        </div>
      </header>
    </>
  );
};

export default TitleSkeleton;
