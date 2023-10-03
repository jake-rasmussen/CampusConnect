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
      onSubmit={(values) => {
        onSubmit(values);
        setOpenDialog(false);
        toast.dismiss();
        toast.success("Success submitting the form!");
      }}
    >
      {({ submit }) => (
        <main className="grid grid-cols-4 gap-4 py-4">
          <Field
            name="firstName"
            initialValue={firstName}
            onBlurValidate={z.string().min(1, "Enter a first name")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">First Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter First Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="lastName"
            initialValue={lastName}
            onBlurValidate={z.string().min(1, "Enter a last name")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">Last Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter Last Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="email"
            initialValue={email}
            onBlurValidate={z.string().min(1, "Enter an email").email("email")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">Email</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter an Email"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && (
                  <>
                    {errors[0] !== "email" ? (
                      <ErrorMessage message={errors[0]} />
                    ) : (
                      <ErrorMessage message="Invalid" />
                    )}
                  </>
                )}
              </div>
            )}
          </Field>

          <Field
            name="phone"
            initialValue={phone ? phone : ""}
            onBlurValidate={z
              .string()
              .min(10, "Enter a valid phone number")
              .optional()
              .or(z.literal(""))}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-2">
                <span className="font-semibold">Phone Number</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter a Phone Number (optional)"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
              </div>
            )}
          </Field>

          <Field
            name="role"
            initialValue={role}
            onBlurValidate={z.string().min(1, "Enter a role")}
          >
            {({ value, setValue, onBlur, isValid, errors }) => (
              <div className="col-span-4">
                <span className="font-semibold">Role</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter a Role"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
                {!isValid && <ErrorMessage message={errors[0]} />}
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
