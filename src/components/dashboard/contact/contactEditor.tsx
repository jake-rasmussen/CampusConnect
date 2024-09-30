import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";

import { Field, Form } from "houseform";
import { Input } from "@nextui-org/react";
import { z } from "zod";

type ContactFormType = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
};


type PropType = {
  projectId: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  role?: string;
  contactInfoId?: string;
  handleDelete?: () => void;
};

const ContactEditor = (props: PropType) => {
  const { firstName, lastName, email, phone, role, contactInfoId, projectId } =
    props;

  const queryClient = api.useContext();

  const createContactInfo = api.contactInfoRouter.createContactInfo.useMutation(
    {
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Created the Contact Info!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    },
  );

  const updateContactInfo =
    api.contactInfoRouter.updateContactInfoById.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Updated Contact!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const deleteContactInfo =
    api.contactInfoRouter.deleteContactInfoById.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Deleted Contact Info!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const handleSubmit = (values: ContactFormType) => {
    if (contactInfoId) { // then we already have the contact, so we are updating it
      updateContactInfo.mutate({
        id: contactInfoId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
        projectId,
      });
    } else {
      createContactInfo.mutate({
        projectId,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        phone: values.phone,
        role: values.role,
      });
    }
  };

  const handleDelete = () => {
    if (contactInfoId) {
      deleteContactInfo.mutate({
        id: contactInfoId,
        projectId,
      });
    }
  };

  return (
    <Form<ContactFormType>
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ submit }) => (
        <EditController
          dialogDescription={`${contactInfoId ? "Update" : "Create"} Contact Info`}
          createDescription="Create New Contact"
          editType={`${contactInfoId ? "update" : "create"}`}
          handleSubmit={async () => {
            return await submit().then((isValid) => {
              if (isValid) {
                toast.dismiss();
                toast.loading("Saving Contact...");
              }
              return isValid;
            }).catch((e) => {
              console.log(e);
              return false;
            });
          }}
          handleDelete={contactInfoId ? handleDelete : undefined}
        >
          <main className="grid grid-cols-4 gap-4">
            <Field
              name="firstName"
              initialValue={firstName}
              onBlurValidate={z
                .string()
                .min(1, "Enter a first name")
                .max(15, "Enter a shorter first name")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  className="col-span-2"
                  label="First Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="lastName"
              initialValue={lastName}
              onBlurValidate={z
                .string()
                .min(1, "Enter a last name")
                .max(15, "Enter a shorter last name")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  className="col-span-2"
                  label="Last Name"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="email"
              initialValue={email}
              onBlurValidate={z
                .string()
                .min(1, "Enter an email")
                .max(25, "Enter a shorter email")
                .email("Enter a valid email")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  className="col-span-2"
                  label="Email"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                  isRequired
                />
              )}
            </Field>

            <Field
              name="phone"
              initialValue={phone ? phone : ""}
              onBlurValidate={z
                .string()
                .min(10, "Enter a valid phone number")
                .max(15, "Enter a valid phone number")
                .optional()
                .or(z.literal(""))}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  className="col-span-2"
                  label="Phone Number"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                />
              )}
            </Field>

            <Field
              name="role"
              initialValue={role}
              onBlurValidate={z
                .string()
                .min(1, "Enter a role")
                .max(20, "Please enter shorter role title")}
            >
              {({ value, setValue, onBlur, isValid, errors }) => (
                <Input
                  className="col-span-4"
                  label="Role"
                  value={value}
                  onChange={(e) => setValue(e.currentTarget.value)}
                  onBlur={onBlur}
                  isInvalid={!isValid}
                  errorMessage={errors[0]}
                />
              )}
            </Field>
          </main>
        </EditController>
      )}
    </Form >
  );
};

export default ContactEditor;
