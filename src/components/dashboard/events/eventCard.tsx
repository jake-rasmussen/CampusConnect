import { Event } from "@prisma/client";
import { Calendar } from "tabler-icons-react";
import {
  dateAndTimeToStringFormatted,
  dateToTimeStringFormatted,
} from "~/utils/helpers";
import EventEditor from "./eventEditor";
import { Card, CardBody, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useContext } from "react";
import { ProjectContext } from "lib/context";

type PropType = {
  projectId: string;
  event: Event;
  editable: boolean;
};

const EventCard = (props: PropType) => {
  const { event, editable, projectId } = props;
  const { colors } = useContext(ProjectContext);

  return (
    <>
      <Card className="relative m-6 mb-0 w-full rounded-2xl bg-white shadow-xl">
        <div className="flex flex-col lg:flex-row">
          <div
            className="item flex h-auto w-full justify-center rounded-xl shadow-2xl lg:w-48 lg:rounded-l-xl"
            style={{ backgroundColor: colors.primaryColor }}
          >
            <button className="h-full w-40 p-4">
              <Calendar className="h-full w-full text-white transition duration-300 ease-in-out group-hover:scale-125" />
            </button>
          </div>

          <main className="w-[50vw] ml-4">
            <section>
              <CardHeader className="text-xl flex flex-col items-start">
                <h1 className="text-2xl font-black">{event.name}</h1>
                <span className="text-gray text-sm">
                  {dateAndTimeToStringFormatted(event.start)} to{" "}
                  {dateToTimeStringFormatted(event.end)}
                </span>
              </CardHeader>
              <CardBody className="flex flex-col items-start">
                <div>{event.description}</div>
              </CardBody>
              <Divider />
              <CardFooter>
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
                        className="font-bold"
                        style={{ color: colors.secondaryColor }}
                      >
                        Link
                      </a>
                    </p>
                  )}
                </div>
              </CardFooter>
            </section>
          </main>
        </div>

        {editable && (
          <EventEditor
            eventName={event.name}
            eventDescription={event.description}
            eventLocation={event.location}
            eventInPerson={event.inPerson}
            eventStart={event.start}
            eventEnd={event.end}
            eventId={event.id}
            projectId={projectId}
          />
        )}
      </Card>
    </>
  );
};

export default EventCard;