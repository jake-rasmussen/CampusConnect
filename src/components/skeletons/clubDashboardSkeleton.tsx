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
import SocialMediaSkeleton from "./socialMediaSkeleton";

type PropType = {
  isAdminPage: boolean;
};

const ClubDashBoardSkeleton = (props: PropType) => {
  const { isAdminPage } = props;

  return (
    <>
      <HeaderSkeleton />

      <main className="relative flex justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
            {isAdminPage ? <TabHeader>Members</TabHeader> : <></>}
          </TabList>
          <TabContent>
            <div className="mx-10 flex flex-col items-center justify-center gap-10">
              <DescriptionSkeleton />
              <ContactSkeleton />
              <SocialMediaSkeleton />
            </div>
          </TabContent>
          <TabContent>
            <ApplicationsSkeleton />
          </TabContent>
          {isAdminPage ? (
            <TabContent>
              <MemberSkeleton />
            </TabContent>
          ) : (
            <></>
          )}
        </Tab>
      </main>

      <EventSkeleton />
    </>
  );
};

export default ClubDashBoardSkeleton;
