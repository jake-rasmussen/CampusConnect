import { Skeleton } from "../ui/skeleton";

const ContactSkeleton = () => {
  return (
    <div className="justify-left col-span-2 flex flex-col pt-20 md:col-span-1 md:pt-0 lg:col-span-2">
      <h1 className="text-center text-2xl font-semibold underline md:text-left">
        Contact
      </h1>
      <div className="mx-auto md:mx-0">
        <div>
          <div className="my-6 space-y-1">
            <Skeleton className="h-[1.5rem] w-[15rem] rounded-xl" />
            <Skeleton className="h-[1.5rem] w-[10rem] rounded-xl" />
            <Skeleton className="h-[1.5rem] w-[12.5rem] rounded-xl" />
          </div>
          <div className="my-6 space-y-1">
            <Skeleton className="h-[1.5rem] w-[15rem] rounded-xl" />
            <Skeleton className="h-[1.5rem] w-[10rem] rounded-xl" />
            <Skeleton className="h-[1.5rem] w-[12.5rem] rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSkeleton;
