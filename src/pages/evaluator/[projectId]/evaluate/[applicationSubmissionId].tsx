import { ApplicationSubmissionComment } from "@prisma/client";
import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

import ApplicationForm from "~/components/applications/applicationForm";
import Button from "~/components/button";
import Header from "~/components/dashboard/header/header";
import LoadingPage from "~/components/loadingPage";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/shadcn_ui/card";
import { Textarea } from "~/components/shadcn_ui/textarea";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import {
  dateToStringFormatted,
  dateToTimeStringFormatted,
} from "~/utils/helpers";

const EvaluateApplicationSubmission = () => {
  const [comment, setComment] = useState("");

  const router = useRouter();
  const projectId = router.query.projectId as string;
  const applicationSubmissionId = router.query
    .applicationSubmissionId as string;

  const queryClient = api.useContext();

  const {
    data: applicationSubmission,
    isLoading: isLoadingApplicationSubmission,
    isError: isErrorApplicationSubmission,
    error: errorApplicationSubmission,
  } = api.applicationSubmissionRouter.getApplicationSubmissionByIdForEvaluator.useQuery(
    {
      projectId,
      applicationSubmissionId,
    },
    {
      enabled: !!projectId && !!applicationSubmissionId,
    },
  );

  const {
    data: applicationSubmissionEvaluation,
    isLoading: isLoadingEvaluation,
    isError: isErrorEvaluation,
    error: errorEvaluation,
  } = api.applicationSubmissionEvaluationRouter.upsertApplicationSubmissionEvaluation.useQuery(
    {
      projectId,
      applicationSubmissionId,
    },
    {
      enabled: !!projectId,
    },
  );

  const createApplicationSubmissionComment =
    api.applicationSubmissionCommentRouter.createApplicationSubmissionComment.useMutation(
      {
        onSuccess() {
          toast.dismiss();
          toast.success("Created Comment!");
          setComment("");
          queryClient.invalidate();
        },
        onError() {
          toast.dismiss();
          toast.error("Error...");
        },
      },
    );

  const handleCreateApplicationSubmissionComment = () => {
    if (applicationSubmissionEvaluation) {
      toast.dismiss();
      toast.loading("Creating Comment....");

      createApplicationSubmissionComment.mutate({
        projectId,
        applicationSubmissionEvaluationId: applicationSubmissionEvaluation.id,
        comment,
      });
    }
  };

  if (isLoadingApplicationSubmission || isLoadingEvaluation) {
    return <LoadingPage />;
  } else if (isErrorApplicationSubmission || isErrorEvaluation) {
    return (
      <Error
        statusCode={
          errorApplicationSubmission?.data?.httpStatus ||
          errorEvaluation?.data?.httpStatus ||
          500
        }
      />
    );
  } else {
    return (
      <main className="flex w-full flex-col items-center pb-10">
        <Header
          name={"Evaluate Application"}
          subtext={"Jake Rasmussen"}
          editable={false}
        />
        <section className="my-10 flex w-full justify-center">
          <div className="flex flex-row">
            <ApplicationForm
              projectId={projectId as string}
              applicationId={applicationSubmission.applicationId}
              questions={applicationSubmission.application.questions}
              savedAnswers={applicationSubmission.applicationSubmissionAnswers}
              readonly
              name={""}
              description={""}
            />
            <Card className="m-8 h-fit w-[350px] bg-white">
              <CardHeader>
                <CardTitle>Enter Comments</CardTitle>
                <CardDescription>
                  Submit comments for this submission
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                  rows={10}
                />
              </CardContent>
              <CardFooter className="flex w-full justify-center">
                <Button
                  onClickFn={() => handleCreateApplicationSubmissionComment()}
                >
                  Submit Comment
                </Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        <Card className="mx-8 mb-8 w-full max-w-4xl bg-white">
          <CardHeader>
            <CardTitle>Submission Comments</CardTitle>
          </CardHeader>
          <CardContent>
            {applicationSubmissionEvaluation.comments.length > 0 ? (
              <>
                {applicationSubmissionEvaluation.comments.map((comment: ApplicationSubmissionComment, index: number) => (
                  <div key={`${comment.evaluatorName}${comment.comment}${index}`}>
                    <h5 className="mb-2 w-full border-b border-black font-semibold uppercase">
                      {comment.evaluatorName}{" "}
                      <span className="text-primary">@</span>{" "}
                      {dateToStringFormatted(comment.createdAt)},{" "}
                      {dateToTimeStringFormatted(comment.createdAt)}
                    </h5>
                    {comment.comment}
                  </div>
                ))}
              </>
            ) : (
              <>
                <h5 className="mb-2 w-full border-b border-black text-center font-semibold uppercase">
                  No Comments!
                </h5>
              </>
            )}
          </CardContent>
        </Card>
      </main>
    );
  }
};

EvaluateApplicationSubmission.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default EvaluateApplicationSubmission;
