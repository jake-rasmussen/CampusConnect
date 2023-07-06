import "@prisma/client";

import { Toaster } from "react-hot-toast";

import Error from "next/error";
import { api } from "~/utils/api";
import Applications from "./dashboard/applications/applications";
import Events from "./dashboard/clubEvents/events";
import Contact from "./dashboard/contact/contact";
import Description from "./dashboard/description/description";
import Header from "./dashboard/header/header";
import ClubDashBoardSkeleton from "./skeletons/clubDashboardSkeleton";
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
  clubId: string;
  clubProfile: ClubProfile & { clubContactInfo: ClubContactInfo[] };
  events: ClubEvent[];
  contactInfos: ClubContactInfo[];
  applications: ClubApplication[];
};

const DashboardPage = (props: PropType) => {
  const { name, clubId, clubProfile, events, contactInfos, applications } =
    props;

  const {
    data: isAdmin,
    isLoading,
    isError,
    error,
  } = api.userRouter.isUserAdmin.useQuery();

  if (isLoading) {
    return <ClubDashBoardSkeleton />;
  } else if (isError) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <>
        <Toaster />
        <Header name={name} edit={isAdmin} />

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
                    clubId={clubProfile.id}
                    clubDescription={clubProfile.description}
                    edit={isAdmin}
                  />
                </div>
                <div className="col-span-2 py-6 lg:col-span-1 xl:col-span-2">
                  <Contact
                    contactInfos={contactInfos}
                    clubProfileId={clubProfile.id}
                    edit={isAdmin}
                  />
                </div>
              </div>
            </TabContent>
            <TabContent>
              <Applications
                applications={applications}
                clubId={clubId}
                edit={isAdmin}
              />
            </TabContent>
          </Tab>
        </main>

        <Events events={events} clubId={clubId} edit={isAdmin} />
      </>
    );
  }
};

export default DashboardPage;
