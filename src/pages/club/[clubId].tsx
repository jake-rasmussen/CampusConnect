import { type ClubApplication, type ClubContactInfo, type ClubEvent } from "@prisma/client";
import { useRouter } from "next/router";
import React from "react";

import ApplicationCard from "~/components/applicationCard";
import ContactCard from "~/components/contactCard";
import EventCard from "~/components/eventCard";
import Tab from "~/components/Tab/tab";
import TabContent from "~/components/Tab/tabContent";
import TabHeader from "~/components/Tab/tabHeader";
import TabList from "~/components/Tab/tabList";
import { api } from "~/utils/api";

const ClubDashboard = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;

  const {
    data: club,
    isLoading: isLoadingClub,
    isError: isErrorClub,
  } = api.clubRouter.getClubById.useQuery(
    {
      clubId,
    },
    { enabled: !!clubId },
  );

  if (isLoadingClub || isErrorClub) {
    return <>Loading...</>;
  }

  return (
    <>
      <header className="relative bg-gradient-to-r from-secondary to-primary shadow-2xl">
        <div className="mx-auto px-4 py-20 md:px-24 lg:px-8 lg:py-28">
          <div className="relative text-center">
            <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
              {club.name}
            </h2>
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
              <p className="p-4 px-8 text-center">{club.clubProfile?.description}</p>
            </div>
          </TabContent>
          <TabContent>
            <div className="mx-10 grid w-full grid-cols-5 py-6">
              <div className="col-span-5 flex w-full flex-col items-center md:col-span-3">
                <h1 className="text-2xl font-semibold underline">
                  Open Applications
                </h1>
                <div className="flex flex-wrap justify-center">
                  {club.clubApplications.map(
                    (clubApplication: ClubApplication, index: number) => (
                      <ApplicationCard
                        clubApplication={clubApplication}
                        key={`clubApplication${index}`}
                      />
                    ),
                  )}
                </div>
              </div>

              <div className="justify-left col-span-5 flex flex-col pt-20 md:col-span-2 md:pt-0">
                <h1 className="text-center text-2xl font-semibold underline md:text-left">
                  Contact
                </h1>
                <div className="mx-auto md:mx-0">
                  {club.clubProfile?.clubContactInfo.map(
                    (clubContactInfo: ClubContactInfo, index: number) => (
                      <ContactCard clubContactInfo={clubContactInfo} key={`clubContact${index}`} />
                    ),
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
          {club.events.map((clubEvent: ClubEvent, index: number) => {
            return (
              <EventCard clubEvent={clubEvent} key={`clubEvent${index}`} />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default ClubDashboard;
