import { ClubApplicationQuestion } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

import ApplicationEditForm from "~/components/applications/editor/applicationEditForm";
import { ClubApplicationQuestionForForm } from "~/components/applications/editor/questionsEditor";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import EditApplicationSkeleton from "~/components/skeletons/editApplicationSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { JSXElementConstructor, ReactElement } from "react";

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
      refetchOnWindowFocus: false
    },
  );

  const createApplicationQuestion =
    api.clubApplicationQuestionRouter.createClubApplicationQuestion.useMutation(
      {
        onSuccess() {
          console.log("Created Question");
        },
      },
    );
  const updateApplicationQuestion =
    api.clubApplicationQuestionRouter.updateClubApplicationQuestionById.useMutation(
      {
        onSuccess() {
          console.log("Updated Question");
        },
      },
    );
  const deleteApplicationQuestion =
    api.clubApplicationQuestionRouter.deleteClubApplicationById.useMutation({
      onSuccess() {
        console.log("Deleted Question");
      },
    });
  const updateApplication =
    api.clubApplicationRouter.updateClubApplication.useMutation({
      onSuccess() {
        queryClient.invalidate();
        console.log("Invalidated Queries");
      },
    });

  const handleSubmit = async (
    name: string,
    description: string,
    questions: ClubApplicationQuestion[],
    questionsToDelete: ClubApplicationQuestion[],
  ) => {
    questions.forEach(
      async (question: ClubApplicationQuestion, index: number) => {
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
      },
    );

    questionsToDelete.forEach(async (question: ClubApplicationQuestion) => {
      if (question.id !== undefined) {
        await deleteApplicationQuestion.mutateAsync({
          clubApplicationQuestionId: question.id,
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
              key={`1`}
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
