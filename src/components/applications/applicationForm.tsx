import {
  ClubApplicationAnswerChoice,
  ClubApplicationQuestion,
  ClubApplicationQuestionType,
} from "@prisma/client";
import { useEffect, useState } from "react";

import Button from "~/components/button";
import { DATE_TIME_FORMAT_OPTS } from "~/constants";
import { api } from "~/utils/api";
import Checklist from "../checklist";
import FileUpload from "../fileUpload";
import LoadingPage from "../loadingPage";
import MultipleChoice from "../multipleChoice";
import { Input } from "../shadcn_ui/input";
import { Textarea } from "../shadcn_ui/textarea";

// TODO: add id field to fetch user answers

type PropType = {
  name: string | null;
  description: string | null;
  questions:
    | (ClubApplicationQuestion & {
        clubApplicationAnswers: ClubApplicationAnswerChoice[];
      })[]
    | null;
  applicationId: string | null;
};

type ApplicationFormParms = {
  name: string;
  description: string;
  questions: (ClubApplicationQuestion & {
    clubApplicationAnswers: ClubApplicationAnswerChoice[];
  })[];
  deadline: Date | null;
};

const ApplicationForm = (props: PropType) => {
  const [applicationFormState, setApplicationFormState] =
    useState<ApplicationFormParms>({
      name: props.name || "",
      description: props.description || "",
      questions: props.questions || [],
      deadline: null,
    });

  console.log(applicationFormState);
  const { applicationId } = props;
  const { data, isLoading } =
    api.clubApplicationRouter.getClubApplicationById.useQuery(
      {
        applicationId: applicationId || "",
      },
      { enabled: !!applicationId },
    );

  useEffect(() => {
    if (applicationId && data) {
      setApplicationFormState({
        name: data?.name || "",
        description: data?.description || "",
        questions: data?.questions || [],
        deadline: data?.deadline || null,
      });
    }
  }, [data, applicationId]);

  if (applicationId && isLoading) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <h1 className="text-center text-3xl font-black text-black">
          {applicationFormState.name}
        </h1>
        <h2 className="text-center text-lg font-bold text-black">
          Deadline:
          {applicationFormState.deadline
            ? `${applicationFormState.deadline?.toLocaleDateString(
                undefined,
                DATE_TIME_FORMAT_OPTS,
              )}`
            : " TDB"}
        </h2>
        <p className="text-center text-black">
          {applicationFormState.description}
        </p>

        <div className="border-1 flex flex-col gap-y-8 rounded-2xl border border-black bg-gradient-to-r from-primary to-secondary p-10">
          {applicationFormState.questions.map(
            (
              question: ClubApplicationQuestion & {
                clubApplicationAnswers: ClubApplicationAnswerChoice[];
              },
              index: number,
            ) => (
              <div
                key={`applicationQuestion${index}${question.question}`}
                className=""
              >
                <div className="flex flex-row items-start">
                  {question.required && (
                    <h1 className="mx-1 my-0.5 font-black text-red-600">*</h1>
                  )}
                  <h2 className="max-w-2xl capitalize text-white">
                    {question.question}
                  </h2>
                </div>

                {question.type === ClubApplicationQuestionType.TEXT_INPUT && (
                  <Input />
                )}
                {question.type === ClubApplicationQuestionType.TEXT_FIELD && (
                  <Textarea
                    className="h-[3rem] rounded-xl bg-white p-4"
                    rows={4}
                  />
                )}
                {question.type ===
                  ClubApplicationQuestionType.MULTIPLE_CHOICE && (
                  <MultipleChoice
                    answerChoices={question.clubApplicationAnswers}
                  />
                )}
                {question.type === ClubApplicationQuestionType.FILE_UPLOAD && (
                  <FileUpload />
                )}
                {question.type ===
                  ClubApplicationQuestionType.MULTIPLE_SELECT && (
                  <Checklist answerChoices={question.clubApplicationAnswers} />
                )}
              </div>
            ),
          )}
        </div>
        <div className="flex grow flex-row justify-end gap-4">
          <Button>Save</Button>
          <button className="max-w-xs rounded-xl bg-white/10 px-4 py-4 backdrop-invert transition duration-300 ease-in-out hover:scale-110">
            <h1 className="tracking-none font-black uppercase text-white">
              Submit
            </h1>
          </button>
        </div>
      </>
    );
  }
};

export default ApplicationForm;
