import { ContactInfo } from "@prisma/client";

import { Badge } from "../../shadcn_ui/badge";
import ContactCardEditor from "./contactCardEditor";

type PropType = {
  contactInfo: ContactInfo;
  editable: boolean;
  projectId: string;
};

const ContactCard = (props: PropType) => {
  const { contactInfo, editable, projectId } = props;

  return (
    <>
      <div className="relative my-6 h-[10rem] w-[20rem] overscroll-none rounded-xl border border-solid bg-white shadow-xl">
        <Badge className="absolute right-0 ml-4 h-[2rem] translate-x-[-1rem] translate-y-[-0.75rem] bg-secondary text-white shadow-xl">
          {contactInfo.role}
        </Badge>
        <div className="flex h-full flex-row items-center pl-1 pr-4">
          <div>
            <div className="rounded-t-full border-b-[4.5rem] border-r-[2.5rem] border-solid border-b-secondary border-r-transparent" />
            <div className="scale-y-[-1] rounded-t-full border-b-[4.5rem] border-r-[2.5rem] border-solid border-b-secondary border-r-transparent" />
          </div>
          <div className="ml-4 overflow-x-scroll">
            <h1 className="mb-2 text-lg font-bold underline">
              {contactInfo.firstName} {contactInfo.lastName}
            </h1>
            <p className="text-sm text-gray">{contactInfo.email}</p>
            <p className="text-sm text-gray">{contactInfo.phone}</p>
          </div>
        </div>

        {editable && (
          <ContactCardEditor
            firstName={contactInfo.firstName}
            lastName={contactInfo.lastName}
            email={contactInfo.email}
            phone={contactInfo.phone ? contactInfo.phone : undefined}
            role={contactInfo.role}
            contactInfoId={contactInfo.id}
            projectId={projectId}
          />
        )}
      </div>
    </>
  );
};

export default ContactCard;
