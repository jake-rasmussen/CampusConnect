import Tab from "../Tab/tab";
import TabContent from "../Tab/tabContent";
import TabHeader from "../Tab/tabHeader";
import TabList from "../Tab/tabList";
import ApplicationsSkeleton from "./applicationsSkeleton";
import ContactSkeleton from "./contactSkeleton";
import DescriptionSkeleton from "./descriptionSkeleton";
import EventSkeleton from "./eventSkeleton";
import HeaderSkeleton from "./headerSkeleton";

const ClubDashBoardSkeleton = () => {
  return (
    <>
      <HeaderSkeleton />

      <main className="relative flex justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
          </TabList>
          <TabContent>
            <DescriptionSkeleton />
          </TabContent>
          <TabContent>
            <div className="mx-10 grid w-full grid-cols-2 py-6 lg:grid-cols-5">
              <ApplicationsSkeleton />
              <ContactSkeleton />
            </div>
          </TabContent>
        </Tab>
      </main>

      <EventSkeleton />
    </>
  );
};

export default ClubDashBoardSkeleton;
