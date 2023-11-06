import { Event } from "@prisma/client";
import { Calendar } from "tabler-icons-react";

import { dateAndTimeToStringFormatted } from "~/utils/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shadcn_ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../shadcn_ui/tooltip";
import EventCardEditor from "./eventCardEditor";

type PropType = {
  projectId: string;
  event: Event;
  editable: boolean;
};

const EventCard = (props: PropType) => {
  const { event, editable } = props;

  return (
    <>
      <Card className="relative m-6 mb-0 w-full max-w-[80rem] rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="item flex h-auto w-full justify-center rounded-l-xl bg-primary shadow-2xl md:w-48">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className=" h-full w-40 p-4">
                    <Calendar className="h-full w-full text-white transition duration-300 ease-in-out group-hover:scale-125" />
                  </button>
                </TooltipTrigger>
                <TooltipContent className="rounded-xl bg-white">
                  <p>Add to Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <main className="flex flex-col p-4 md:flex-row">
            <section className="min-w-[15rem]">
              <CardHeader>
                <CardTitle className="text-xl">{event.name}</CardTitle>
                <CardDescription className="text-gray">
                  {dateAndTimeToStringFormatted(event.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editable ? (
                  <EventCardEditor
                    eventName={event.name}
                    eventDescription={event.description}
                    eventLocation={event.location}
                    eventInPerson={event.inPerson}
                    eventDate={event.date}
                    eventId={event.id}
                  />
                ) : (
                  <></>
                )}
                <div>
                  {event.inPerson ? (
                    <p>
                      This event will be held at{" "}
                      <span className="font-bold">{event.location}</span>
                    </p>
                  ) : (
                    <p>
                      This event will be virtual:{" "}
                      <a
                        href={event.location}
                        className="font-bold text-secondary"
                      >
                        Link
                      </a>
                    </p>
                  )}
                </div>
              </CardContent>
            </section>
            <section>
              <CardHeader>
                <CardTitle className="text-xl">Event Description</CardTitle>
              </CardHeader>
              <CardContent className="max-w-2xl">
                <p>{event.description}</p>
              </CardContent>
            </section>
          </main>
        </div>
      </Card>
    </>
  );
};

export default EventCard;
