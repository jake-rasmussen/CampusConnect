import { Event } from "@prisma/client";

import EventCard from "./eventCard";
import EventsEditor from "./eventsEditor";
import EventsOutline from "./eventsOutline";

type PropType = {
  events: Event[];
  projectId: string;
  editable: boolean;
};

const Events = (props: PropType) => {
  const { events, projectId, editable } = props;

  return (
    <section className="flex flex-col items-center gap-y-4">
      <EventsOutline>
        <>
          {events.map((event: Event, index: number) => {
            return (
              <EventCard
                event={event}
                projectId={projectId}
                editable={editable}
                key={`event${index}`}
              />
            );
          })}
        </>
      </EventsOutline>
      {editable && <EventsEditor projectId={projectId} />}
    </section>
  );
};

export default Events;
