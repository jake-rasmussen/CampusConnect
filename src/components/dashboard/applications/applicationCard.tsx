import {
  Application,
  ApplicationQuestion,
  ApplicationStatus,
  ApplicationSubmissionStatus,
} from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Check, Edit, Eye } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import ApplicationForm from "~/components/applications/applicationForm";
import ApplicationPreviewDialog from "~/components/applications/editor/applicationPreviewDialog";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shadcn_ui/card";

type PropType = {
  application: Application & {
    questions: ApplicationQuestion[];
  };
  projectId: string;
  editable: boolean;
  status: ApplicationSubmissionStatus;
};

const ApplicationCard = (props: PropType) => {
  const { application, editable, status } = props;
  const router = useRouter();
  const { projectId } = router.query;

  const displayEditComponent =
    editable && application.status === ApplicationStatus.DRAFT;
  const displayPreviewComponent =
    editable && application.status !== ApplicationStatus.DRAFT;

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  return (
    <>
      <Card
        className={twMerge(
          "relative my-6 mb-0 mr-4 flex w-[17.5rem] flex-col rounded-xl bg-white shadow-xl",
          status === ApplicationSubmissionStatus.SUBMITTED ? "opacity-50" : "",
        )}
      >
        <CardHeader>
          <CardTitle>{application.name}</CardTitle>
          <CardDescription>{application.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {displayEditComponent && (
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
              <Link
                href={`/admin/${projectId as string}/application/${
                  application.id
                }/edit/`}
                className="group flex h-full w-full items-center"
              >
                <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
                <Edit className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-primary group-hover:opacity-100" />
              </Link>
            </div>
          )}
          {displayPreviewComponent && (
            <ApplicationPreviewDialog
              triggerButton={
                <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
                  <div className="group flex h-full w-full items-center">
                    <div className="absolute h-full w-full rounded-2xl bg-black opacity-0 duration-300 group-hover:opacity-10" />
                    <Eye className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:cursor-pointer group-hover:text-primary group-hover:opacity-100" />
                  </div>
                </div>
              }
              dialogDescription={"Preview the Application"}
              openDialog={openPreviewDialog}
              setOpenDialog={setOpenPreviewDialog}
            >
              <ApplicationForm
                projectId={projectId as string}
                applicationId={application.id}
                questions={application.questions}
                readonly
                name={""}
                description={""}
              />
            </ApplicationPreviewDialog>
          )}
          <p>
            Status:
            <span className="tracking-none font-black text-secondary">
              {application.status}
            </span>
          </p>
          {application.deadline && (
            <p>
              Deadline:
              <span className="text-sm font-semibold">
                {application.deadline.toLocaleDateString(
                  undefined,
                  DATE_TIME_FORMAT_OPTS,
                )}
              </span>
            </p>
          )}
        </CardContent>
        <CardFooter className="flex grow items-end justify-end">
          <div className="flex w-full justify-end">
            {status === ApplicationSubmissionStatus.NEW && (
              <button
                className="mr-1 flex flex-row text-secondary transition duration-300 ease-in-out hover:translate-x-2"
                onClick={() =>
                  router.push(`/project/${projectId}/apply/${application.id}`)
                }
              >
                Apply <ArrowRight className="mx-1 h-full" />
              </button>
            )}
            {status === ApplicationSubmissionStatus.DRAFT && (
              <button
                className="mr-1 flex flex-row text-secondary transition duration-300 ease-in-out hover:translate-x-2"
                onClick={() =>
                  router.push(`/project/${projectId}/apply/${application.id}`)
                }
              >
                Continue <ArrowRight className="mx-1 h-full" />
              </button>
            )}
            {status === ApplicationSubmissionStatus.SUBMITTED && (
              <p className="mr-1 flex flex-row text-secondary transition duration-300 ease-in-out">
                Applied <Check className="mx-1 h-full" />
              </p>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ApplicationCard;
