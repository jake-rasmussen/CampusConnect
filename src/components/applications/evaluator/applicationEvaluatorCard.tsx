import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import {
  Application,
  ApplicationSubmissionEvaluation,
  User,
} from "@prisma/client";
import { Pencil } from "tabler-icons-react";

import { MovingBorder } from "~/components/aceternity-ui/moving-border";
import PreviewModal from "~/components/previewModal";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import ApplicationSubmissionsTable from "./applicationSubmissionsTable";

type PropType = {
  application: Application & {
    applicationSubmissions: {
      id: string;
      user: User;
      applicationSubmissionEvaluation: ApplicationSubmissionEvaluation | null;
    }[];
  };
  projectId: string;
};

const ApplicationEvaluatorCard = (props: PropType) => {
  const { application, projectId } = props;

  return (
    <main className="group relative m-2 h-fit w-[17.5rem] overflow-visible p-[3px]">
      <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 transition duration-300 ease-in-out group-hover:opacity-100">
        <MovingBorder duration={3000} rx="30%" ry="30%">
          <div className="h-80 w-80 bg-[radial-gradient(var(--sky-500)_40%,transparent_60%)] opacity-[0.8]" />
        </MovingBorder>
      </div>

      <Card className="relative flex flex-col rounded-2xl bg-white shadow-xl">
        <CardHeader className="flex flex-col items-start justify-start py-4 font-bold">
          <h1 className="font-black">{application.name}</h1>
          <h4 className="font-semibold">{application.description}</h4>
        </CardHeader>
        <CardBody className="group flex h-full flex-col">
          <div className="flex grow flex-col justify-end">
            <Divider className="bg-secondary" />
            <p className="my-2">
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
        </CardBody>

        <PreviewModal
          triggerButton={
            <div className="absolute z-30 h-full w-full opacity-0 transition duration-300 ease-in-out group-hover:cursor-pointer group-hover:opacity-100">
              <div className="flex h-full w-full select-none items-center justify-center rounded-2xl bg-white bg-opacity-50">
                <Pencil className="h-[5rem] w-[5rem] transition duration-300 ease-in-out" />
              </div>
            </div>
          }
          dialogTitle="Preview Application Submissions"
          dialogDescription="Click a row to evaluate the candidate"
          className="max-w-3xl"
        >
          <ApplicationSubmissionsTable
            projectId={projectId}
            applicationSubmissions={application.applicationSubmissions}
          />
        </PreviewModal>
      </Card>
    </main>
  );
};

export default ApplicationEvaluatorCard;
