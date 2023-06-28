import HeaderOutline from "../dashboard/header/headerOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const TitleSkeleton = () => {
  return (
    <>
      <HeaderOutline>
        <Skeleton className="h-[5.5rem] w-[25vw] rounded-full" />
      </HeaderOutline>
    </>
  );
};

export default TitleSkeleton;
