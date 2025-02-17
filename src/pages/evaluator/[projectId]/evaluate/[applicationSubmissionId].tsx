import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import {
  ApplicationSubmissionComment,
  ApplicationSubmissionEvaluationGrade,
  Member,
  User,
} from "@prisma/client";
import { capitalize } from "lodash";
import Error from "next/error";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";
import { Check, ClockEdit, QuestionMark, Trash, X } from "tabler-icons-react";

import ApplicationForm from "~/components/applications/applicationForm";
import LoadingPage from "~/components/loadingPage";
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

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
    error: errorUser,
  } = api.usersRouter.getUser.useQuery();

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

  const deleteApplicationSubmissionComment =
    api.applicationSubmissionCommentRouter.deleteApplicationSubmissionComment.useMutation(
      {
        onSuccess() {
          toast.dismiss();
          toast.success("Deleted Comment!");
          setComment("");
          queryClient.invalidate();
        },
        onError() {
          toast.dismiss();
          toast.error("Error...");
        },
      },
    );

  const updateApplicationSubmissionEvaluation =
    api.applicationSubmissionEvaluationRouter.updateApplicationSubmissionEvaluation.useMutation(
      {
        onSuccess() {
          toast.dismiss();
          toast.success("Updated Evaluation!");
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

  const gradeOptions = Object.values(ApplicationSubmissionEvaluationGrade).map(
    (grade) => ({
      label: grade,
    }),
  );

  if (isLoadingApplicationSubmission || isLoadingEvaluation || isLoadingUser) {
    return <LoadingPage />;
  } else if (isErrorApplicationSubmission || isErrorEvaluation || isErrorUser) {
    return (
      <Error
        statusCode={
          errorApplicationSubmission?.data?.httpStatus ||
          errorEvaluation?.data?.httpStatus ||
          errorUser?.data?.httpStatus ||
          500
        }
      />
    );
  } else {
    return (
      <main className="flex w-full flex-col items-center pb-10">
        <section className="fixed top-0 z-40 flex h-screen w-screen items-center justify-center bg-white md:hidden">
          <span className="mx-8 text-center text-lg font-semibold uppercase">
            Evaluator Mode Disabled on Mobile
          </span>
        </section>

        <section className="mt-40">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Evaluate Application
          </h1>
          <p className="text-center text-xl">
            {applicationSubmission.user.firstName +
              " " +
              applicationSubmission.user.lastName}
          </p>
        </section>

        <section className="my-10 flex w-full justify-center">
          <div className="mx-20 flex flex-col gap-8 xl:flex-row">
            <div className="min-w-[50vw]">
              <ApplicationForm
                projectId={projectId as string}
                applicationId={applicationSubmission.applicationId}
                applicantId={applicationSubmission.userId}
                questions={applicationSubmission.application.questions}
                savedAnswers={
                  applicationSubmission.applicationSubmissionAnswers
                }
                readonly
                name={""}
                description={""}
              />
            </div>

            <Card className="h-full min-w-[400px] bg-white">
              <CardHeader className="flex flex-col items-start justify-start py-4 font-bold">
                <h1 className="font-black">Enter Comments</h1>
                <h4 className="font-normal">
                  Submit comments for this submission
                </h4>
              </CardHeader>
              <CardBody>
                <Textarea
                  value={comment}
                  label="Comment"
                  onChange={(e) => setComment(e.currentTarget.value)}
                  minRows={10}
                  className="px-4"
                />
              </CardBody>
              <CardFooter className="flex w-full justify-center">
                <Button
                  onPress={() => handleCreateApplicationSubmissionComment()}
                  color="primary"
                >
                  Submit
                </Button>
              </CardFooter>
              <Divider />
              <CardHeader className="flex flex-col items-start justify-start py-4 font-bold">
                <h1 className="font-black">Enter Grade</h1>
                <h4 className="font-normal">
                  Submit next steps for this submission
                </h4>
              </CardHeader>
              <CardBody>
                <Select
                  items={gradeOptions}
                  className="p-4 pb-8 pt-0"
                  placeholder="Select option"
                  size="lg"
                  defaultSelectedKeys={[
                    applicationSubmissionEvaluation.evaluation,
                  ]}
                  onChange={(e) => {
                    toast.dismiss();
                    toast.loading("Updating Evaluation...");
                    updateApplicationSubmissionEvaluation.mutate({
                      projectId,
                      applicationSubmissionEvaluationId:
                        applicationSubmissionEvaluation.id,
                      evaluation: e.target
                        .value as ApplicationSubmissionEvaluationGrade,
                    });
                  }}
                  renderValue={(gradeOptions) => {
                    return gradeOptions.map((item) => (
                      <div
                        className="flex items-center gap-2"
                        key={`selected${item.data?.label}`}
                      >
                        <div className="flex flex-row items-center">
                          <div className="mr-2 rounded-full bg-primary p-1 text-white">
                            {item.data?.label ===
                              ApplicationSubmissionEvaluationGrade.YES ? (
                              <Check />
                            ) : item.data?.label ===
                              ApplicationSubmissionEvaluationGrade.MAYBE ? (
                              <QuestionMark />
                            ) : item.data?.label ===
                              ApplicationSubmissionEvaluationGrade.NO ? (
                              <X />
                            ) : (
                              <ClockEdit />
                            )}
                          </div>
                          <span className="text-small">
                            {capitalize(item.data?.label)}
                          </span>
                        </div>
                      </div>
                    ));
                  }}
                >
                  {(item) => (
                    <SelectItem
                      key={item.label}
                      textValue={capitalize(item.label)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="flex flex-row items-center">
                          <div className="mr-2 rounded-full bg-primary p-1 text-white">
                            {item.label ===
                              ApplicationSubmissionEvaluationGrade.YES ? (
                              <Check />
                            ) : item.label ===
                              ApplicationSubmissionEvaluationGrade.MAYBE ? (
                              <QuestionMark />
                            ) : item.label ===
                              ApplicationSubmissionEvaluationGrade.NO ? (
                              <X />
                            ) : (
                              <ClockEdit />
                            )}
                          </div>
                          <span className="text-small">
                            {capitalize(item.label)}
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              </CardBody>
            </Card>
          </div>
        </section>

        <Card className="mx-8 mb-8 w-full max-w-4xl bg-white">
          <CardHeader>Submission Comments</CardHeader>
          <CardBody>
            {applicationSubmissionEvaluation.comments.length > 0 ? (
              <section className="flex flex-col gap-4">
                {applicationSubmissionEvaluation.comments.map(
                  (
                    comment: ApplicationSubmissionComment & {
                      evaluator: Member & {
                        user: User;
                      };
                    },
                    index: number,
                  ) => (
                    <div
                      className="flex flex-row"
                      key={`${comment.evaluator.userId}${comment.comment}${index}`}
                    >
                      <div className="w-full">
                        <h5 className="mb-2 w-full font-semibold uppercase">
                          {comment.evaluator.user.firstName}{" "}
                          {comment.evaluator.user.lastName}
                          <span className="text-primary">@</span>{" "}
                          {dateToStringFormatted(comment.createdAt)},{" "}
                          {dateToTimeStringFormatted(comment.createdAt)}
                        </h5>
                        <pre className="overflow-x-auto whitespace-pre-wrap font-sans">
                          {comment.comment}
                        </pre>
                      </div>
                      <div className="flex h-full w-full items-center justify-end">
                        {comment.memberUserId === user.userId && (
                          <button
                            onClick={() => {
                              toast.dismiss();
                              toast.loading("Deleting Comment...");
                              deleteApplicationSubmissionComment.mutate({
                                projectId,
                                applicationSubmissionEvaluationId:
                                  applicationSubmissionEvaluation.id,
                              });
                            }}
                          >
                            <Trash className="text-primary" />
                          </button>
                        )}
                      </div>
                    </div>
                  ),
                )}
              </section>
            ) : (
              <>
                <h5 className="mb-2 w-full py-8 text-center font-semibold uppercase">
                  No Comments!
                </h5>
              </>
            )}
          </CardBody>
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
