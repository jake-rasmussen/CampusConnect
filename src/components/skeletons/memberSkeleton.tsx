import MemberOutline from "../dashboard/members/memberOutline";
import { Skeleton } from "../shadcn_ui/skeleton";


const MemberSkeleton = () => (
  <MemberOutline
    search={<Skeleton className="h-[3rem] w-[25rem] rounded-xl" />}
  >
    <div>
      <Skeleton className="h-[15rem] w-[30rem] rounded-xl" />
    </div>
  </MemberOutline>
)

export default MemberSkeleton;