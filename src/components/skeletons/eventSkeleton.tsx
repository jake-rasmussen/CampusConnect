import EventsOutline from "../dashboard/clubEvents/eventsOutline";
import { Skeleton } from "../shadcn_ui/skeleton";

const EventSkeleton = () => {
  return (
    <>
      <EventsOutline>
        <div className="w-full space-y-4 pb-40">
          <Skeleton className="h-[10rem] w-full rounded-2xl" />
          <Skeleton className="h-[10rem] w-full rounded-2xl" />
        </div>
      </EventsOutline>
    </>
  );
};

export default EventSkeleton;
