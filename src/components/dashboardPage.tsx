import "@prisma/client";

import Applications from "./dashboard/applications/applications";
import ContactSection from "./dashboard/contact/contactSection";
import DescriptionSection from "./dashboard/description/descriptionSection";
import Header from "./dashboard/header/header";
import Members from "./dashboard/members/members";
import SocialMediaSection from "./dashboard/socialMedia/socialMediaSection";
import Tab from "./tab/tab";
import TabContent from "./tab/tabContent";
import TabHeader from "./tab/tabHeader";
import TabList from "./tab/tabList";

import type {
  Application,
  ApplicationQuestion,
  ContactInfo,
  Event,
  Member,
  SocialMedia,
  User,
} from "@prisma/client";
import { twMerge } from "tailwind-merge";
import { isAdmin } from "~/server/api/trpc";

type PropType = {
  name: string;
  projectId: string;
  description: string;
  events: Event[];
  contactInfos: ContactInfo[];
  applications: (Application & {
    questions: ApplicationQuestion[];
  })[];
  socialMedias: SocialMedia[];
  members: (Member & {
    user: User;
  })[];
  isAdminPage: boolean;
};

const DashboardPage = (props: PropType) => {
  const {
    name,
    projectId,
    description,
    events,
    contactInfos,
    applications,
    socialMedias,
    members,
    isAdminPage,
  } = props;

  return (
    <>
      <section className={twMerge(isAdminPage ? "fixed h-screen w-screen bg-white top-0 z-40 flex items-center justify-center md:hidden" : "hidden")}>
        <span className="font-semibold text-lg uppercase mx-8">
          Admin Mode Disabled on Mobile
        </span>
      </section>

      <Header name={name} editable={isAdminPage} />

      <main className="relative flex flex-col justify-center pb-40">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
            {isAdminPage ? <TabHeader>Members</TabHeader> : <></>}
          </TabList>
          <TabContent>
            <div className="mx-10 flex flex-col items-center justify-center gap-y-8">
              <DescriptionSection
                projectId={projectId}
                projectDescription={description}
                editable={isAdminPage}
              />
              {(isAdminPage || contactInfos.length > 0) && (
                <ContactSection
                  contactInfos={contactInfos}
                  projectId={projectId}
                  editable={isAdminPage}
                />
              )}
              {(isAdminPage || socialMedias.length > 0) && (
                <SocialMediaSection
                  socialMedias={socialMedias}
                  projectId={projectId}
                  editable={isAdminPage}
                />
              )}
            </div>
          </TabContent>
          <TabContent>
            <Applications
              applications={applications}
              projectId={projectId}
              editable={isAdminPage}
            />
          </TabContent>
          {isAdminPage ? (
            <TabContent>
              <Members
                projectId={projectId}
                members={members}
                editable={isAdminPage}
              />
            </TabContent>
          ) : (
            <></>
          )}
        </Tab>
      </main>
    </>
  );
};

export default DashboardPage;
