import {
  ClubApplicationAnswerChoice,
  ClubApplicationQuestion,
} from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect } from "react";

import ApplicationEditForm from "~/components/applications/editor/applicationEditForm";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import EditApplicationSkeleton from "~/components/skeletons/editApplicationSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { Dispatch, JSXElementConstructor, ReactElement, SetStateAction } from "react";

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

  const createApplicationAnswerChoice =
    api.clubApplicationAnswerRouter.createClubApplicationAnswerChoice.useMutation();
  const updateApplicationAnswerChoice =
    api.clubApplicationAnswerRouter.updateClubApplicationAnswerChoiceById.useMutation();
  const deleteApplicationAnswerChoice =
    api.clubApplicationAnswerRouter.deleteClubApplicationAnswerChoiceById.useMutation();

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
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[],
    questionsToDelete: (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[],
    answerChoicesToDelete: ClubApplicationAnswerChoice[],
    setQuestionsState: Dispatch<SetStateAction<(ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[]>>
  ) => {
    questions.forEach(
      async (
        question: ClubApplicationQuestion & {
          clubApplicationAnswers: ClubApplicationAnswerChoice[];
        },
        index: number,
      ) => {
        let updatedQuestion: (ClubApplicationQuestion & {
          clubApplicationAnswers: ClubApplicationAnswerChoice[];
        });
        if (question.id === undefined) {
          updatedQuestion = (await createApplicationQuestion.mutateAsync({
            clubApplicationId: applicationId,
            required: question.required,
            orderNumber: index,
            question: question.question,
            type: question.type,
          })) as ClubApplicationQuestion & {
            clubApplicationAnswers: ClubApplicationAnswerChoice[];
          };
        } else {
          updatedQuestion = (await updateApplicationQuestion.mutateAsync({
            clubApplicaitonQuestionId: question.id,
            required: question.required,
            orderNumber: index,
            question: question.question,
            type: question.type,
          })) as ClubApplicationQuestion & {
            clubApplicationAnswers: ClubApplicationAnswerChoice[];
          };
        }

        let updatedAnswers: ClubApplicationAnswerChoice[] = [];
        (question.clubApplicationAnswers || []).forEach(
          async (answer: ClubApplicationAnswerChoice) => {
            if (answer.id === undefined) {
              updatedAnswers.push(await createApplicationAnswerChoice.mutateAsync({
                answerChoice: answer.answerChoice,
                clubApplicationQuestionId: question.id ? question.id : updatedQuestion.id,
              }));
            } else {
              updatedAnswers.push(await updateApplicationAnswerChoice.mutateAsync({
                clubApplicationAnswerChoiceId: answer.id,
                answerChoice: answer.answerChoice,
              }));
            }
          },
        );
        
        updatedQuestion.clubApplicationAnswers = updatedAnswers;
        let questionsCopy = [...questions] 
        questionsCopy[index] = updatedQuestion
        setQuestionsState(questionsCopy);
      },
    );

    questionsToDelete.forEach(
      async (
        question: ClubApplicationQuestion & {
          clubApplicationAnswers: ClubApplicationAnswerChoice[];
        },
      ) => {
        if (question.id !== undefined) {
          await deleteApplicationQuestion.mutateAsync({
            clubApplicationQuestionId: question.id
          })
        }
      },
    );

    answerChoicesToDelete.forEach(
      async (answer: ClubApplicationAnswerChoice) => {
        if (answer.id !== undefined) {
          await deleteApplicationAnswerChoice.mutateAsync({
            clubApplicationAnswerChoiceId: answer.id,
          });
        }
      },
    );

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
