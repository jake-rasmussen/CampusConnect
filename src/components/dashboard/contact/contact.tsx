import { type ClubContactInfo } from "@prisma/client";

import ContactEditor from "./contactEditor";
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
          {edit ? <ContactEditor clubProfileId={clubProfileId} /> : <></>}
        </>
      </ContactOutline>
    </>
  );
};

export default Contact;
