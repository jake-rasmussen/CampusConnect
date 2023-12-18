import { Application, User } from "@prisma/client";
import { useState } from "react";
import { Eye, Pencil } from "tabler-icons-react";

import PreviewDialog from "~/components/previewDialog";
import { Separator } from "~/components/shadcn_ui/separator";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../shadcn_ui/card";
import ApplicationSubmissionsTable from "./applicationSubmissionsTable";

type PropType = {
  application: Application & {
    applicationSubmissions: {
      id: string;
      user: User;
    }[];
  };
  projectId: string;
};

const ApplicationEvaluatorCard = (props: PropType) => {
  const { application, projectId } = props;

  const [openDialog, setOpenDialog] = useState<boolean>(false);

  return (
    <Card className="relative flex w-[17.5rem] flex-col rounded-xl bg-white shadow-xl">
      <CardHeader className="pb-0">
        <CardTitle>{application.name}</CardTitle>
        <CardDescription>{application.description}</CardDescription>
      </CardHeader>
      <CardContent className="group flex h-full flex-col">
        <div className="flex grow flex-col justify-end">
          <Separator orientation="horizontal" className="my-4 bg-secondary" />
          <p>
            Number of Applications:{" "}
            <span className="tracking-none font-black text-secondary">
              {application.applicationSubmissions.length}
            </span>
          </p>
          {application.deadline && (
            <p>
              Deadline:{" "}
              <span className="text-sm font-semibold">
                {application.deadline.toLocaleDateString(
                  undefined,
                  DATE_TIME_FORMAT_OPTS,
                )}
              </span>
            </p>
          )}
        </div>

        <PreviewDialog
          triggerButton={
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
              <div className="group flex h-full w-full items-center">
                <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
                <Pencil className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:cursor-pointer group-hover:text-primary group-hover:opacity-100" />
              </div>
            </div>
          }
          dialogTitle="Preview Application Submissions"
          dialogDescription="Click a row to evaluate the candidate"
          openDialog={openDialog}
          setOpenDialog={setOpenDialog}
          className="max-w-3xl"
        >
          <div className="">
            <ApplicationSubmissionsTable
              projectId={projectId}
              applicationSubmissions={application.applicationSubmissions}
            />
          </div>
        </PreviewDialog>
      </CardContent>
    </Card>
  );
};

export default ApplicationEvaluatorCard;
