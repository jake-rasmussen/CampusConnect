import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import ContactForm from "./contactForm";

import type { ContactFormType } from "./contactForm";

type PropType = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  contactInfoId: string;
  projectId: string;
};

const ContactCardEditor = (props: PropType) => {
  const { firstName, lastName, email, phone, role, contactInfoId, projectId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

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
        setOpenDialog(false);
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const handleUpdate = (values: ContactFormType) => {
    updateContactInfo.mutate({
      id: contactInfoId,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
      projectId
    });
  };

  const handleDelete = () => {
    deleteContactInfo.mutate({
      id: contactInfoId,
      projectId
    });
  };

  return (
    <EditController
      dialogDescription={"Update the Contact Info"}
      editType="update"
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
      className="rounded-xl"
    >
      <ContactForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        role={role}
        setOpenDialog={setOpenDialog}
        onSubmit={handleUpdate}
        handleDelete={handleDelete}
      />
    </EditController>
  );
};

export default ContactCardEditor;
