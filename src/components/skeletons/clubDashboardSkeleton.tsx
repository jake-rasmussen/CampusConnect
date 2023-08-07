import Tab from "../tab/tab";
import TabContent from "../tab/tabContent";
import TabHeader from "../tab/tabHeader";
import TabList from "../tab/tabList";
import ApplicationsSkeleton from "./applicationsSkeleton";
import ContactSkeleton from "./contactSkeleton";
import DescriptionSkeleton from "./descriptionSkeleton";
import EventSkeleton from "./eventSkeleton";
import HeaderSkeleton from "./headerSkeleton";
import MemberSkeleton from "./memberSkeleton";

const ClubDashBoardSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />

      <main className="relative flex justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
            <TabHeader>Members</TabHeader>
          </TabList>
          <TabContent>
            <div className="mx-10 grid w-full grid-cols-2 py-6 lg:grid-cols-5">
              <div className="col-span-2 lg:col-span-1 lg:pr-10 xl:col-span-3">
                <DescriptionSkeleton />
              </div>
              <div className="col-span-2 py-6 lg:col-span-1 xl:col-span-2">
                <ContactSkeleton />
              </div>
            </div>
          </TabContent>
          <TabContent>
            <ApplicationsSkeleton />
          </TabContent>
          <TabContent>
            <MemberSkeleton />
          </TabContent>
        </Tab>
      </main>

      <EventSkeleton />
    </>
  );
};

export default ClubDashBoardSkeleton;
