import { type ClubContactInfo } from "@prisma/client";

import { Badge } from "./ui/badge";

type PropType = {
  clubContactInfo: ClubContactInfo;
};

const ContactCard = (props: PropType) => {
  const { clubContactInfo } = props;

  return (
    <>
      <div className="relative my-6 max-w-sm border-l-2 border-primary px-6 py-2">
        <Badge className="translate-x-[-0.2rem] bg-secondary text-white shadow-xl md:absolute md:right-0 md:top-[-0.2rem]">
          {clubContactInfo.role}
        </Badge>
        <h1 className="my-2 font-bold underline">
          {clubContactInfo.firstName} {clubContactInfo.lastName}
        </h1>
        <p>{clubContactInfo.email}</p>
        <p>{clubContactInfo.phone}</p>
      </div>
    </>
  );
};

export default ContactCard;
