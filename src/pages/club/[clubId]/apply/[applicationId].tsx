import Error from "next/error";
import { useRouter } from "next/router";

import ApplicationForm from "~/components/applications/applicationForm";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "../../../_app";

const Apply: NextPageWithLayout = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;
  const applicationId = router.query.applicationId as string;

  const {
    data: clubApplication,
    isLoading: isLoadingClubApplication,
    isError: isErrorClubApplication,
    error: errorClubApplication,
  } = api.clubApplicationRouter.getClubApplicationById.useQuery(
    {
      clubApplicationId: applicationId || "",
    },
    {
      enabled: !!applicationId,
    },
  );

  const {
    data: clubApplicationSubmission,
    isLoading: isLoadingClubApplicationSubmission,
    isError: isErrorClubApplicationSubmission,
    error: errorClubApplicationSubmission,
  } = api.clubApplicationSubmissionRouter.getClubApplicationSubmissionByClubApplicationId.useQuery(
    {
      clubApplicationId: applicationId || "",
    },
    { enabled: !!applicationId },
  );

  if (
    !applicationId || 
    isLoadingClubApplication ||
    isLoadingClubApplicationSubmission
  ) {
    return <LoadingPage />;
  } else if (isErrorClubApplication || isErrorClubApplicationSubmission) {
    return (
      <Error
        statusCode={
          errorClubApplication?.data?.httpStatus ||
          errorClubApplicationSubmission?.data?.httpStatus ||
          500
        }
      />
    );
  } else {
    return (
      <section className="flex justify-center py-10">
        <div className="min-w-[80vw] max-w-4xl">
          <ApplicationForm
            clubId={clubId}
            name={clubApplication.name}
            description={clubApplication.description}
            questions={clubApplication.questions}
            savedAnswers={
              clubApplicationSubmission?.clubApplicationSubmissionAnswers
            }
            clubApplicationSubmissionId={clubApplicationSubmission?.id}
            clubApplicationId={clubApplication.id}
          />
        </div>
      </section>
    );
  }
};

Apply.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Apply;
