import { type ClubEvent } from "@prisma/client";

import EventCard from "./eventCard";
import EventsEditor from "./eventsEditor";
import EventsOutline from "./eventsOutline";

type PropType = {
  events: ClubEvent[];
  clubId: string;
  edit: boolean;
};

const Events = (props: PropType) => {
  const { events, clubId, edit } = props;

  return (
    <section>
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
          {edit && <EventsEditor clubId={clubId} />}
        </>
      </EventsOutline>
    </section>
  );
};

export default Events;
