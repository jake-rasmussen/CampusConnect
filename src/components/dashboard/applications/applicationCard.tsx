import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import {
  Application,
  ApplicationQuestion,
  ApplicationStatus,
  ApplicationSubmissionAnswer,
  ApplicationSubmissionStatus,
} from "@prisma/client";
import { ProjectContext } from "lib/context"; // Import ProjectContext
import Link from "next/link";
import { useContext } from "react";
import { ArrowRight, Check, Edit, Eye, ListCheck } from "tabler-icons-react";

import { MovingBorder } from "~/components/aceternity-ui/moving-border";
import ApplicationForm from "~/components/applications/applicationForm";
import ApplicationWithdrawDialog from "~/components/applications/applicationWithdrawDialog";
import ApplicationDeleteDialog from "~/components/applications/editor/applicationDeleteDialog";
import PreviewModal from "~/components/previewModal";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";

type PropType = {
  application: Application & {
    questions: ApplicationQuestion[];
  };
  projectId: string;
  editable: boolean;
  previewable?: boolean;
  savedAnswers?: ApplicationSubmissionAnswer[];
  applicationSubmissionId?: string;
  status: ApplicationSubmissionStatus;
};

const ApplicationCard = (props: PropType) => {
  const {
    application,
    editable,
    status,
    savedAnswers,
    previewable,
    projectId,
    applicationSubmissionId,
  } = props;

  // Access the context if it's in the scope, or fallback to default colors
  const projectContext = useContext(ProjectContext);
  const primaryColor = projectContext?.colors?.primaryColor || "var(--primary)";
  const secondaryColor =
    projectContext?.colors?.secondaryColor || "var(--secondary)";

  const displayEditComponent =
    editable && application.status === ApplicationStatus.DRAFT;
  const displayPreviewComponent =
    (editable && application.status !== ApplicationStatus.DRAFT) || previewable;

  return (
    <main className="group relative m-2 h-fit w-[17.5rem] overflow-visible p-[3px]">
      {application.status !== ApplicationStatus.CLOSED && (
        <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
          <MovingBorder duration={3000} rx="30%" ry="30%">
            <div className="h-80 w-80 bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)] opacity-[0.8]" />
          </MovingBorder>
        </div>
      )}

      <Card className="relative flex flex-col overflow-visible rounded-2xl bg-white shadow-xl">
        <CardHeader className="flex flex-col items-start justify-start py-4 font-bold">
          <h1 className="font-black">{application.name}</h1>
        </CardHeader>
        <Divider />
        <CardBody className="flex flex-col gap-4">
          <h4 className="font-normal">{application.description}</h4>
          <div className="z-30 opacity-0 transition duration-300 hover:cursor-pointer group-hover:opacity-100">
            {editable && (
              <ApplicationDeleteDialog
                applicationId={application.id}
                projectId={projectId || "UNAUTHORIZED"}
              />
            )}
          </div>

          <div className="z-30 opacity-0 transition duration-300 hover:cursor-pointer group-hover:opacity-100">
            {applicationSubmissionId &&
              (status === ApplicationSubmissionStatus.SUBMITTED ||
                status === ApplicationSubmissionStatus.DRAFT) && (
                <ApplicationWithdrawDialog
                  projectId={projectId || "UNAUTHORIZED"}
                  applicationId={application.id}
                  applicationSubmissionId={applicationSubmissionId}
                />
              )}
          </div>
        </CardBody>

        <Divider />
        <CardFooter className="flex grow flex-col items-end justify-end">
          <div className="flex grow flex-col justify-end">
            <p>
              Status:{" "}
              <span
                className="tracking-none font-black"
                style={{ color: secondaryColor }} // Use inline style for text color
              >
                {application.status}
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

          <div className="flex w-full justify-end">
            {status === ApplicationSubmissionStatus.NEW &&
              application.status !== ApplicationStatus.CLOSED &&
              application.status !== ApplicationStatus.DRAFT && (
                <Link href={`/startups/${projectId}/apply/${application.id}`}>
                  <button
                    className="mr-1 flex flex-row transition duration-300 ease-in-out hover:translate-x-2"
                    style={{ color: secondaryColor }} // Inline style for dynamic color
                  >
                    Apply <ArrowRight className="mx-1 h-full" />
                  </button>
                </Link>
              )}
            {status === ApplicationSubmissionStatus.DRAFT && (
              <Link href={`/startups/${projectId}/apply/${application.id}`}>
                <button
                  className="mr-1 flex flex-row text-secondary transition duration-300 ease-in-out hover:translate-x-2"
                  style={{ color: secondaryColor }} // Inline style for dynamic color
                >
                  Continue <ArrowRight className="mx-1 h-full" />
                </button>
              </Link>
            )}
            {status === ApplicationSubmissionStatus.SUBMITTED && (
              <p
                className="mr-1 flex flex-row transition duration-300 ease-in-out"
                style={{ color: secondaryColor }} // Inline style for dynamic color
              >
                Applied <Check className="mx-1 h-full" />
              </p>
            )}
          </div>

          {editable && application.status !== ApplicationStatus.DRAFT && (
            <Link href={`/evaluator/${projectId}`}>
              <div className="absolute left-1/2 z-30 -translate-x-1/2 -translate-y-[1rem] rounded-full border border-1 border-black bg-white">
                <ListCheck
                  className="h-14 w-14 p-2 transition duration-300 ease-in-out hover:-rotate-12 hover:text-green-500"
                  style={{ color: primaryColor }} // Inline style for dynamic color
                />
              </div>
            </Link>
          )}
        </CardFooter>

        {displayEditComponent && (
          <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
            <Link
              href={`/admin/${projectId}/application/${application.id}`}
              className="group flex h-full w-full items-center opacity-0 duration-300 group-hover:opacity-100"
            >
              <div className="flex h-full w-full select-none items-center justify-center bg-white bg-opacity-50">
                <Edit
                  className="mx-auto h-24 w-24"
                  style={{ color: primaryColor }} // Inline style for dynamic color
                />
              </div>
            </Link>
          </div>
        )}

        {displayPreviewComponent && (
          <PreviewModal
            triggerButton={
              <div className="absolute z-10 h-full w-full opacity-0 transition duration-300 ease-in-out group-hover:cursor-pointer group-hover:opacity-100">
                <div className="flex h-full w-full select-none items-center justify-center rounded-2xl bg-white bg-opacity-50">
                  <Eye className="h-[5rem] w-[5rem] transition duration-300 ease-in-out" />
                </div>
              </div>
            }
            dialogTitle="Application Preview"
            dialogDescription="Preview Your Submitted Application"
          >
            <ApplicationForm
              projectId={projectId}
              applicationId={application.id}
              questions={application.questions}
              savedAnswers={savedAnswers}
              deadline={application.deadline || undefined}
              readonly
            />
          </PreviewModal>
        )}
      </Card>
    </main>
  );
};

export default ApplicationCard;
