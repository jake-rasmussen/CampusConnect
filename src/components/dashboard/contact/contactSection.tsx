import ContactCard from "./contactCard";
import ContactOutline from "./contactOutline";
import ContactsEditor from "./contactsEditor";

import type { ContactInfo } from "@prisma/client";

type PropType = {
  contactInfos: ContactInfo[];
  projectId: string;
  editable: boolean;
};

const ContactSection = (props: PropType) => {
  const { contactInfos, projectId, editable } = props;

  return (
    <section className="flex flex-col items-center">
      <ContactOutline>
        <>
          {contactInfos.map((contactInfo: ContactInfo, index: number) => (
            <ContactCard
              contactInfo={contactInfo}
              editable={editable}
              key={`contact${index}`}
            />
          ))}
        </>
      </ContactOutline>
      {editable && <ContactsEditor projectId={projectId} />}
    </section>
  );
};

export default ContactSection;
