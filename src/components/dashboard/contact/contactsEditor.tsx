import { useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import ContactForm from "./contactForm";

import type { ContactFormType } from "./contactForm";

type PropType = {
  clubProfileId: string;
};

const ContactsEditor = (props: PropType) => {
  const { clubProfileId } = props;

  const [openDialog, setOpenDialog] = useState(false);

  const queryClient = api.useContext();

  const createContactInfo =
    api.clubContactInfoRouter.createClubContactInfo.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Created the Club Contact Info!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const handleSubmit = (values: ContactFormType) => {
    createContactInfo.mutate({
      clubProfileId,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
    });
  };

  return (
    <EditController
      dialogDescription={"Create Contact Info"}
      editType={"create"}
      openDialog={openDialog}
      setOpenDialog={setOpenDialog}
    >
      <ContactForm onSubmit={handleSubmit} />
    </EditController>
  );
};

export default ContactsEditor;
