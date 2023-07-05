import { type ClubContactInfo } from "@prisma/client";

import ContactCard from "./contactCard";
import ContactOutline from "./contactOutline";

const Contact = ({ contactInfos }: { contactInfos: ClubContactInfo[] }) => {
  return (
    <>
      <ContactOutline>
        {contactInfos.map((clubContactInfo: ClubContactInfo, index: number) => (
          <ContactCard
            clubContactInfo={clubContactInfo}
            key={`clubContact${index}`}
          />
        ))}
      </ContactOutline>
    </>
  );
};

export default Contact;
