import "@prisma/client";

import { Toaster } from "react-hot-toast";

import Applications from "./dashboard/applications/applications";
import Events from "./dashboard/clubEvents/events";
import Contact from "./dashboard/contact/contact";
import Description from "./dashboard/description/description";
import Header from "./dashboard/header/header";
import Members from "./dashboard/members/members";
import SocialMedia from "./dashboard/socialMedia/socialMedia";
import Tab from "./tab/tab";
import TabContent from "./tab/tabContent";
import TabHeader from "./tab/tabHeader";
import TabList from "./tab/tabList";

import type {
  ClubApplication,
  ClubContactInfo,
  ClubEvent,
  ClubMember,
  ClubSocialMedia,
  User,
} from "@prisma/client";

type PropType = {
  name: string;
  clubId: string;
  description: string;
  events: ClubEvent[];
  contactInfos: ClubContactInfo[];
  applications: ClubApplication[];
  socialMedias: ClubSocialMedia[];
  members: (ClubMember & {
    user: User;
  })[];
  isAdminPage: boolean;
};

const DashboardPage = (props: PropType) => {
  const {
    name,
    clubId,
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
      <Toaster />
      <Header name={name} editable={isAdminPage} />

      <main className="relative flex flex-col justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
            {isAdminPage ? <TabHeader>Members</TabHeader> : <></>}
          </TabList>
          <TabContent>
            <div className="mx-10 flex flex-col items-center justify-center gap-10">
              <Description
                clubId={clubId}
                clubDescription={description}
                editable={isAdminPage}
              />
              <Contact
                contactInfos={contactInfos}
                clubId={clubId}
                editable={isAdminPage}
              />
              <SocialMedia
                socialMedias={socialMedias}
                clubId={clubId}
                editable={isAdminPage}
              />
            </div>
          </TabContent>
          <TabContent>
            <Applications
              applications={applications}
              clubId={clubId}
              editable={isAdminPage}
            />
          </TabContent>
          {isAdminPage ? (
            <TabContent>
              <Members
                clubId={clubId}
                members={members}
                editable={isAdminPage}
              />
            </TabContent>
          ) : (
            <></>
          )}
        </Tab>
        <Events events={events} clubId={clubId} editable={isAdminPage} />
      </main>
    </>
  );
};

export default DashboardPage;
