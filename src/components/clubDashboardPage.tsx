import {
  Club,
  ClubApplication,
  ClubContactInfo,
  ClubEvent,
  ClubProfile,
} from "@prisma/client";

import ApplicationCard from "./applicationCard";
import ContactCard from "./contactCard";
import EventCard from "./eventCard";
import ApplicationSkeleton from "./skeletons/applicationSkeleton";
import ContactSkeleton from "./skeletons/contactSkeleton";
import DescriptionSkeleton from "./skeletons/descriptionSkeleton";
import TitleSkeleton from "./skeletons/titleSkeleton";
import Tab from "./tab/tab";
import TabContent from "./tab/tabContent";
import TabHeader from "./tab/tabHeader";
import TabList from "./tab/tabList";
import { Skeleton } from "./ui/skeleton";
import ClubEventSkeleton from "./skeletons/clubEventSkeleton";

type PropType = {
  club:
    | (Club & {
        events: ClubEvent[];
        clubProfile:
          | (ClubProfile & {
              clubContactInfo: ClubContactInfo[];
            })
          | null;
        clubApplications: ClubApplication[];
      })
    | undefined;
  isLoading: boolean;
};

const ClubDashboardPage = (props: PropType) => {
  const { club, isLoading } = props;

  return (
    <>
      <header className="relative bg-gradient-to-r from-secondary to-primary shadow-2xl">
        <div className="mx-auto px-4 py-20 md:px-24 lg:px-8 lg:py-28">
          <div className="relative flex items-center justify-center text-center">
            {club !== undefined ? (
              <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
                {club.name}
              </h2>
            ) : (
              <TitleSkeleton />
            )}
          </div>
        </div>
      </header>

      <main className="relative flex justify-center">
        <Tab>
          <TabList>
            <TabHeader>About Us</TabHeader>
            <TabHeader>Applications</TabHeader>
          </TabList>
          <TabContent>
            <div className="max-w-6xl py-6 text-center md:px-6 md:py-0">
              {club !== undefined ? (
                <p className="flex flex-col justify-center space-y-2 p-4 px-8 text-center">
                  {club?.clubProfile?.description}
                </p>
              ) : (
                <DescriptionSkeleton />
              )}
            </div>
          </TabContent>
          <TabContent>
            <div className="mx-10 grid w-full grid-cols-2 py-6 lg:grid-cols-5">
              <div className="col-span-2 flex w-full flex-col items-center md:col-span-1 lg:col-span-3">
                <h1 className="text-2xl font-semibold underline">
                  Open Applications
                </h1>
                <div className="flex flex-wrap justify-center">
                  {club !== undefined ? (
                    club.clubApplications.map(
                      (clubApplication: ClubApplication, index: number) => (
                        <ApplicationCard
                          clubApplication={clubApplication}
                          key={`clubApplication${index}`}
                        />
                      ),
                    )
                  ) : (
                    <ApplicationSkeleton />
                  )}
                </div>
              </div>

              <div className="justify-left col-span-2 flex flex-col pt-20 md:col-span-1 md:pt-0 lg:col-span-2">
                <h1 className="text-center text-2xl font-semibold underline md:text-left">
                  Contact
                </h1>
                <div className="mx-auto md:mx-0">
                  {club !== undefined ? (
                    club.clubProfile?.clubContactInfo.map(
                      (clubContactInfo: ClubContactInfo, index: number) => (
                        <ContactCard
                          clubContactInfo={clubContactInfo}
                          key={`clubContact${index}`}
                        />
                      ),
                    )
                  ) : (
                    <ContactSkeleton />
                  )}
                </div>
              </div>
            </div>
          </TabContent>
        </Tab>
      </main>

      <section className="pb-40">
        <h1 className="w-full pb-10 text-center text-4xl font-black uppercase">
          Events
        </h1>
        <div className="mx-14 flex flex-col items-center justify-center lg:mx-20">
          {club !== undefined ? (
            club.events.map((clubEvent: ClubEvent, index: number) => {
              return (
                <EventCard clubEvent={clubEvent} key={`clubEvent${index}`} />
              );
            })
          ) : (
            <ClubEventSkeleton />
          )}
        </div>
      </section>
    </>
  );
};

export default ClubDashboardPage;
