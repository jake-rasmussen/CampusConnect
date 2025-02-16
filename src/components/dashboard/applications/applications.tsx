import { ApplicationSubmissionStatus } from "@prisma/client";
import Error from "next/error";
import { twMerge } from "tailwind-merge";

import LoadingSection from "~/components/loadingSection";
import { api } from "~/utils/api";
import ApplicationCard from "./applicationCard";
import ApplicationCreator from "./applicationCreator";
import ApplicationsOutline from "./applicationsOutline";

import type { Application, ApplicationQuestion } from "@prisma/client";
import { LicenseOff } from "tabler-icons-react";

type PropType = {
  applications: (Application & {
    questions: ApplicationQuestion[];
  })[];
  projectId: string;
  editable: boolean;
};

const Applications = (props: PropType) => {
  const { applications, projectId, editable } = props;

  const {
    data: userApplicationSubmissions,
    isLoading,
    isError,
    error,
  } = api.applicationSubmissionRouter.getApplicationSubmissionsForUser.useQuery();

  if (isLoading) {
    return <LoadingSection />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <section className="flex flex-col items-center gap-y-8">
        <ApplicationsOutline>
          {applications.length > 0 ? (
            <div
              className={twMerge(
                "flex flex-wrap justify-center gap-4",
                editable && "gap-y-14",
              )}
            >
              {applications.map(
                (
                  application: Application & {
                    questions: ApplicationQuestion[];
                  },
                  index: number,
                ) => {
                  const savedApplication = userApplicationSubmissions.find(
                    (applicationSubmission) =>
                      applicationSubmission.applicationId === application.id,
                  );
                  if (savedApplication) {
                    return (
                      <ApplicationCard
                        application={application}
                        projectId={projectId}
                        editable={editable}
                        status={savedApplication.applicationSubmissionStatus}
                        previewable={
                          savedApplication.applicationSubmissionStatus !==
                          ApplicationSubmissionStatus.DRAFT
                        }
                        savedAnswers={
                          savedApplication.applicationSubmissionAnswers
                        }
                        key={`application${index}`}
                      />
                    );
                  } else {
                    return (
                      <ApplicationCard
                        application={application}
                        projectId={projectId}
                        editable={editable}
                        status={ApplicationSubmissionStatus.NEW}
                        key={`application${index}`}
                      />
                    );
                  }
                },
              )}
            </div>
          ) : (
            <>
              <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
                <LicenseOff className="h-40 w-40 text-black" />
                <h3 className="text-2xl font-semibold uppercase">
                  There are no applications
                </h3>
              </div>
            </>
          )}
        </ApplicationsOutline>
        {editable && <ApplicationCreator projectId={projectId} />}
      </section>
    );
  }
};

export default Applications;
