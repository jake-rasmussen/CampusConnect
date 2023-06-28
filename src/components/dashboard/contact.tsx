import { type ClubContactInfo } from "@prisma/client";

import ContactCard from "./contactCard";

const Contact = ({ contactInfos }: { contactInfos: ClubContactInfo[] }) => {
  return (
    <>
      <div className="justify-left flex flex-col pt-20 md:pt-0">
        <h1 className="text-center text-2xl font-semibold underline md:text-left">
          Contact
        </h1>
        <div className="mx-auto md:mx-0">
          {contactInfos.map(
            (clubContactInfo: ClubContactInfo, index: number) => (
              <ContactCard
                clubContactInfo={clubContactInfo}
                key={`clubContact${index}`}
              />
            ),
          )}
        </div>
      </div>
    </>
  );
};

export default Contact;
