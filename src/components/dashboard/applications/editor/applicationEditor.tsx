import { type ClubApplicationQuestion } from "@prisma/client";
import { Field, Form } from "houseform";
import toast from "react-hot-toast";
import { z } from "zod";

import { Textarea } from "~/components/shadcn_ui/textarea";
import Button from "../../../button";
import { Input } from "../../../shadcn_ui/input";
import ErrorMessage from "../../errorMessage";
import QuestionsEditor, { ClubApplicationQuestionForForm } from "./questionsEditor";
import { api } from "~/utils/api";
import { useState } from "react";

type ApplicationFormType = {
  name: string;
  description: string;
  questions: ClubApplicationQuestion[];
};

type PropType = {
  name?: string;
  description?: string;
  questions: ClubApplicationQuestion[];
  applicationId: string;
  onSubmit: (values: ApplicationFormType) => void;
  // handleDelete?: () => void;
};

const ApplicationEditor = (props: PropType) => {
  const { name, description, questions, applicationId: clubApplicationId, onSubmit } = props;

  const [questionsForm, setQuestionsForm] = useState<
    ClubApplicationQuestionForForm[]
  >(
    Array.from(
      questions,
      (question: ClubApplicationQuestion, index: number) => {
        return {
          id: question.id,
          required: question.required,
          orderNumber: index, // TODO: make sure questions come in ascending order
          question: question.question,
          type: question.type,
          clubApplicationId: "",
        } as ClubApplicationQuestion;
      },
    ),
  );

  const queryClient = api.useContext();

  const deleteAllApplicaitonQuestions = api.clubApplicationQuestionRouter.deleteAllClubApplicationQuestionsByClubApplicationId.useMutation({});
  const createApplicationQuestion = api.clubApplicationQuestionRouter.createClubApplicationQuestion.useMutation({});
  const updateApplication = api.clubApplicationRouter.updateClubApplication.useMutation({});

  const handleSubmitQuestions = () => {
    deleteAllApplicaitonQuestions.mutate({
      clubApplicationId
    });

    questionsForm.forEach((question: ClubApplicationQuestionForForm, index: number) => {
      const questionAsClubApplicationQuestion = question as ClubApplicationQuestion;
      
      createApplicationQuestion.mutate({
        clubApplicationId,
        required: questionAsClubApplicationQuestion.required,
        orderNumber: index,
        question: questionAsClubApplicationQuestion.question,
        type: questionAsClubApplicationQuestion.type,
      })
    })
  }

  return (
    <Form<ApplicationFormType>
      onSubmit={(values) => {
        updateApplication.mutate({
          clubApplicationId,
          name: values.name,
          description: values.description,
        });
        handleSubmitQuestions();
        
        toast.dismiss();
        toast.success("Success submitting the form!");
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
            <QuestionsEditor questionsForm={questionsForm} setQuestionsForm={setQuestionsForm} />
          </section>

          <div className="flex flex-row justify-end">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  submit().catch((e) => console.log(e));
                }}
                className="my-4"
              >
                Submit
              </Button>
            </div>
          </div>
        </main>
      )}
    </Form>
  );
};

export default ApplicationEditor;
