import { type ClubContactInfo } from "@prisma/client";

import ContactAddEditor from "./contactAddEditor";
import ContactCard from "./contactCard";
import ContactOutline from "./contactOutline";

type PropType = {
  contactInfos: ClubContactInfo[];
  clubProfileId: string;
  edit: boolean;
};

const Contact = (props: PropType) => {
  const { contactInfos, clubProfileId, edit } = props;

  return (
    <>
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
          {edit ? <ContactAddEditor clubProfileId={clubProfileId} /> : <></>}
        </>
      </ContactOutline>
    </>
  );
};

export default Contact;
