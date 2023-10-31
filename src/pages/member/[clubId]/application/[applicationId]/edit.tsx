import { ClubApplicationQuestion } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";

import ApplicationEditForm from "~/components/applications/editor/applicationEditForm";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import EditApplicationSkeleton from "~/components/skeletons/editApplicationSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { JSXElementConstructor, ReactElement } from "react";
import { ConfirmationFormType } from "~/components/applications/editor/applicationPublishConfirmationDialog";
import toast from "react-hot-toast";

const EditApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;
  const clubId = router.query.clubId as string;

  const queryClient = api.useContext();

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = api.clubApplicationRouter.getClubApplicationById.useQuery(
    {
      clubApplicationId: applicationId,
    },
    {
      enabled: !!applicationId,
      refetchOnWindowFocus: false,
    },
  );

  const createApplicationQuestion =
    api.clubApplicationQuestionRouter.createClubApplicationQuestion.useMutation();
  const deleteAllApplicationQuestions =
    api.clubApplicationQuestionRouter.deleteClubApplicationQuestionByApplicationId.useMutation();

  const updateApplication =
    api.clubApplicationRouter.updateClubApplication.useMutation({
      onSuccess() {
        queryClient.invalidate();
      },
    });

  const publishClubApplication =
    api.clubApplicationRouter.publishClubApplication.useMutation({
      onSuccess() {
        toast.success("Application published!");
        queryClient.invalidate();
        router.push(`/member/${clubId as string}/`);
      },
    });

  const saveApplication = async (
    name: string,
    description: string,
    questions: ClubApplicationQuestion[],
  ) => {
    deleteAllApplicationQuestions.mutate({
      clubApplicationId: applicationId,
    });

    let count = 0;
    for (const question of questions) {
      createApplicationQuestion.mutate({
        ...question,
        clubApplicationId: applicationId,
        clubApplicationAnswerChoices: question.clubApplicationAnswerChoices,
        orderNumber: count++,
      });
    }

    updateApplication.mutate({
      clubApplicationId: applicationId,
      name,
      description,
    });
  };


  const publishApplication = async (
    name: string,
    description: string,
    values: ConfirmationFormType,
    questions: ClubApplicationQuestion[],
  ) => {
    await saveApplication(name, description, questions);

    const deadline = new Date(values.date.getTime());
    deadline.setHours(values.time.getHours(), values.time.getMinutes(), 0, 0);
    publishClubApplication.mutate({
      applicationId,
      deadline,
    });
  };


  if (isLoading) {
    return <EditApplicationSkeleton />;
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
              clubId={clubId}
              name={application.name}
              description={application.description}
              questions={application.questions}
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
