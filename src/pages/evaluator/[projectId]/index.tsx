import Error from "next/error";
import { useRouter } from "next/router";
import { LicenseOff } from "tabler-icons-react";

import ApplicationEvaluatorCard from "~/components/applications/evaluator/applicationEvaluatorCard";
import Header from "~/components/dashboard/header/header";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

const ViewApplicantsForApplication = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = api.applicationRouter.getProjectApplicationsByProjectIdForEvaluators.useQuery(
    {
      projectId,
    },
    { enabled: !!projectId },
  );

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <main className="w-full pb-10">
        <Header name={"Evaluate Applications"} editable={false} />
        <section className="mt-10 flex w-full justify-center">
          {applications.length > 0 ? (
            <div className="flex max-w-4xl flex-wrap justify-center gap-4">
              {applications.map((application, index) => (
                <ApplicationEvaluatorCard
                  application={application}
                  projectId={projectId}
                  key={`applicationSubmission${index}`}
                />
              ))}
            </div>
          ) : (
            <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
              <LicenseOff className="h-44 w-44 text-secondary" />
              <h3 className="text-2xl font-semibold uppercase">
                There are no applications!
              </h3>
            </div>
          )}
        </section>
      </main>
    );
  }
};

ViewApplicantsForApplication.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ViewApplicantsForApplication;
