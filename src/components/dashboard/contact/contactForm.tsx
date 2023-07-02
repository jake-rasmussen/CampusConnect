import { Field, Form } from "houseform";
import toast from "react-hot-toast";
import { Trash } from "tabler-icons-react";
import { z } from "zod";

import Button from "../../button";
import { Input } from "../../shadcn_ui/input";
import DeleteController from "../deleteController";

type PropType = {
  firstName: string | undefined;
  lastName: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  role: string | undefined;
  handleUpdate: (values: Record<string, any>) => void;
  handleDelete?: () => void;
};

const ContactForm = (props: PropType) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    role,
    handleUpdate,
    handleDelete,
  } = props;

  return (
    <Form
      onSubmit={(values, errors) => {
        if (errors.errors.length > 0) {
          toast.dismiss();
          errors.errors.map((error) => {
            toast.error(error);
          });
        } else {
          handleUpdate(values);
        }
      }}
      submitWhenInvalid
    >
      {({ submit }) => (
        <main className="grid grid-cols-4 gap-4 py-4">
          <Field
            name="firstName"
            initialValue={firstName}
            onChangeValidate={z.string().min(1, "Please enter a first name")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-2">
                <span className="font-semibold">First Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter First Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <Field
            name="lastName"
            initialValue={lastName}
            onChangeValidate={z.string().min(1, "Please enter a last name")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-2">
                <span className="font-semibold">Last Name</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter Last Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <Field
            name="email"
            initialValue={email}
            onChangeValidate={z
              .string()
              .min(1, "Please enter an email")
              .email("Please enter a valid email")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-2">
                <span className="font-semibold">Email</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter an Email"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <Field
            name="phone"
            initialValue={phone ? phone : ""}
            onChangeValidate={z
              .string()
              .min(10, "Please enter a valid phone number")
              .optional()
              .or(z.literal(""))}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-2">
                <span className="font-semibold">Phone Number</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter a Phone Number (optional)"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <Field
            name="role"
            initialValue={role}
            onChangeValidate={z.string().min(1, "Please enter a role")}
          >
            {({ value, setValue, onBlur }) => (
              <div className="col-span-4">
                <span className="font-semibold">Role</span>
                <Input
                  className="h-[3rem]"
                  placeholder="Enter a Role"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                />
              </div>
            )}
          </Field>

          <div className="col-span-1">
            <Button onClick={submit} className="my-4">
              Submit
            </Button>
          </div>

          {handleDelete !== undefined ? (
            <div className="col-span-3 flex justify-end">
              <DeleteController
                dialogDescription="Are you sure you want to delete the Contact Info?"
                handleDelete={handleDelete}
              />
            </div>
          ) : (
            <></>
          )}
        </main>
      )}
    </Form>
  );
};

export default ContactForm;
