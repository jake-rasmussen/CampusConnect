import "@prisma/client";

import { Toaster } from "react-hot-toast";

import Applications from "./dashboard/applications";
import Contact from "./dashboard/contact";
import Description from "./dashboard/description";
import Events from "./dashboard/events";
import Header from "./dashboard/header";
import Tab from "./tab/tab";
import TabContent from "./tab/tabContent";
import TabHeader from "./tab/tabHeader";
import TabList from "./tab/tabList";

import type {
  ClubApplication,
  ClubContactInfo,
  ClubEvent,
  ClubProfile,
} from "@prisma/client";

type PropType = {
  name: string;
  clubProfile: ClubProfile & { clubContactInfo: ClubContactInfo[] };
  events: ClubEvent[];
  contactInfos: ClubContactInfo[];
  applications: ClubApplication[];
};

const DashboardPage = (props: PropType) => {
  const { name, clubProfile, events, contactInfos, applications } = props;

  return (
    <>
      <Toaster />
      <Header name={name} />

      <main className="relative flex justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
          </TabList>
          <TabContent>
            <Description
              clubId={clubProfile.id}
              clubDescription={clubProfile.description}
              edit={true}
            />
          </TabContent>
          <TabContent>
            <div className="mx-10 grid w-full grid-cols-2 py-6 lg:grid-cols-5">
              <div className="col-span-2 md:col-span-1 lg:col-span-3">
                <Applications applications={applications} />
              </div>
              <div className="col-span-2 md:col-span-1 lg:col-span-2">
                <Contact contactInfos={contactInfos} />
              </div>
            </div>
          </TabContent>
        </Tab>
      </main>

      <Events events={events} />
    </>
  );
};

export default DashboardPage;
