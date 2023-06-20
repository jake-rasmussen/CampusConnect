import { useRouter } from "next/router";
import React, { useState } from "react";
import { ArrowRight } from "tabler-icons-react";

import ApplicationCard from "~/components/applicationCard";
import EventCard from "~/components/eventCard";
import Tab from "~/components/tab";
import { Badge } from "~/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/utils/api";

const ClubDashboard = () => {
  const router = useRouter();
  const clubId = router.query.clubId as string;
  const [tabIndex, setTabIndex] = useState(0);

  const {
    data: club,
    isLoading,
    isError,
  } = api.clubRouter.getClubById.useQuery({
    clubId,
  });

  if (isLoading || isError) {
    return <>Loading...</>;
  }

  return (
    <>
      <header className="relative bg-[#212A3E] shadow-2xl">
        <div className="mx-auto px-4 py-20 md:px-24 lg:px-8 lg:py-28">
          <div className="relative text-center">
            <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
              {club.name}
            </h2>
          </div>
        </div>
      </header>

      <main className="relative flex justify-center">
        <div className="py-8">
          <Tab
            headers={["About Us", "Applications"]}
            tabIndex={tabIndex}
            setTabIndex={setTabIndex}
          />
        </div>
      </main>

      <section className="flex justify-center">
        {tabIndex === 0 ? (
          <div className="max-w-6xl py-6 text-center md:px-6 md:py-0">
            <p className="p-4 text-center">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Molestias asperiores eveniet quas est laboriosam. Harum veniam
              nostrum magnam temporibus cum libero exercitationem quisquam
              distinctio quaerat praesentium, expedita cupiditate, inventore
              alias? Lorem ipsum dolor sit amet consectetur adipisicing elit. Et
              ex voluptates repudiandae quae eum architecto necessitatibus.
              Earum mollitia, pariatur voluptas in dolores cumque ea labore
              veniam blanditiis commodi explicabo neque. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Odit, illo quia obcaecati
              harum, porro, esse tenetur culpa aperiam doloribus sunt temporibus
              alias distinctio aliquam vel? Deserunt quae labore recusandae
              obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit. Molestias asperiores eveniet quas est laboriosam. Harum
              veniam nostrum magnam temporibus cum libero exercitationem
              quisquam distinctio quaerat praesentium, expedita cupiditate,
              inventore alias? Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Et ex voluptates repudiandae quae eum architecto
              necessitatibus. Earum mollitia, pariatur voluptas in dolores
              cumque ea labore veniam blanditiis commodi explicabo neque. Lorem
              ipsum dolor sit amet, consectetur adipisicing elit. Odit, illo
              quia obcaecati harum, porro, esse tenetur culpa aperiam doloribus
              sunt temporibus alias distinctio aliquam vel? Deserunt quae labore
              recusandae obcaecati.
            </p>
          </div>
        ) : (
          <div className="mx-10 grid w-full grid-cols-5 py-6">
            <div className="col-span-3 flex flex-col items-center justify-center">
              <h1 className="text-2xl font-semibold underline">
                Open Applications
              </h1>
              <div className="grid grid-cols-2">
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
                <ApplicationCard />
              </div>
            </div>
            <div className="justify-left col-span-2 flex flex flex-col">
              <h1 className="text-2xl font-semibold underline">Contact</h1>
              <div className="relative my-6 max-w-sm border-l-2 border-[#394867] px-6 py-2">
                <h1 className="font-bold">Jake Rasmussen</h1>
                <p>www.jakerasmussen.dev</p>
                <p>(610) 316-7252</p>
                <Badge className="absolute right-0 top-0">Technical Lead</Badge>
              </div>
              <div className="relative my-6 max-w-sm border-l-2 border-[#394867] px-6 py-2">
                <h1 className="font-bold">Daniel Drozdov</h1>
                <p>www.crowded.com</p>
                <p>(610) 222-1234</p>
                <Badge className="absolute right-0 top-0">Waterboy</Badge>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="pb-40">
        <h1 className="w-full py-16 text-center text-4xl font-black uppercase">
          Events
        </h1>
        <div className="flex flex-col items-center justify-center">
          <EventCard />
          <EventCard />
        </div>
      </section>
    </>
  );
};

export default ClubDashboard;
