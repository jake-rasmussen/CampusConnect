import { ApplicationSubmissionStatus } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";

import LoadingSection from "~/components/loadingSection";
import { api } from "~/utils/api";
import ApplicationCard from "./applicationCard";
import ApplicationCreator from "./applicationCreator";
import ApplicationsOutline from "./applicationsOutline";

import type { Application, ApplicationQuestion } from "@prisma/client";

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
          <>
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
          </>
        </ApplicationsOutline>
        {editable && <ApplicationCreator projectId={projectId} />}
      </section>
    );
  }
};

export default Applications;
