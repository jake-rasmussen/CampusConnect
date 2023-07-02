import { type ClubEvent } from "@prisma/client";
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
import EventUpdateEditor from "./eventUpdateEditor";

type PropType = {
  clubEvent: ClubEvent;
  clubId: string;
  edit: boolean;
};

const EventCard = (props: PropType) => {
  const { clubEvent, clubId, edit } = props;

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
                <CardTitle className="text-xl">{clubEvent.name}</CardTitle>
                <CardDescription className="text-gray">
                  {dateAndTimeToStringFormatted(clubEvent.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {edit ? (
                  <EventUpdateEditor
                    eventName={clubEvent.name}
                    eventDescription={clubEvent.description}
                    eventLocation={clubEvent.location}
                    eventInPerson={clubEvent.inPerson}
                    eventDate={clubEvent.date}
                    eventId={clubEvent.id}
                  />
                ) : (
                  <></>
                )}
                <div>
                  {clubEvent.inPerson ? (
                    <p>
                      This event will be held at{" "}
                      <span className="font-bold">{clubEvent.location}</span>
                    </p>
                  ) : (
                    <p>
                      This event will be virtual:{" "}
                      <a
                        href={clubEvent.location}
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
                <p>{clubEvent.description}</p>
              </CardContent>
            </section>
          </main>
        </div>
      </Card>
    </>
  );
};

export default EventCard;
