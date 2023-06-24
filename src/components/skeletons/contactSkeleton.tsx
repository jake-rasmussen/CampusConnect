import { Skeleton } from "../ui/skeleton";

const ContactSkeleton = () => {
  return (
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
  );
};

export default ContactSkeleton;
