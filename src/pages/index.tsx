import { SignedIn, SignedOut, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@nextui-org/react";
import { UserType } from "@prisma/client";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Briefcase, HomeStats, License } from "tabler-icons-react";

import { BackgroundBeams } from "~/components/aceternity-ui/background-beams";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

const FeatureCard = ({
  header,
  body,
  icon,
}: {
  header: string;
  body: string;
  icon: JSX.Element;
}) => {
  return (
    <div className="flex max-w-xs flex-col items-center justify-center p-4 text-center">
      <div className="text-primary">{icon}</div>
      <h3 className="my-3 text-2xl font-semibold">{header}</h3>
      <p className="text-center text-neutral-500">{body}</p>
    </div>
  );
};

const Home = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <div className="relative mb-40 flex w-full flex-col">
      <div className="custom-clip-path relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
        <div className="absolute inset-0">
          <BackgroundBeams />
        </div>

        <motion.h1
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        >
          <div className="flex flex-col py-4">
            <h4 className="bg-gradient-to-br from-neutral-500 to-slate-800 bg-clip-text text-lg tracking-wide">
              Campus Connect
            </h4>
            <p>
              Connect with students <br /> like never before
            </p>
          </div>

          <div className="my-4 flex w-full justify-center">
            <SignedOut>
              <SignUpButton mode="modal" afterSignUpUrl="/get-started">
                <Button>Get started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {user?.publicMetadata.userType === UserType.INCOMPLETE && (
                <Link href="/get-started" className="inline-flex">
                  <Button>Get started</Button>
                </Link>
              )}
            </SignedIn>
          </div>
        </motion.h1>
      </div>

      {/* Features Section */}
      <section className="m-4 md:m-8">
        <div className="container mx-auto my-6 space-y-2 p-4 text-center">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Help grow your startup
          </h1>
          <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base">
            CampusConnect provides startups with tools to connect with students,
            enhancing the student-led startup ecosystem.
          </p>
        </div>

        <div className="flex w-full flex-wrap items-center justify-center gap-4">
          <FeatureCard
            header="Showcase your startup"
            body="Startup leaders can create a homepage to highlight their mission, vision, and key details, making it easier to attract talent."
            icon={<HomeStats className="h-20 w-20" />}
          />
          <FeatureCard
            header="Application Management"
            body="Startup leaders can create job applications and efficiently manage all submissions in one place."
            icon={<License className="h-20 w-20" />}
          />
          <FeatureCard
            header="Explore Opportunities"
            body="Students seeking work can easily browse startups and job applications, ensuring they never miss an opportunity."
            icon={<Briefcase className="h-20 w-20" />}
          />
        </div>
      </section>
    </div>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <UserLayout className="min-h-screen">{page}</UserLayout>;
};

export default Home;
