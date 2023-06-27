import { ClubEvent } from "@prisma/client";

import EventCard from "./eventCard";

const Events = ({ events }: { events: ClubEvent[] }) => {
  return (
    <>
      <section className="pb-40">
        <h1 className="w-full pb-10 text-center text-4xl font-black uppercase">
          Events
        </h1>
        <div className="mx-14 flex flex-col items-center justify-center lg:mx-20">
          {events.map((clubEvent: ClubEvent, index: number) => {
            return (
              <EventCard clubEvent={clubEvent} key={`clubEvent${index}`} />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Events;
