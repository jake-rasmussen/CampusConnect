import { SignedIn, SignedOut, SignUpButton, useUser } from "@clerk/nextjs";
import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { UserType } from "@prisma/client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";

import { BackgroundBeams } from "~/components/aceternity-ui/background-beams";
import { HeroParallax } from "~/components/aceternity-ui/hero-parallax";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

export const products = [
  {
    title: "Moonbeam",
    link: "https://gomoonbeam.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/moonbeam.png",
  },
  {
    title: "Cursor",
    link: "https://cursor.so",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cursor.png",
  },
  {
    title: "Rogue",
    link: "https://userogue.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/rogue.png",
  },

  {
    title: "Editorially",
    link: "https://editorially.org",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editorially.png",
  },
  {
    title: "Editrix AI",
    link: "https://editrix.ai",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/editrix.png",
  },
  {
    title: "Pixel Perfect",
    link: "https://app.pixelperfect.quest",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/pixelperfect.png",
  },

  {
    title: "Algochurn",
    link: "https://algochurn.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/algochurn.png",
  },
  {
    title: "Aceternity UI",
    link: "https://ui.aceternity.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/aceternityui.png",
  },
  {
    title: "Tailwind Master Kit",
    link: "https://tailwindmasterkit.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/tailwindmasterkit.png",
  },
  {
    title: "SmartBridge",
    link: "https://smartbridgetech.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/smartbridge.png",
  },
  {
    title: "Renderwork Studio",
    link: "https://renderwork.studio",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/renderwork.png",
  },

  {
    title: "Creme Digital",
    link: "https://cremedigital.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/cremedigital.png",
  },
  {
    title: "Golden Bells Academy",
    link: "https://goldenbellsacademy.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/goldenbellsacademy.png",
  },
  {
    title: "Invoker Labs",
    link: "https://invoker.lol",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/invoker.png",
  },
  {
    title: "E Free Invoice",
    link: "https://efreeinvoice.com",
    thumbnail:
      "https://aceternity.com/images/products/thumbnails/new/efreeinvoice.png",
  },
];

const Home = () => {
  const { user, isLoaded } = useUser();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  if (!isLoaded) {
    return <LoadingPage />;
  }

  return (
    <div className="relative flex w-full flex-col bg-black">
      {/* Beta Mode Modal (Only for Signed-Out Users) */}
      <SignedOut>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
          <ModalContent>
            <ModalHeader className="text-xl font-semibold">
              🚀 Beta Mode
            </ModalHeader>
            <ModalBody>
              <p>
                CampusConnect is currently in <b>Beta Mode</b>. We're actively
                improving the platform and appreciate your feedback!
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onOpenChange}>
                Got it!
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </SignedOut>
      {/* Hero Section */}
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-black text-white">
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
              CampusConnect
            </h4>
            <p>
              Connect with students <br /> like never before
            </p>
          </div>

          <div className="my-4 flex w-full justify-center">
            <SignedOut>
              <SignUpButton mode="modal" afterSignUpUrl="/get-started">
                <Button variant="shadow">Get started</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              {user?.publicMetadata.userType === UserType.INCOMPLETE && (
                <Link href="/get-started" className="inline-flex">
                  <Button variant="shadow">Get started</Button>
                </Link>
              )}
            </SignedIn>
          </div>
        </motion.h1>
      </div>
      <Divider className="bg-white w-[80%] mx-auto"/>
      <HeroParallax products={products} />;
      
      {/* Features Section */}
      {/* <section className="flex w-full flex-col bg-background p-4 md:p-8">
        <div className="container mx-auto space-y-2 p-4 text-center">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Help grow your startup
          </h1>
          <p className="mx-auto my-4 max-w-2xl text-center text-sm font-normal text-neutral-500 lg:text-base">
            CampusConnect provides startups with tools to connect with students, enhancing the student-led startup ecosystem.
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
      </section> */}
    </div>
  );
};

Home.getLayout = (page: React.ReactElement) => {
  return <UserLayout className="min-h-screen">{page}</UserLayout>;
};

export default Home;