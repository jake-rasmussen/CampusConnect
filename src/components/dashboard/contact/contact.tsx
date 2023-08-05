import ContactCard from "./contactCard";
import ContactOutline from "./contactOutline";
import ContactsEditor from "./contactsEditor";

import type { ClubContactInfo } from "@prisma/client";

type PropType = {
  contactInfos: ClubContactInfo[];
  clubId: string;
  editable: boolean;
};

const Contact = (props: PropType) => {
  const { contactInfos, clubId, editable: edit } = props;

  return (
    <section className="flex flex-col items-center">
      <ContactOutline>
        <>
          {contactInfos.map(
            (clubContactInfo: ClubContactInfo, index: number) => (
              <ContactCard
                clubContactInfo={clubContactInfo}
                edit={edit}
                key={`clubContact${index}`}
              />
            ),
          )}
        </>
      </ContactOutline>
      {edit && <ContactsEditor clubId={clubId} />}
    </section>
  );
};

export default Contact;
