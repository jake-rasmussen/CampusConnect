import ApplicationsOutline from "../dashboard/applications/applicationsOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const ApplicationsSkeleton = () => {
  return (
    <>
      <ApplicationsOutline>
        <Skeleton className="mb-0 mr-4 mt-6 h-[15rem] w-[15rem] rounded-xl" />
        <Skeleton className="mb-0 mr-4 mt-6 h-[15rem] w-[15rem] rounded-xl" />
      </ApplicationsOutline>
    </>
  );
};

export default ApplicationsSkeleton;
