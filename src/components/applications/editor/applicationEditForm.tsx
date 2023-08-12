import { ClubApplicationAnswerChoice } from "@prisma/client";
import { Field, Form } from "houseform";
import { useEffect, useState } from "react";
import { z } from "zod";

import ErrorDialog from "~/components/errorDialog";
import { Textarea } from "~/components/shadcn_ui/textarea";
import Button from "../../button";
import ErrorMessage from "../../dashboard/errorMessage";
import { Input } from "../../shadcn_ui/input";
import QuestionsEditor from "./questionsEditor";

import type { ClubApplicationQuestion } from "@prisma/client";

type ApplicationFormType = {
  name: string;
  description: string;
};

type PropType = {
  name?: string;
  description?: string;
  questions: (ClubApplicationQuestion & {
    clubApplicationAnswers: ClubApplicationAnswerChoice[];
  })[];
  onSubmit: (
    name: string,
    description: string,
    questions: (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[],
    questionsToDelete: ClubApplicationQuestion[],
    answersToDelete: ClubApplicationAnswerChoice[],
  ) => void;
};

const ApplicationEditForm = (props: PropType) => {
  const { name, description, questions, onSubmit } = props;

  const [questionsState, setQuestionsState] = useState<
    (ClubApplicationQuestion & {
      clubApplicationAnswers: ClubApplicationAnswerChoice[];
    })[]
  >([]);
  const [questionsToDelete, setQuestionsToDelete] = useState<
    ClubApplicationQuestion[]
  >([]);
  const [answerChoicesToDelete, setAnswerChoicesToDelete] = useState<
    ClubApplicationAnswerChoice[]
  >([]);

  const [openErrorDialog, setOpenErrorDialog] = useState(false);

  useEffect(() => {
    setQuestionsState(
      Array.from(questions, (question, index: number) => {
        return {
          id: question.id,
          required: question.required,
          orderNumber: index,
          question: question.question,
          type: question.type,
          clubApplicationAnswers: question.clubApplicationAnswers,
          clubApplicationId: "",
          createdAt: question.createdAt,
          updatedAt: question.updatedAt,
        };
      }),
    );
  }, []);

  useEffect(() => {
    setQuestionsToDelete([]);
    setAnswerChoicesToDelete([]);
  }, [questions]);

  const isQuestionsFormValid = () => {
    for (let question of questionsState) {
      if (
        question.question === "" ||
        question.type === undefined ||
        question.required === undefined
      ) {
        return false;
      }
    }
    return true;
  };

  return (
    <Form<ApplicationFormType>
      onSubmit={(values) => {
        onSubmit(
          values.name,
          values.description,
          questionsState as (ClubApplicationQuestion & {
            clubApplicationAnswers: ClubApplicationAnswerChoice[];
          })[],
          questionsToDelete as (ClubApplicationQuestion & {
            clubApplicationAnswers: ClubApplicationAnswerChoice[];
          })[],
          answerChoicesToDelete as ClubApplicationAnswerChoice[],
        );
      }}
    >
      {({ submit }) => (
        <main className="flex flex-col items-center gap-4 py-4">
          <section className="mx-10 flex w-[50rem] flex-col gap-4">
            <Field
              name="name"
              initialValue={name}
              onBlurValidate={z.string().min(1, "Enter an application name")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <>
                  <span className="text-xl font-semibold">
                    Application Name
                  </span>
                  <Input
                    className="h-[4rem]"
                    placeholder="Enter Application Name"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onBlur={onBlur}
                  />
                  {!isValid && <ErrorMessage message={errors[0]} />}
                </>
              )}
            </Field>

            <Field
              name="description"
              initialValue={description}
              onBlurValidate={z
                .string()
                .min(1, "Enter an application description")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <>
                  <span className="text-xl font-semibold">
                    Application Description
                  </span>
                  <Textarea
                    className="h-[3rem] rounded-xl bg-white p-4"
                    placeholder={"Enter an application description"}
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    onBlur={onBlur}
                    rows={4}
                  />
                  {!isValid && <ErrorMessage message={errors[0]} />}
                </>
              )}
            </Field>
          </section>

          <section className="flex flex-col items-center gap-4 py-8">
            <span className="text-center text-4xl font-semibold ">
              Questions
            </span>
            <QuestionsEditor
              questionsState={questionsState}
              setQuestionsState={setQuestionsState}
              setQuestionsStateToDelete={setQuestionsToDelete}
              setAnswerChoicesToDelete={setAnswerChoicesToDelete}
            />
          </section>

          <div className="flex flex-row justify-end">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  if (isQuestionsFormValid()) {
                    submit().catch((e) => console.log(e));
                  } else {
                    setOpenErrorDialog(true);
                  }
                }}
                className="my-4"
              >
                Submit
              </Button>
            </div>
          </div>

          <ErrorDialog
            dialogDescription={
              "Please make sure that all question fields are filled out!"
            }
            openDialog={openErrorDialog}
            setOpenDialog={setOpenErrorDialog}
          />
        </main>
      )}
    </Form>
  );
};

export default ApplicationEditForm;
