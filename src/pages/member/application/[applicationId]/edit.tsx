import { ClubApplicationQuestion } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";

import ApplicationEditForm from "~/components/applications/editor/applicationEditForm";
import HeaderOutline from "~/components/dashboard/header/headerOutline";
import EditApplicationSkeleton from "~/components/skeletons/editApplicationSkeleton";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { JSXElementConstructor, ReactElement } from "react";

const EditApplication = () => {
  const router = useRouter();
  const applicationId = router.query.applicationId as string;

  const {
    data: application,
    isLoading,
    isError,
    error,
  } = api.clubApplicationRouter.getClubApplicationById.useQuery(
    {
      applicationId,
    },
    { enabled: !!applicationId },
  );

  const deleteAllApplicaitonQuestions =
    api.clubApplicationQuestionRouter.deleteAllClubApplicationQuestionsByClubApplicationId.useMutation();
  const createApplicationQuestion =
    api.clubApplicationQuestionRouter.createClubApplicationQuestion.useMutation();
  const updateApplication =
    api.clubApplicationRouter.updateClubApplication.useMutation({});

  const handleSubmit = (
    name: string,
    description: string,
    questions: ClubApplicationQuestion[],
  ) => {
    console.log(name, description, questions);
    updateApplication.mutate({
      clubApplicationId: applicationId,
      name,
      description,
    });

    deleteAllApplicaitonQuestions.mutate({
      clubApplicationId: applicationId,
    });

    questions.forEach((question: ClubApplicationQuestion, index: number) => {
      createApplicationQuestion.mutate({
        clubApplicationId: applicationId,
        required: question.required,
        orderNumber: index,
        question: question.question,
        type: question.type,
      });
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
