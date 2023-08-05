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
  const { events, clubId, editable: edit } = props;

  return (
    <section className="flex flex-col items-center pb-40 gap-y-8">
      <EventsOutline>
        <>
          {events.map((clubEvent: ClubEvent, index: number) => {
            return (
              <EventCard
                clubEvent={clubEvent}
                clubId={clubId}
                edit={edit}
                key={`clubEvent${index}`}
              />
            );
          })}
        </>
      </EventsOutline>
      {edit && <EventsEditor clubId={clubId} />}
    </section>
  );
};

export default Events;
