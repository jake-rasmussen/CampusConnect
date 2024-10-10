import "@prisma/client";

import { twMerge } from "tailwind-merge";

import Applications from "./applications/applications";
import ContactSection from "./contact/contactSection";
import DescriptionSection from "./description/descriptionSection";
import Events from "./events/events";
import Header from "./header/header";
import Members from "./members/members";
import SocialMediaSection from "./socialMedia/socialMediaSection";
import Tab from "../tab/tab";
import TabContent from "../tab/tabContent";
import TabHeader from "../tab/tabHeader";
import TabList from "../tab/tabList";

import type {
  Application,
  ApplicationQuestion,
  ContactInfo,
  Event,
  Member,
  SocialMedia,
  User,
  Colors
} from "@prisma/client";
import AdminSettings from "../adminSettings";
import { createContext } from "react";
import { ProjectContext } from "lib/context";

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
  colors: Colors;
  isAdminPage: boolean;
};

const ProjectDashboard = (props: PropType) => {
  const {
    name,
    projectId,
    description,
    events,
    contactInfos,
    applications,
    socialMedias,
    members,
    colors,
    isAdminPage,
  } = props;

  return (
    <>
      <ProjectContext.Provider value={{ colors }}>
        <section
          className={twMerge(
            isAdminPage
              ? "fixed top-0 z-40 flex h-screen w-screen items-center justify-center bg-white md:hidden"
              : "hidden",
          )}
        >
          <span className="mx-8 text-center text-lg font-semibold uppercase">
            Admin Mode Disabled on Mobile
          </span>
        </section>

        <Header name={name} editable={isAdminPage} colors={colors} />

        <main className="relative flex flex-col justify-center pb-40">
          <Tab project={{ colors }}>
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
                {(isAdminPage || events.length > 0) && (
                  <Events
                    events={events}
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

            <>
              {isAdminPage && (
                // <DeleteProjectEditor projectId={projectId} projectName={name} />
                <AdminSettings projectId={projectId} />
              )}
            </>
          </Tab>
        </main>
      </ProjectContext.Provider >
    </>
  );
};

export default ProjectDashboard;
