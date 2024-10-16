import { ApplicationSubmissionStatus } from "@prisma/client";
import Error from "next/error";
import { LicenseOff } from "tabler-icons-react";

import ApplicationCard from "~/components/dashboard/applications/applicationCard";
import Header from "~/components/dashboard/header/header";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const MyApplications = () => {
  const {
    data: applicationSubmissions,
    isLoading,
    isError,
    error,
  } = api.applicationSubmissionRouter.getApplicationSubmissionsForUser.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <main className="w-full pb-52">
        <section className="mb-14 mt-28">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            My Applications
          </h1>
        </section>
        <section className="mt-10 flex w-full justify-center">
          {applicationSubmissions.length > 0 ? (
            <div className="flex max-w-4xl flex-wrap justify-center gap-4">
              {applicationSubmissions.map((savedApplication, index) => (
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
          ) : (
            <div className="flex max-w-3xl flex-col items-center justify-center gap-y-2 text-center">
              <LicenseOff className="h-44 w-44 text-secondary" />
              <h1 className="text-4xl font-bold leading-none">
                You have not submitted any applications!
              </h1>
              <p className="max-w-xl">
                To find applications, go to Open Applications, or find a project
                of interest and see if they have any open applications.
              </p>
            </div>
          )}
        </section>
      </main>
    );
  }
};

MyApplications.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default MyApplications;
