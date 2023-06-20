import { Calendar, Plus } from "tabler-icons-react";

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

const EventCard = () => {
  return (
    <>
      <Card className="m-6 mb-0 w-[80rem] rounded-2xl shadow-xl">
        <div className="flex flex-row">
          <div className="item flex h-auto w-48 justify-center rounded-2xl bg-[#212A3E] shadow-xl">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className=" h-full w-40 p-4">
                    <Calendar className="h-full w-full text-[#F1F6F9] transition duration-300 ease-in-out group-hover:scale-125" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Add to Calendar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <main className="flex flex-row p-4">
            <section>
              <CardHeader>
                <CardTitle className="text-xl">Spikeball Meetup</CardTitle>
                <CardDescription>October 17th, 2023 at 4:30PM</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Wyman Quad</p>
              </CardContent>
            </section>
            <section className="">
              <CardHeader>
                <CardTitle className="text-xl">
                  Event Description
                </CardTitle>
              </CardHeader>
              <CardContent className="max-w-2xl">
                <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Natus, ab. Iure sed asperiores ex. Et animi rem consectetur
                  laborum non? Nisi voluptate vero tempore quae provident? Cum
                  quasi molestiae beatae!
                </p>
              </CardContent>
            </section>
          </main>
        </div>
      </Card>
    </>
  );
};

export default EventCard;
