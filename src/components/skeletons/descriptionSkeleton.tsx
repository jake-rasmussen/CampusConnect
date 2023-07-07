import DescriptionOutline from "../dashboard/description/descriptionOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const DescriptionSkeleton = () => {
  return (
    <>
      <DescriptionOutline>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <Skeleton className="h-[1.5rem] w-9/12 rounded-full" />
          <Skeleton className="h-[1.5rem] w-10/12 rounded-full" />
          <Skeleton className="h-[1.5rem] w-8/12 rounded-full" />
          <Skeleton className="h-[1.5rem] w-7/12 rounded-full" />
          <Skeleton className="h-[1.5rem] w-9/12 rounded-full" />
        </div>
      </DescriptionOutline>
    </>
  );
};

export default DescriptionSkeleton;
