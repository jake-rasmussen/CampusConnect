import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { Field, Form } from "houseform";
import { CalendarIcon } from "lucide-react";
import React, { useState } from "react";
import { z } from "zod";

import Button from "~/components/button";
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
} from "~/components/shadcn_ui/popover";
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
};

export type ConfirmationFormType = {
  date: Date;
  time: Date;
};

const ApplicationPublishConfirmationDialog = ({
  name,
  description,
  confirmPublishApplication,
  isApplicationFormValid,
  setErrorDialogOpen,
}: PropTypes) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [calendarPopoverOpen, setCalendarPopoverOpen] = useState(false);

  const DEFAULT_TIME = new Date(new Date().setHours(0, 0, 0, 0));

  return (
    <>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <button
          className="w-3xl max-w-xs rounded-xl bg-white/10 px-4 py-4 backdrop-invert transition duration-300 ease-in-out hover:scale-110"
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
            <DialogDescription className="text-md py-4 text-red-500">
              Please note, publishing an application will make it available to
              all users and cannot be undone. Editing will be
              disabled once published. Before you publish, make sure you have
              completed all the necessary changes and try previewing your
              application.
            </DialogDescription>
          </DialogHeader>
          <DialogPrimitive.Close className="focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none">
            <Cross2Icon className="h-8 w-8" />
            <span className="sr-only">Close</span>
          </DialogPrimitive.Close>
          <div>
            <Form<ConfirmationFormType>
              onSubmit={(values) => {
                confirmPublishApplication(name, description, values);
              }}
            >
              {({ submit }) => (
                <main className="flex flex-col items-center gap-4">
                  <section className="mx-10 flex w-[50rem] flex-col gap-4 max-w-md">
                    <Field
                      name="date"
                      initialValue={new Date()}
                      onBlurValidate={z.date({
                        required_error: "Enter a date",
                        invalid_type_error: "Enter a date",
                      })}
                    >
                      {({ value, setValue, onBlur, isValid, errors }) => (
                        <>
                          <span className="font-semibold">Date</span>
                          <Popover
                            open={calendarPopoverOpen}
                            onOpenChange={setCalendarPopoverOpen}
                          >
                            <PopoverTrigger asChild>
                              <ShadCNButton
                                onClick={() => {
                                  console.log(calendarPopoverOpen);
                                }}
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
                                    setCalendarPopoverOpen(false);
                                  }
                                }}
                                onDayBlur={onBlur}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          {!isValid && <ErrorMessage message={errors[0]} />}
                        </>
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
                        <div className="col-span-2 flex flex-col">
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
                  <Button
                    onClick={() => {
                      submit().catch((e) => console.error(e));
                    }}
                    className="my-4"
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
