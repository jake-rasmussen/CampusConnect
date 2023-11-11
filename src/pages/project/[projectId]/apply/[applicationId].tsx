import {
  ApplicationSubmission,
  ApplicationSubmissionAnswer,
  ApplicationSubmissionStatus,
} from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import ApplicationForm from "~/components/applications/applicationForm";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "../../../_app";

const Apply: NextPageWithLayout = () => {
  const router = useRouter();
  const projectId = router.query.projectId as string;
  const applicationId = router.query.applicationId as string;

  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    api.applicationSubmissionRouter.upsertApplicationSubmission.useMutation({
      onSuccess() {
        if (isSubmitted) router.push(`/project/${projectId}`);
      },
      onError() {
        setIsSaving(false);
        setIsSubmitted(false);
      },
    });

  const createApplicationSubmissionAnswer =
    api.applicationSubmissionAnswerRouter.createApplicationSubmissionAnswer.useMutation(
      {
        onSuccess() {
          setIsSaving(false);
          if (!isSubmitted) {
            toast.dismiss();
            toast.success("Successfully Saved Application!");
          }
        },
        onError() {
          setIsSaving(false);
          setIsSubmitted(false);

          toast.dismiss();
          toast.error("Error...");
        },
      },
    );

  const deleteApplicationSubmissionAnswerChoices =
    api.applicationSubmissionAnswerRouter.deleteAllApplicationSubmissionAnswersByApplicationSubmissionId.useMutation();

  const handleSaveAnswers = async (
    answers: ApplicationSubmissionAnswer[],
    submit?: boolean,
  ) => {
    if (submit) setIsSubmitted(true);

    if (applicationId && !isSaving) {
      setIsSaving(true);
      const applicationSubmission =
        await upsertApplicationSubmission.mutateAsync({
          applicationSubmissionId: savedSubmission?.id,
          applicationId,
          status: submit
            ? ApplicationSubmissionStatus.SUBMITTED
            : ApplicationSubmissionStatus.DRAFT,
        });

      await deleteApplicationSubmissionAnswerChoices.mutateAsync({
        applicationSubmissionId: applicationSubmission.id,
      });

      if (answers) {
        answers.forEach(async (answer) => {
          await createApplicationSubmissionAnswer.mutateAsync({
            applicationSubmissionId: applicationSubmission.id,
            applicationQuestionId: answer.applicationQuestionId,
            answer: answer.answer as string | string[],
          });
        });
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
            savedAnswers={savedSubmission?.applicationSubmissionAnswers}
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
