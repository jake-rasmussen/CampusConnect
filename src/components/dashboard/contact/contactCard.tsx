import { Chip } from "@heroui/react";
import { ContactInfo } from "@prisma/client";
import { ProjectContext } from "lib/context";
import { useContext } from "react";

import ContactEditor from "./contactEditor";

type PropType = {
  contactInfo: ContactInfo;
  editable: boolean;
  projectId: string;
};

const ContactCard = (props: PropType) => {
  const { contactInfo, editable, projectId } = props;

  const { colors } = useContext(ProjectContext);

  return (
    <>
      <div className="relative my-6 h-[10rem] w-[20rem] overscroll-none rounded-xl bg-white shadow-xl">
        <div className="flex h-full flex-row items-center pl-1 pr-4">
          <div>
            <div
              className="rounded-t-full border-b-[4.5rem] border-r-[2.5rem] border-solid border-r-transparent"
              style={{ borderBottomColor: colors.secondaryColor }}
            />
            <div
              className="scale-y-[-1] rounded-t-full border-b-[4.5rem] border-r-[2.5rem] border-solid border-r-transparent"
              style={{ borderBottomColor: colors.secondaryColor }}
            />
          </div>
          <div className="ml-4 overflow-x-scroll">
            <div className="mb-2 flex flex-col gap-0">
              <h1 className="text-lg font-bold">
                {contactInfo.firstName} {contactInfo.lastName}
              </h1>
              {contactInfo.role}
            </div>

            <p className="text-sm text-gray">{contactInfo.email}</p>
            <p className="text-sm text-gray">{contactInfo.phone}</p>
          </div>
        </div>

        {editable && (
          <ContactEditor
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
