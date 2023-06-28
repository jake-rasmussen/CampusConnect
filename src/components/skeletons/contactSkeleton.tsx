import ContactOutline from "../dashboard/contact/contactOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const ContactSkeleton = () => {
  return (
    <ContactOutline>
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
    </ContactOutline>
  );
};

export default ContactSkeleton;
