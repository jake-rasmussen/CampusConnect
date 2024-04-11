import { Event } from "@prisma/client";
import { Calendar } from "tabler-icons-react";

import {
  dateAndTimeToStringFormatted,
  dateToTimeStringFormatted,
} from "~/utils/helpers";
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
  const { event, editable, projectId } = props;

  return (
    <>
      <Card className="relative m-6 mb-0 w-full rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div className="item flex h-auto w-full justify-center rounded-xl bg-primary shadow-2xl lg:w-48 lg:rounded-l-xl">
            <button className=" h-full w-40 p-4">
              <Calendar className="h-full w-full text-white transition duration-300 ease-in-out group-hover:scale-125" />
            </button>
          </div>

          <main className="grid w-full grid-cols-1 lg:grid-cols-5">
            <section className="col-span-2">
              <CardHeader>
                <CardTitle className="text-xl capitalize">
                  {event.name}
                </CardTitle>
                <CardDescription className="text-gray">
                  {dateAndTimeToStringFormatted(event.start)} to{" "}
                  {dateToTimeStringFormatted(event.end)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {editable ? (
                  <EventCardEditor
                    eventName={event.name}
                    eventDescription={event.description}
                    eventLocation={event.location}
                    eventInPerson={event.inPerson}
                    eventStart={event.start}
                    eventEnd={event.end}
                    eventId={event.id}
                    projectId={projectId}
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
            <section className="col-span-3">
              <CardHeader>
                <CardTitle className="text-xl">Event Description</CardTitle>
              </CardHeader>
              <CardContent className="max-w-xl">
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
