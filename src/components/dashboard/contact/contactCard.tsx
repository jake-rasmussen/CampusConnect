import { type ClubContactInfo } from "@prisma/client";

import { Badge } from "../../shadcn_ui/badge";
import ContactUpdateEditor from "./contactCardEditor";

type PropType = {
  clubContactInfo: ClubContactInfo;
  edit: boolean;
};

const ContactCard = (props: PropType) => {
  const { clubContactInfo, edit } = props;

  return (
    <>
      <div className="relative my-6 max-w-sm border-l-2 border-primary px-6 py-2 pr-28">
        <Badge className="mr-4 translate-x-[-0.2rem] bg-secondary text-white shadow-xl md:absolute md:right-0 md:top-[-0.2rem]">
          {clubContactInfo.role}
        </Badge>
        <h1 className="my-2 font-bold underline">
          {clubContactInfo.firstName} {clubContactInfo.lastName}
        </h1>
        <p>{clubContactInfo.email}</p>
        <p>{clubContactInfo.phone}</p>
        {edit ? (
          <ContactUpdateEditor
            firstName={clubContactInfo.firstName}
            lastName={clubContactInfo.lastName}
            email={clubContactInfo.email}
            phone={clubContactInfo.phone ? clubContactInfo.phone : undefined}
            role={clubContactInfo.role}
            contactInfoId={clubContactInfo.id}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default ContactCard;
