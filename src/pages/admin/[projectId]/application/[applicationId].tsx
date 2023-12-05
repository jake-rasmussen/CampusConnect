import { ApplicationQuestion } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

import ApplicationEditForm from "~/components/applications/editor/applicationEditForm";
import { ConfirmationFormType } from "~/components/applications/editor/applicationPublishConfirmationDialog";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import { useEffect, type JSXElementConstructor, type ReactElement } from "react";

const EditApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;
  const projectId = router.query.projectId as string;

  const queryClient = api.useContext();

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = api.applicationRouter.getApplicationById.useQuery(
    {
      applicationId,
    },
    {
      enabled: !!applicationId,
      refetchOnWindowFocus: false,
    },
  );

  const createApplicationQuestion =
    api.applicationQuestionRouter.createApplicationQuestion.useMutation();
  const deleteAllApplicationQuestions =
    api.applicationQuestionRouter.deleteApplicationQuestionByApplicationId.useMutation();

  const updateApplication = api.applicationRouter.updateApplication.useMutation(
    {
      onSuccess() {
        toast.dismiss();
        toast.success("Application saved!");
        queryClient.invalidate();
      },
    },
  );

  const handlePublishApplication =
    api.applicationRouter.publishApplication.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Application published!");
        queryClient.invalidate();
        router.push(`/admin/${projectId}/`);
      },
    });

  const saveApplication = async (
    name: string,
    description: string,
    questions: ApplicationQuestion[],
  ) => {
    deleteAllApplicationQuestions.mutate({
      applicationId: applicationId,
      projectId,
    });

    let count = 0;
    for (const question of questions) {
      createApplicationQuestion.mutate({
        ...question,
        applicationId: applicationId,
        answerChoices: question.answerChoices,
        orderNumber: count++,
        projectId,
      });
    }

    updateApplication.mutate({
      applicationId: applicationId,
      name,
      description,
      projectId,
    });
  };

  const publishApplication = async (
    name: string,
    description: string,
    values: ConfirmationFormType,
    questions: ApplicationQuestion[],
  ) => {
    await saveApplication(name, description, questions);

    const deadline = new Date(values.date.getTime());
    deadline.setHours(values.time.getHours(), values.time.getMinutes(), 0, 0);
    handlePublishApplication.mutate({
      applicationId,
      deadline,
      skills: values.skills,
      projectId,
    });
  };

  useEffect(() => toast.dismiss(), []);

  if (isLoading) {
    return <LoadingPage />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <>
        <HeaderOutline>
          <h2 className="font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
            Application Editor
          </h2>
        </HeaderOutline>

        <main className="py-10">
          <div className="mx-20">
            <ApplicationEditForm
              applicationId={applicationId}
              projectId={projectId}
              name={application.name}
              description={application.description}
              savedQuestions={application.questions}
              saveApplication={saveApplication}
              publishApplication={publishApplication}
            />
          </div>
        </main>
      </>
    );
  }
};

EditApplication.getLayout = (
  page: ReactElement<any, string | JSXElementConstructor<any>>,
) => {
  //TODO: Replace with admin layout
  return <UserLayout>{page}</UserLayout>;
};

export default EditApplication;
