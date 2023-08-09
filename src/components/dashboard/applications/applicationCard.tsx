import { type ClubApplication } from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Edit } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import { dateToStringFormatted } from "~/utils/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shadcn_ui/card";

type PropType = {
  clubApplication: ClubApplication;
  clubId: string;
  editable: boolean;
};

const ApplicationCard = (props: PropType) => {
  const { clubApplication, editable } = props;

  return (
    <>
      <Card className="relative my-6 mb-0 mr-4 w-[17.5rem] rounded-xl bg-white shadow-xl">
        <CardHeader>
          <CardTitle>{clubApplication.name}</CardTitle>
          <CardDescription>{clubApplication.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {editable ? (
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
              <Link
                href={`/member/application/${clubApplication.id}/edit/`}
                className="group flex h-full w-full items-center"
                onClick={() => console.log(clubApplication.id)}
              >
                <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
                <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-primary group-hover:opacity-100" />
              </Link>
            </div>
          ) : (
            <></>
          )}
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
