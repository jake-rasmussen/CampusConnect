import toast from "react-hot-toast";

import { api } from "~/utils/api";
import EditController from "../editController";
import ContactForm from "./contactForm";

type PropType = {
  clubProfileId: string;
};

const ContactEditor = (props: PropType) => {
  const { clubProfileId } = props;

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

  const handleSubmit = (values: Record<string, any>) => {
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
    >
      <ContactForm
        onSubmit={handleSubmit}
      />
    </EditController>
  );
};

export default ContactEditor;
