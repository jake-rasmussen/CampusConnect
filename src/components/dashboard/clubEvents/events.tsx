import { type ClubEvent } from "@prisma/client";

import EventCard from "./eventCard";
import EventsEditor from "./eventsEditor";
import EventsOutline from "./eventsOutline";

type PropType = {
  events: ClubEvent[];
  clubId: string;
  editable: boolean;
};

const Events = (props: PropType) => {
  const { events, clubId, editable } = props;

  return (
    <section className="flex flex-col items-center gap-y-8 pb-40">
      <EventsOutline>
        <>
          {events.map((clubEvent: ClubEvent, index: number) => {
            return (
              <EventCard
                clubEvent={clubEvent}
                clubId={clubId}
                editable={editable}
                key={`clubEvent${index}`}
              />
            );
          })}
        </>
      </EventsOutline>
      {editable && <EventsEditor clubId={clubId} />}
    </section>
  );
};

export default Events;
