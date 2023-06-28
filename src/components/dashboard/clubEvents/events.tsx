import { type ClubEvent } from "@prisma/client";

import EventCard from "./eventCard";
import EventsOutline from "./eventsOutline";

const Events = ({ events }: { events: ClubEvent[] }) => {
  return (
    <>
      <EventsOutline>
        {events.map((clubEvent: ClubEvent, index: number) => {
          return (
            <EventCard clubEvent={clubEvent} key={`clubEvent${index}`} />
          );
        })}
      </EventsOutline>
    </>
  );
};

export default Events;
