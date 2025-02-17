import "@prisma/client";

import { Tooltip } from "@heroui/react";
import { ProjectContext } from "lib/context";
import { EyeOff } from "tabler-icons-react";
import { twMerge } from "tailwind-merge";

import AdminSettings from "../admin/adminSettings";
import Tab from "../tab/tab";
import TabContent from "../tab/tabContent";
import TabHeader from "../tab/tabHeader";
import TabList from "../tab/tabList";
import Applications from "./applications/applications";
import ContactSection from "./contact/contactSection";
import DescriptionSection from "./description/descriptionSection";
import Events from "./events/events";
import Header from "./header/header";
import Members from "./members/members";
import SocialMediaSection from "./socialMedia/socialMediaSection";

import type {
  Application,
  ApplicationQuestion,
  Colors,
  ContactInfo,
  Event,
  Member,
  SocialMedia,
  User,
} from "@prisma/client";

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
  isVisible: boolean;
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
    isVisible,
    isAdminPage,
  } = props;

  return (
    <>
      <ProjectContext.Provider value={{ colors, isVisible }}>
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

            <>
              {!isVisible && (
                <Tooltip content="Project is invisible" placement="right">
                  <div className="absolute left-0 top-0 m-4">
                    <EyeOff className="h-16 w-16 rounded-full p-1" />
                  </div>
                </Tooltip>
              )}
            </>
          </Tab>
        </main>
      </ProjectContext.Provider>
    </>
  );
};

export default ProjectDashboard;
