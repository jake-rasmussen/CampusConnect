import {
  ApplicationSubmission,
  ApplicationSubmissionAnswer,
  ApplicationSubmissionStatus,
} from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ApplicationForm, {
  ApplicationFormSubmissionAnswer,
} from "~/components/applications/applicationForm";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "../../../_app";

const Apply: NextPageWithLayout = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const applicationId = router.query.applicationId as string;

  const [isSaving, setIsSaving] = useState(false);
  const [savedSubmission, setSavedSubmission] = useState<
    | (ApplicationSubmission & {
      applicationSubmissionAnswers: ApplicationSubmissionAnswer[];
    })
    | undefined
  >();

  const {
    data: application,
    isLoading: isLoadingApplication,
    isError: isErrorApplication,
    error: errorApplication,
  } = api.applicationRouter.getApplicationById.useQuery(
    {
      applicationId: applicationId || "",
    },
    {
      enabled: !!applicationId,
    },
  );

  const {
    data: userSubmissions,
    isLoading: isLoadingUserSubmissions,
    isError: isErrorUserSubmissions,
    error: errorUserSubmissions,
  } = api.applicationSubmissionRouter.getApplicationSubmissionsForUser.useQuery();

  const upsertApplicationSubmission =
    api.applicationSubmissionRouter.upsertApplicationSubmission.useMutation({});

  const createApplicationSubmissionAnswer =
    api.applicationSubmissionAnswerRouter.createApplicationSubmissionAnswer.useMutation(
      {},
    );
  const deleteApplicationSubmissionAnswerChoices =
    api.applicationSubmissionAnswerRouter.deleteAllApplicationSubmissionAnswersByApplicationSubmissionId.useMutation(
      {},
    );

  const handleSaveAnswers = async (
    answers: any,
  ) => {
    if (applicationId) {
      setIsSaving(true); // && !isSaving
      const applicationSubmission =
        await upsertApplicationSubmission.mutateAsync({
          applicationSubmissionId: savedSubmission?.id,
          applicationId,
          status: ApplicationSubmissionStatus.DRAFT,
        });

      deleteApplicationSubmissionAnswerChoices.mutate({
        applicationSubmissionId: applicationSubmission.id,
      });

      console.log(answers);
      if (answers) {
        for (let [index, answer] of answers) {
          console.log(answer);
          createApplicationSubmissionAnswer.mutate({
            applicationSubmissionId: applicationSubmission.id,
            applicationQuestionId: answer.applicationQuestionId,
            answer: answer.answer as (string | string[]),
          });
        }
      }
    }
  };

  useEffect(() => {
    if (userSubmissions && application) {
      setSavedSubmission(
        userSubmissions.find(
          (submission) => submission.applicationId === application.id,
        ),
      );
      // TODO: deal with answer ordering
    }
  }, [application, userSubmissions]);

  if (!applicationId || isLoadingApplication || isLoadingUserSubmissions) {
    return <LoadingPage />;
  } else if (isErrorApplication || isErrorUserSubmissions) {
    return (
      <Error
        statusCode={
          errorApplication?.data?.httpStatus ||
          errorUserSubmissions?.data?.httpStatus ||
          500
        }
      />
    );
  } else {
    return (
      <section className="flex justify-center py-10">
        <div className="min-w-[80vw] max-w-4xl">
          <ApplicationForm
            projectId={projectId}
            applicationId={application.id}
            name={application.name}
            description={application.description}
            questions={application.questions}
            handleSaveAnswers={handleSaveAnswers}
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
