import { Skeleton } from "../ui/skeleton";

const EventSkeleton = () => {
  return (
    <>
      <section className="pb-40">
        <h1 className="w-full pb-10 text-center text-4xl font-black uppercase">
          Events
        </h1>
        <div className="mx-14 flex flex-col items-center justify-center lg:mx-20">
          <div className="w-full space-y-4">
            <Skeleton className="h-[10rem] w-full rounded-2xl" />
            <Skeleton className="h-[10rem] w-full rounded-2xl" />
          </div>
        </div>
      </section>
    </>
  );
};

export default EventSkeleton;
