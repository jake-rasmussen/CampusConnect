import { ClubApplicationAnswer, ClubApplicationQuestion } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";

import ApplicationEditForm from "~/components/applications/editor/applicationEditForm";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import EditApplicationSkeleton from "~/components/skeletons/editApplicationSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import { useEffect, type JSXElementConstructor, type ReactElement } from "react";

const EditApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;

  const queryClient = api.useContext();

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = api.clubApplicationRouter.getClubApplicationById.useQuery(
    {
      applicationId,
    },
    {
      enabled: !!applicationId,
      refetchOnWindowFocus: false,
    },
  );

  const createApplicationQuestion =
    api.clubApplicationQuestionRouter.createClubApplicationQuestion.useMutation();
  const updateApplicationQuestion =
    api.clubApplicationQuestionRouter.updateClubApplicationQuestionById.useMutation();
  const deleteApplicationQuestion =
    api.clubApplicationQuestionRouter.deleteClubApplicationById.useMutation();

  const createApplicationAnswer =
    api.clubApplicationAnswerRouter.createClubApplicationAnswer.useMutation();
  const updateApplicationAnswer =
    api.clubApplicationAnswerRouter.updateClubApplicationAnswerById.useMutation();
  const deleteApplicationAnswer =
    api.clubApplicationAnswerRouter.deleteClubApplicationAnswerById.useMutation();

  const updateApplication =
    api.clubApplicationRouter.updateClubApplication.useMutation({
      onSuccess() {
        queryClient.invalidate();
      },
    });

  const handleSubmit = async (
    name: string,
    description: string,
    questions: (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswer[];
    })[],
    questionsToDelete: ClubApplicationQuestion[],
    answerChoicesToDelete: ClubApplicationAnswer[],
  ) => {
    questions.forEach(
      async (question: (ClubApplicationQuestion & {
        clubApplicationAnswers: ClubApplicationAnswer[];
      }), index: number) => {
        if (question.id === undefined) {
          await createApplicationQuestion.mutateAsync({
            clubApplicationId: applicationId,
            required: question.required,
            orderNumber: index,
            question: question.question,
            type: question.type,
          });
        } else {
          await updateApplicationQuestion.mutateAsync({
            clubApplicaitonQuestionId: question.id,
            required: question.required,
            orderNumber: index,
            question: question.question,
            type: question.type,
          });
        }

        question.clubApplicationAnswers.forEach(async (answer: ClubApplicationAnswer) => {
          if (answer.id === undefined) {
            await createApplicationAnswer.mutateAsync({
              answerChoice: answer.answerChoice,
              clubApplicationQuestionId: answer.clubApplicationQuestionId
            })
          } else {
            await updateApplicationAnswer.mutateAsync({
              clubApplicationAnswerId: answer.id,
              answerChoice: answer.answerChoice
            })
          }
        })
      },
    );

    questionsToDelete.forEach(async (question: ClubApplicationQuestion) => {
      if (question.id !== undefined) {
        await deleteApplicationQuestion.mutateAsync({
          clubApplicationQuestionId: question.id,
        });
      }
    });

    answerChoicesToDelete.forEach(async (answer: ClubApplicationAnswer) => {
      if (answer.id !== undefined) {
        await deleteApplicationAnswer.mutateAsync({
          clubApplicationAnswerId: answer.id
        });
      }
    });

    await updateApplication.mutateAsync({
      clubApplicationId: applicationId,
      name,
      description,
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
              name={application.name}
              description={application.description}
              questions={application.questions}
              onSubmit={handleSubmit}
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
