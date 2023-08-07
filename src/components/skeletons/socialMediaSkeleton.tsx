import SocialMediaOutline from "../dashboard/socialMedia/socialMediaOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const SocialMediaSkeleton = () => (
  <SocialMediaOutline>
    <Skeleton className="h-[5rem] w-[5rem] rounded-xl" />
    <Skeleton className="h-[5rem] w-[5rem] rounded-xl" />
    <Skeleton className="h-[5rem] w-[5rem] rounded-xl" />
  </SocialMediaOutline>
);

export default SocialMediaSkeleton;