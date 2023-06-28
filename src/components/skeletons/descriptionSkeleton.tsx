import DescriptionOutline from "../dashboard/description/descriptionOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const DescriptionSkeleton = () => {
  return (
    <>
      <DescriptionOutline>
        <div className="flex flex-col items-center justify-center space-y-4 p-4">
          <Skeleton className="h-[1.5rem] w-[85vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[75vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[70vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[80vw] rounded-full" />
          <Skeleton className="h-[1.5rem] w-[77.5vw] rounded-full" />
        </div>
      </DescriptionOutline>
    </>
  );
};

export default DescriptionSkeleton;
