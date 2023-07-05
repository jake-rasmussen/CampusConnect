import { type ClubApplication } from "@prisma/client";
import { ArrowRight } from "lucide-react";

import { dateToStringFormatted } from "~/utils/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shadcn_ui/card";
import ApplicationEditor from "./applicationEditor";

type PropType = {
  clubApplication: ClubApplication;
  clubId: string;
  edit: boolean;
};

const ApplicationCard = (props: PropType) => {
  const { clubApplication, clubId, edit } = props;

  return (
    <>
      <Card className="relative my-6 mb-0 mr-4 w-[17.5rem] rounded-xl bg-white shadow-xl">
        <CardHeader>
          <CardTitle>{clubApplication.name}</CardTitle>
          <CardDescription>{clubApplication.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Status:{" "}
            <span className="tracking-none font-black text-secondary">
              {clubApplication.status}
            </span>
          </p>
          {clubApplication.deadline ? (
            <p>
              Deadline:{" "}
              <span className="font-semibold">
                {dateToStringFormatted(clubApplication.deadline)}
              </span>
            </p>
          ) : (
            <></>
          )}
          {edit ? (
            <ApplicationEditor
              applicationName={clubApplication.name}
              clubId={clubId}
            />
          ) : (
            <></>
          )}
        </CardContent>
        <CardFooter>
          <p className="flex w-full justify-end">
            <button className="mr-1 flex flex-row text-secondary transition duration-300 ease-in-out hover:translate-x-2">
              Apply <ArrowRight className="mx-1 h-full" />
            </button>
          </p>
        </CardFooter>
      </Card>
    </>
  );
};

export default ApplicationCard;
