import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Field, Form } from "houseform";
import { CalendarIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { z } from "zod";

import Button from "~/components/button";
import SkillsCreator from "~/components/dashboard/applications/skillsCreator";
import ErrorMessage from "~/components/dashboard/errorMessage";
import { Button as ShadCNButton } from "~/components/shadcn_ui/button";
import { Calendar } from "~/components/shadcn_ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/shadcn_ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/shadcn_ui/popoverDialog";
import TimePicker from "~/components/timePicker";
import { cn } from "../../../../lib/utils";

type PropTypes = {
  name: string;
  description: string;
  confirmPublishApplication: (
    name: string,
    description: string,
    values: ConfirmationFormType,
  ) => void;
  isApplicationFormValid: (name: string, description: string) => boolean;
  setErrorDialogOpen: React.Dispatch<boolean>;
  isSaving: boolean;
  setIsSaving: React.Dispatch<boolean>;
};

export type ConfirmationFormType = {
  date: Date;
  time: Date;
  skills: string[];
};

const ApplicationPublishConfirmationDialog = ({
  name,
  description,
  confirmPublishApplication,
  isApplicationFormValid,
  setErrorDialogOpen,
  isSaving,
  setIsSaving,
}: PropTypes) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const [skills, setSkills] = useState<string[]>([]);

  const DEFAULT_TIME = new Date(new Date().setHours(23, 59, 0, 0));

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <button
          className="w-3xl max-w-xs rounded-xl bg-white/10 px-4 py-4 backdrop-invert transition duration-300 ease-in-out hover:scale-110 disabled:opacity-50"
          onClick={() => {
            if (!isApplicationFormValid(name, description)) {
              setErrorDialogOpen(true);
            } else {
              setDialogOpen(true);
            }
          }}
        >
          <h1 className="tracking-none font-black uppercase text-white">
            Publish
          </h1>
        </button>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Publish this Application?</DialogTitle>
            <DialogDescription className="text-md mx-10 py-4">
              Please note, publishing an application will make it available to
              all users and cannot be undone. Editing will be disabled once
              published. Before you publish, make sure you have completed all
              the necessary changes and try previewing your application.
            </DialogDescription>
          </DialogHeader>
          <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <Cross2Icon className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <div>
            <Form<ConfirmationFormType>
              onSubmit={(values) => {
                values.skills = skills;
                confirmPublishApplication(name, description, values);
              }}
            >
              {({ submit }) => (
                <main className="flex flex-col items-center gap-8">
                  <section className="flex w-fit flex-row items-center justify-center gap-4">
                    <Field
                      name="date"
                      initialValue={new Date()}
                      onBlurValidate={z.date({
                        required_error: "Enter a date",
                        invalid_type_error: "Enter a date",
                      })}
                    >
                      {({ value, setValue, onBlur, isValid, errors }) => (
                        <div className="flex flex-col">
                          <span className="font-semibold">Date</span>
                          <Popover>
                            <PopoverTrigger asChild>
                              <ShadCNButton
                                variant={"outline"}
                                className={cn(
                                  "h-[3rem] rounded-xl bg-white text-left font-normal",
                                  !value && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {value ? (
                                  format(value, "PPP")
                                ) : (
                                  <span className="text-gray">Pick a date</span>
                                )}
                              </ShadCNButton>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto bg-white p-0">
                              <Calendar
                                mode="single"
                                selected={value}
                                disabled={[
                                  {
                                    before: new Date(),
                                  },
                                ]}
                                onSelect={(date) => {
                                  if (date !== undefined) {
                                    setValue(date);
                                  }
                                }}
                                onDayBlur={onBlur}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {!isValid && <ErrorMessage message={errors[0]} />}
                        </div>
                      )}
                    </Field>
                    <Field
                      name={"time"}
                      initialValue={DEFAULT_TIME}
                      onBlurValidate={z.date({
                        required_error: "Enter a time",
                        invalid_type_error: "Invalid time",
                      })}
                    >
                      {({ value, setValue, onBlur, isValid, errors }) => (
                        <div className="flex flex-col">
                          <span className="font-semibold">Time</span>
                          <TimePicker
                            value={value}
                            setValue={setValue}
                            onBlur={onBlur}
                          />
                          {!isValid && <ErrorMessage message={errors[0]} />}
                        </div>
                      )}
                    </Field>
                  </section>

                  <SkillsCreator skills={skills} setSkills={setSkills} />

                  <Button
                    onClickFn={() => {
                      setIsSaving(true);
                      submit().catch((e) => {
                        console.error(e);
                        setIsSaving(false);
                    });
                    }}
                    className="my-4"
                    disabled={isSaving}
                  >
                    Publish
                  </Button>
                </main>
              )}
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ApplicationPublishConfirmationDialog;
