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
  } = props;

  return (
    <>
      <Toaster />
      <Header name={name} editable={true} />

      <main className="relative flex flex-col justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
            <TabHeader>Members</TabHeader>
          </TabList>
          <TabContent>
            <div className="mx-10 flex flex-col gap-10 justify-center items-center">
              <Description
                clubId={clubId}
                clubDescription={description}
                editable={true}
              />
              <Contact
                contactInfos={contactInfos}
                clubId={clubId}
                editable={true}
              />
              <SocialMedia
                socialMedias={socialMedias}
                clubId={clubId}
                edit={true}
              />
            </div>
          </TabContent>
          <TabContent>
            <Applications
              applications={applications}
              clubId={clubId}
              editable={true}
            />
          </TabContent>
          <TabContent>
            <Members clubId={clubId} members={members} />
          </TabContent>
        </Tab>
        <Events events={events} clubId={clubId} editable={true} />
      </main>
    </>
  );
};

export default DashboardPage;
