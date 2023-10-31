import { ClubApplicationSubmissionStatus } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";

import LoadingPage from "~/components/loadingPage";
import { api } from "~/utils/api";
import ApplicationCard from "./applicationCard";
import ApplicationCreator from "./applicationCreator";
import ApplicationsOutline from "./applicationsOutline";

import type { ClubApplication, ClubApplicationQuestion } from "@prisma/client";

type PropType = {
  applications: (ClubApplication & {
    questions: ClubApplicationQuestion[];
  })[];
  clubId: string;
  editable: boolean;
};

const Applications = (props: PropType) => {
  const { applications, clubId, editable } = props;

  const {
    data: userApplicationSubmissions,
    isLoading,
    isError,
    error,
  } = api.clubApplicationSubmissionRouter.getClubApplicationSubmissionsForUser.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <section className="flex flex-col items-center gap-y-8">
        <ApplicationsOutline>
          <>
            {applications.map(
              (clubApplication: ClubApplication & {
                questions: ClubApplicationQuestion[];
              }, index: number) => {
                const targetClubApplication = userApplicationSubmissions.find(
                  (clubApplicationSubmission) =>
                    clubApplicationSubmission.clubApplicationId ===
                    clubApplication.id,
                );
                if (targetClubApplication) {
                  return (
                    <ApplicationCard
                      clubApplication={clubApplication}
                      clubId={clubId}
                      editable={editable}
                      status={
                        targetClubApplication.clubApplicationSubmissionStatus
                      }
                      key={`clubApplication${index}`}
                    />
                  );
                } else {
                  return (
                    <ApplicationCard
                      clubApplication={clubApplication}
                      clubId={clubId}
                      editable={editable}
                      status={ClubApplicationSubmissionStatus.NEW}
                      key={`clubApplication${index}`}
                    />
                  );
                }
              },
            )}
          </>
        </ApplicationsOutline>
        {editable && <ApplicationCreator clubId={clubId} />}
      </section>
    );
  }
};

export default Applications;
