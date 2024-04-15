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
  const queryClient = api.useContext();

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
    data: fileList,
    isLoading: isLoadingFileList,
    isError: isErrorFileList,
    error: errorFileList,
  } = api.supabaseRouter.getSupabaseFolder.useQuery({
    applicationId,
  });

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = api.usersRouter.getUser.useQuery();

  const {
    data: userSubmissions,
    isLoading: isLoadingUserSubmissions,
    isError: isErrorUserSubmissions,
    error: errorUserSubmissions,
  } = api.applicationSubmissionRouter.getApplicationSubmissionsForUser.useQuery();

  const upsertApplicationSubmission =
    api.applicationSubmissionRouter.upsertApplicationSubmission.useMutation({
      onSuccess() {
        queryClient.applicationRouter.getProjectApplicationsByProjectIdForUsers.invalidate(
          { projectId },
        );
        queryClient.applicationSubmissionRouter.getApplicationSubmissionsForUser.invalidate();
      },
    });

  const createApplicationSubmissionAnswer =
    api.applicationSubmissionAnswerRouter.createApplicationSubmissionAnswer.useMutation(
      {
        onError() {
          toast.dismiss();
          toast.error("Error...");
          setIsSaving(false);
        },
      },
    );

  const deleteApplicationSubmissionAnswerChoices =
    api.applicationSubmissionAnswerRouter.deleteAllApplicationSubmissionAnswersByApplicationSubmissionId.useMutation();

  const createSignedUrlUpload =
    api.supabaseRouter.createSignedUrlUpload.useMutation({});

  const getPresignedUrlGet =
    api.supabaseRouter.createSignedUrlDownload.useMutation();

  const handleSaveAnswers = async (
    answers: ApplicationSubmissionAnswer[],
    files: File[],
    submit?: boolean,
  ) => {
    setIsSaving(true);

    if (applicationId && !isSaving) {
      toast.dismiss();
      if (submit) {
        toast.loading("Submitting Application...");
      } else {
        toast.loading("Saving Application...");
      }

      const saveAnswers = async () => {
        for (const file of files) {
          if (!fileList?.includes(file.name)) {
            const urlDownload = await getPresignedUrlGet.mutateAsync({
              applicationId,
              filename: file.name,
            });

            if (typeof urlDownload !== typeof "str") {
              const url = await createSignedUrlUpload.mutateAsync({
                applicationId,
                filename: file.name,
              });

              try {
                await fetch(url as string, {
                  method: "PUT",
                  headers: { "Content-Type": file.type },
                  body: file.slice(),
                });
              } catch (e) {
                toast.dismiss();
                toast.error("Error...");

                setIsSaving(false);
                return;
              }
            }
          }
        }

        const applicationSubmission =
          await upsertApplicationSubmission.mutateAsync({
            applicationSubmissionId: savedSubmission?.id,
            applicationId,
            status: submit
              ? ApplicationSubmissionStatus.SUBMITTED
              : ApplicationSubmissionStatus.DRAFT,
          });

        setSavedSubmission(applicationSubmission);

        await deleteApplicationSubmissionAnswerChoices.mutateAsync({
          applicationSubmissionId: applicationSubmission.id,
        });

        if (answers) {
          for (const answer of answers) {
            await createApplicationSubmissionAnswer.mutateAsync({
              applicationSubmissionId: applicationSubmission.id,
              applicationQuestionId: answer.applicationQuestionId,
              answer: answer.answer as string | string[],
            });
          }
        }

        if (submit) {
          toast.loading("Redirecting...");
          toast.dismiss();
          router.push(`/project/${projectId}`);
        } else {
          toast.dismiss();
          toast.success("Successfully Saved Application!");
        }
      };

      saveAnswers()
        .then(() => {
          if (!submit) setTimeout(() => setIsSaving(false), 1000);
        })
        .catch(() => setIsSaving(false));
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

  if (
    !applicationId ||
    isLoadingApplication ||
    isLoadingUserSubmissions ||
    isLoadingFileList ||
    isLoadingUser
  ) {
    return <LoadingPage />;
  } else if (
    isErrorApplication ||
    isErrorUserSubmissions ||
    isErrorFileList ||
    isErrorUser
  ) {
    return (
      <Error
        statusCode={
          errorApplication?.data?.httpStatus ||
          errorUserSubmissions?.data?.httpStatus ||
          errorFileList?.data?.httpStatus ||
          errorUser?.data?.httpStatus ||
          500
        }
      />
    );
  } else if (
    savedSubmission?.applicationSubmissionStatus ===
    ApplicationSubmissionStatus.SUBMITTED
  ) {
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
            isSaving={isSaving}
            readonly
          />
        </div>
      </section>
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
            deadline={application.deadline || undefined}
            handleSaveAnswers={handleSaveAnswers}
            isSaving={isSaving}
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
