import {
  ClubApplicationAnswerChoice,
  ClubApplicationQuestion,
  ClubApplicationStatus,
} from "@prisma/client";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useState } from "react";
import { Edit, Eye, Eyeglass } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import ApplicationForm from "~/components/applications/applicationForm";
import ApplicationPreviewDialog from "~/components/applications/editor/applicationPreviewDialog";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import { dateToStringFormatted } from "~/utils/helpers";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shadcn_ui/card";

import type { ClubApplication } from "@prisma/client";

type PropType = {
  clubApplication: ClubApplication;
  clubId: string;
  editable: boolean;
};

const ApplicationCard = (props: PropType) => {
  const { clubApplication, editable } = props;
  const router = useRouter();
  const { clubId } = router.query;

  const displayEditComponent =
    editable && clubApplication.status === ClubApplicationStatus.DRAFT;
  const displayPreviewComponent =
    editable && clubApplication.status !== ClubApplicationStatus.DRAFT;

  const [openPreviewDialog, setOpenPreviewDialog] = useState(false);

  return (
    <>
      <Card className="relative my-6 mb-0 mr-4 w-[17.5rem] rounded-xl bg-white shadow-xl">
        <CardHeader>
          <CardTitle>{clubApplication.name}</CardTitle>
          <CardDescription>{clubApplication.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {displayEditComponent && (
            <div className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform transition ease-in-out">
              <Link
                href={`/member/${clubId as string}/${clubApplication.id}/edit/`}
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
                    <Eye className="mx-auto h-24 w-24 text-gray opacity-0 duration-300 group-hover:text-primary group-hover:opacity-100" />
                  </div>
                </div>
              }
              dialogDescription={""}
              openDialog={openPreviewDialog}
              setOpenDialog={setOpenPreviewDialog}
            >
              <ApplicationForm
                applicationId={clubApplication.id}
                description={null}
                name={null}
                questions={null}
              />
            </ApplicationPreviewDialog>
          )}
          <p>
            Status:
            <span className="tracking-none font-black text-secondary">
              {clubApplication.status}
            </span>
          </p>
          {clubApplication.deadline && (
            <p>
              Deadline:
              <span className="text-sm font-semibold">
                {clubApplication.deadline.toLocaleDateString(
                  undefined,
                  DATE_TIME_FORMAT_OPTS,
                )}
              </span>
            </p>
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
