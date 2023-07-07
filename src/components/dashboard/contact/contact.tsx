import { type ClubContactInfo } from "@prisma/client";

import ContactCard from "./contactCard";
import ContactOutline from "./contactOutline";
import ContactsEditor from "./contactsEditor";

type PropType = {
  contactInfos: ClubContactInfo[];
  clubProfileId: string;
  edit: boolean;
};

const Contact = (props: PropType) => {
  const { contactInfos, clubProfileId, edit } = props;

  return (
    <section className="flex flex-col items-center">
      <ContactOutline>
        <>
          {contactInfos.length == 0 ? (
            <h1 className="tracking-none text-sm font-black uppercase text-red-600">
              There are no contacts listed
            </h1>
          ) : (
            contactInfos.map(
              (clubContactInfo: ClubContactInfo, index: number) => (
                <ContactCard
                  clubContactInfo={clubContactInfo}
                  edit={edit}
                  key={`clubContact${index}`}
                />
              ),
            )
          )}
        </>
      </ContactOutline>
      {edit && <ContactsEditor clubProfileId={clubProfileId} />}
    </section>
  );
};

export default Contact;
