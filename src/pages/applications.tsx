import { ApplicationSubmissionStatus } from "@prisma/client";
import Error from "next/error";

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
      <main className="w-full">
        <Header name={"My Applications"} editable={false} />
        <section className="mt-10 flex w-full items-center justify-center">
          <div className="flex max-w-4xl flex-wrap items-center justify-center">
            {applicationSubmissions.map((savedApplication, index) => (
              <ApplicationCard
                application={savedApplication.application}
                projectId={savedApplication.application.projectId}
                editable={false}
                previewable={
                  savedApplication.applicationSubmissionStatus !==
                  ApplicationSubmissionStatus.DRAFT
                }
                savedAnswers={savedApplication.applicationSubmissionAnswers}
                status={savedApplication.applicationSubmissionStatus}
                key={`applicationSubmission${index}`}
              />
            ))}
          </div>
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
