import "@prisma/client";

import Applications from "./dashboard/applications/applications";
import ContactSection from "./dashboard/contact/contactSection";
import DescriptionSection from "./dashboard/description/descriptionSection";
import Events from "./dashboard/events/events";
import Header from "./dashboard/header/header";
import Members from "./dashboard/members/members";
import SocialMediaSection from "./dashboard/socialMedia/socialMediaSection";
import Tab from "./tab/tabContainer";
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
      <Header name={name} editable={isAdminPage} />

      <main className="relative flex flex-col justify-center pb-40">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
            {isAdminPage ? <TabHeader>Members</TabHeader> : <></>}
          </TabList>
          <TabContent>
            <div className="mx-10 flex flex-col gap-y-8 items-center justify-center">
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
        {(isAdminPage || events.length > 0) && (
          <Events
            events={events}
            projectId={projectId}
            editable={isAdminPage}
          />
        )}
      </main>
    </>
  );
};

export default DashboardPage;
