import toast from "react-hot-toast";
import { api } from "~/utils/api";
import EditController from "../editController";
import ContactForm from "./contactForm";

type PropType = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: string;
  contactInfoId: string;
};

const ContactCardEditor = (props: PropType) => {
  const { firstName, lastName, email, phone, role, contactInfoId } = props;

  const queryClient = api.useContext();

  const updateContactInfo =
    api.clubContactInfoRouter.updateClubContactInfoById.useMutation({
      onSuccess() {
        toast.dismiss();
        toast.success("Successfully Updated Contact Info!");
        queryClient.invalidate().catch((e) => console.log(e));
      },
      onError() {
        toast.dismiss();
        toast.error("Error...");
      },
    });

  const deleteContactInfo =
    api.clubContactInfoRouter.deleteClubContactInfoById.useMutation({
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

  const handleUpdate = (values: Record<string, any>) => {
    updateContactInfo.mutate({
      id: contactInfoId,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      phone: values.phone,
      role: values.role,
    });
  };

  const handleDelete = () => {
    deleteContactInfo.mutate({
      id: contactInfoId,
    });
  };

  return (
    <EditController
      dialogDescription={"Update the Contact Info"}
      editType="update"
    >
      <ContactForm
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        role={role}
        onSubmit={handleUpdate}
        handleDelete={handleDelete}
      />
    </EditController>
  );
};

export default ContactCardEditor;
