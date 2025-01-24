import { Pagination } from "@nextui-org/react";
import { ApplicationSubmissionStatus } from "@prisma/client";
import Error from "next/error";
import { useState } from "react";
import { LicenseOff } from "tabler-icons-react";

import ApplicationCard from "~/components/dashboard/applications/applicationCard";
import LoadingPage from "~/components/loadingPage";
import PageWrapper from "~/components/pageWrapper";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const MyApplications = () => {
  const {
    data: applicationSubmissions,
    isLoading,
    isError,
    error,
  } = api.applicationSubmissionRouter.getApplicationSubmissionsForUser.useQuery();

  const [page, setPage] = useState(1);
  const limit = 9; // Number of applications per page

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    const paginatedApplications = applicationSubmissions.slice(
      (page - 1) * limit,
      page * limit
    );

    const totalPages = Math.ceil(applicationSubmissions.length / limit);

    return (
      <PageWrapper title="My Applications">
        <div className="flex w-full flex-col items-center gap-8">
          {applicationSubmissions.length > 0 ? (
            <>
              <div className="flex max-w-5xl flex-wrap justify-center gap-4">
                {paginatedApplications.map((savedApplication, index) => (
                  <ApplicationCard
                    application={savedApplication.application}
                    projectId={savedApplication.application.projectId as string}
                    editable={false}
                    previewable={
                      savedApplication.applicationSubmissionStatus !==
                      ApplicationSubmissionStatus.DRAFT
                    }
                    savedAnswers={savedApplication.applicationSubmissionAnswers}
                    applicationSubmissionId={savedApplication.id}
                    status={savedApplication.applicationSubmissionStatus}
                    key={`applicationSubmission${index}`}
                  />
                ))}
              </div>

              {applicationSubmissions.length > limit && (
                <Pagination
                  total={totalPages}
                  initialPage={1}
                  page={page}
                  onChange={(newPage) => setPage(newPage)}
                />
              )}
            </>
          ) : (
            <div className="flex max-w-2xl flex-col items-center justify-center gap-y-2 text-center">
              <LicenseOff className="h-40 w-40 text-secondary" />
              <h1 className="text-2xl font-bold leading-none">
                You have not submitted any applications!
              </h1>
              <p className="max-w-xl text-gray">
                To find applications, go to Open Applications, or find a project
                of interest and see if they have any open applications.
              </p>
            </div>
          )}
        </div>
      </PageWrapper>
    );
  }
};

MyApplications.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyApplications;
