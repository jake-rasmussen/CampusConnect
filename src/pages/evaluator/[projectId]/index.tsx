import Error from "next/error";
import { useRouter } from "next/router";
import { LicenseOff } from "tabler-icons-react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button } from "@heroui/react";

import ApplicationEvaluatorCard from "~/components/applications/evaluator/applicationEvaluatorCard";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import PageWrapper from "~/components/pageWrapper";

const ViewApplicantsForApplication = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const applicationId = router.query.applicationId as string; // Extract applicationId from URL

  const {
    data: applications,
    isLoading,
    isError,
    error,
  } = api.applicationRouter.getProjectApplicationsByProjectIdForEvaluators.useQuery(
    { projectId },
    { enabled: !!projectId }
  );

  const openApplication = (id: string) => {
    router.push(
      { pathname: router.pathname, query: { ...router.query, applicationId: id } },
      undefined,
      { shallow: true }
    );
  };
  
  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <PageWrapper title="Evaluate Applications">
        <section className="mt-10 flex w-full justify-center">
          {applications.length > 0 ? (
            <div className="flex max-w-4xl flex-wrap justify-center gap-4">
              {applications.map((application, index) => (
                <div key={`applicationSubmission${index}`} onClick={() => openApplication(application.id)}>
                  <ApplicationEvaluatorCard
                    application={application}
                    projectId={projectId}
                    isOpen={applicationId === application.id} // Pass isOpen prop
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex max-w-sm flex-col items-center justify-center gap-y-2 text-center">
              <LicenseOff className="h-44 w-44 text-secondary" />
              <h3 className="text-2xl font-semibold uppercase">
                There are no applications
              </h3>
            </div>
          )}
        </section>
      </PageWrapper>
    );
  }
};

ViewApplicantsForApplication.getLayout = (page: React.ReactElement) => {
  return <UserLayout>{page}</UserLayout>;
};

export default ViewApplicantsForApplication;
