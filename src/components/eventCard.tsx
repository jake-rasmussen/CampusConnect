import { type ClubEvent } from "@prisma/client";
import { Calendar } from "tabler-icons-react";

import { dateAndTimeToStringFormatted } from "~/utils/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

type PropType = {
  clubEvent: ClubEvent;
};

const EventCard = (props: PropType) => {
  const { clubEvent } = props;

  return (
    <>
      <Card className="m-6 mb-0 w-full rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="item flex h-auto w-full justify-center rounded-2xl bg-primary shadow-xl md:w-48">
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
                <CardTitle className="text-xl">
                  {clubEvent.name} <span className="font-normal">at</span>{" "}
                  {clubEvent.location}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {dateAndTimeToStringFormatted(clubEvent.date)}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>{clubEvent.inPerson ? "This event is in person" : "This event is not in person"}</p>
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
