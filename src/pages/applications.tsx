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
        <section className="flex justify-center items-center w-full">
          <div className="max-w-4xl flex flex-wrap justify-center items-center">
            {applicationSubmissions.map((applicationSubmission, index) => (
              <ApplicationCard
                application={applicationSubmission.application}
                projectId={applicationSubmission.application.projectId}
                editable={false}
                previewable={applicationSubmission.applicationSubmissionStatus !== ApplicationSubmissionStatus.DRAFT}
                savedAnswers={applicationSubmission.applicationSubmissionAnswers}
                status={applicationSubmission.applicationSubmissionStatus}
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
