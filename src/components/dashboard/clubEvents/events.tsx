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
          {events.length == 0 ? (
            <h1 className="tracking-none text-md font-black uppercase text-red-600">
              There are no events listed
            </h1>
          ) : (
            events.map((clubEvent: ClubEvent, index: number) => {
              return (
                <EventCard
                  clubEvent={clubEvent}
                  clubId={clubId}
                  edit={edit}
                  key={`clubEvent${index}`}
                />
              );
            })
          )}
          {edit && <EventsEditor clubId={clubId} />}
        </>
      </EventsOutline>
    </section>
  );
};

export default Events;
