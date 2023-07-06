import "@prisma/client";

import { Toaster } from "react-hot-toast";

import Applications from "./dashboard/applications/applications";
import Events from "./dashboard/clubEvents/events";
import Contact from "./dashboard/contact/contact";
import Description from "./dashboard/description/description";
import Header from "./dashboard/header/header";
import Tab from "./tab/tab";
import TabContent from "./tab/tabContent";
import TabHeader from "./tab/tabHeader";
import TabList from "./tab/tabList";

import type {
  ClubApplication,
  ClubContactInfo,
  ClubEvent,
} from "@prisma/client";

type PropType = {
  name: string;
  clubId: string;
  description: string;
  events: ClubEvent[];
  contactInfos: ClubContactInfo[];
  applications: ClubApplication[];
};

const DashboardPage = (props: PropType) => {
  const { name, clubId, description, events, contactInfos, applications } =
    props;

  return (
    <>
      <Toaster />
      <Header name={name} edit={true} />

      <main className="relative flex justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
          </TabList>
          <TabContent>
            <div className="mx-10 grid w-full grid-cols-2 py-6 xl:grid-cols-5">
              <div className="col-span-2 lg:col-span-1 lg:pr-10 xl:col-span-3">
                <Description
                  clubId={clubId}
                  clubDescription={description}
                  edit={true}
                />
              </div>
              <div className="col-span-2 py-6 lg:col-span-1 xl:col-span-2">
                <Contact
                  contactInfos={contactInfos}
                  clubId={clubId}
                  edit={true}
                />
              </div>
            </div>
          </TabContent>
          <TabContent>
            <Applications
              applications={applications}
              clubId={clubId}
              edit={true}
            />
          </TabContent>
        </Tab>
      </main>

      <Events events={events} clubId={clubId} edit={true} />
    </>
  );
};

export default DashboardPage;
