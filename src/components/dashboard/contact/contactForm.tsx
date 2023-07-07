import { Field, Form } from "houseform";
import toast from "react-hot-toast";
import { z } from "zod";

import Button from "../../button";
import { Input } from "../../shadcn_ui/input";
import DeleteController from "../deleteController";
import ErrorMessage from "../errorMessage";

export type ContactFormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};

type PropType = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  setOpenDialog: React.Dispatch<boolean>;
  onSubmit: (values: ContactFormType) => void;
  handleDelete?: () => void;
};

const ContactForm = (props: PropType) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    setOpenDialog,
    onSubmit,
    handleDelete,
  } = props;

  return (
    <Form<ContactFormType>
      onSubmit={(values, isValid) => {
        if (isValid) {
          onSubmit(values);
          setOpenDialog(false);
          toast.dismiss();
          toast.success("Success submitting the form!");
        } else {
          toast.dismiss();
          toast.error("There are errors with the form");
        }
      }}
      submitWhenInvalid
    >
      {({ submit }) => (
        <main className="grid grid-cols-4 gap-4 py-4">
          <Field
            name="firstName"
            initialValue={firstName}
            onChangeValidate={z.string().min(1)}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">First Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter First Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="lastName"
            initialValue={lastName}
            onChangeValidate={z.string().min(1, "Please enter a last name")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">Last Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter Last Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="email"
            initialValue={email}
            onChangeValidate={z.string().min(1).email("email")}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">Email</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter an Email"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && (
                  <>
                    {errors[0] !== "email" ? (
                      <ErrorMessage />
                    ) : (
                      <ErrorMessage alternateMessage="Invalid" />
                    )}
                  </>
                )}
              </div>
            )}
          </Field>

          <Field
            name="phone"
            initialValue={phone ? phone : ""}
            onChangeValidate={z.string().min(10).optional().or(z.literal(""))}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">Phone Number</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter a Phone Number (optional)"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <Field
            name="role"
            initialValue={role}
            onChangeValidate={z.string().min(1)}
          >
            {({ value, setValue, onBlur, errors }) => (
              <div className="col-span-4">
                <span className="font-semibold">Role</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter a Role"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {errors.length !== 0 && <ErrorMessage />}
              </div>
            )}
          </Field>

          <div className="col-span-4 flex flex-row justify-end">
            {handleDelete && (
              <div className="mx-8 flex w-auto grow justify-end">
                <DeleteController
                  dialogDescription="Are you sure you want to delete the Contact Info?"
                  handleDelete={handleDelete}
                />
              </div>
            )}

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

export default ContactForm;
