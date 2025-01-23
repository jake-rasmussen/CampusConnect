import {
  SignedOut,
  SignInButton,
  SignUp,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { cn } from "lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { BackgroundBeams } from "~/components/aceternity-ui/background-beams";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`relative overflow-hidden p-4 sm:p-8`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" mx-auto max-w-5xl text-left text-xl tracking-tight text-white md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "mx-auto max-w-4xl  text-left text-sm md:text-base",
        "text-center font-normal text-neutral-300 text-neutral-500",
        "mx-0 my-2 max-w-sm text-left md:text-sm",
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex h-full gap-10 px-2 py-8">
      <div className="group  mx-auto  h-full w-full bg-neutral-900 p-5 shadow-2xl">
        <div className="flex h-full w-full flex-1 flex-col space-y-2  ">
          <Image
            src="/images/homepage.png"
            alt="Homepage"
            fill
            className="aspect-square h-full w-full rounded-lg object-contain object-left-top"
          />
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-40 h-60 w-full bg-gradient-to-t from-black via-black to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-40 h-60 w-full bg-gradient-to-b from-black via-transparent to-transparent" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="group  mx-auto h-full w-full bg-transparent">
      <div className="relative flex h-full w-full flex-1 flex-col space-y-2">
        <Image
          src="/images/demo-open-applications.jpeg"
          alt="Open Applications"
          fill
          className="aspect-square h-full w-full rounded-sm object-cover object-center"
        />
      </div>
    </div>
  );
};

export const SkeletonTwo = () => {
  const imageVariants = {
    whileHover: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
    whileTap: {
      scale: 1.1,
      rotate: 0,
      zIndex: 100,
    },
  };
  return (
    <div className="relative flex h-full flex-col items-start gap-10 overflow-hidden p-8">
      <div className="-ml-20 flex flex-row">
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-700 bg-white p-1"
        >
          <Image
            src="/images/demo-application-1.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            quality={100}
          />
        </motion.div>
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-700 bg-white p-1"
        >
          <Image
            src="/images/demo-application-2.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            quality={100}
          />
        </motion.div>
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-700 bg-white p-1"
        >
          <Image
            src="/images/demo-application-1.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            quality={100}
          />
        </motion.div>
      </div>
      <div className="flex flex-row">
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-700 bg-white p-1"
        >
          <Image
            src="/images/demo-application-2.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            quality={100}
          />
        </motion.div>
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-700 bg-white p-1"
        >
          <Image
            src="/images/demo-application-1.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            quality={100}
          />
        </motion.div>
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="-mr-4 mt-4 flex-shrink-0 overflow-hidden rounded-xl border border-neutral-700 bg-white p-1"
        >
          <Image
            src="/images/demo-application-2.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="h-20 w-20 flex-shrink-0 rounded-lg object-cover md:h-40 md:w-40"
            quality={100}
          />
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-y-0 left-0 z-[100] h-full w-20 bg-gradient-to-r  from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[100] h-full w-20  bg-gradient-to-l from-black to-transparent" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="max-h-lg relative mt-10 flex h-60 flex-col items-center bg-transparent">
      <Globe className="absolute -bottom-80 -right-10 md:-bottom-72 md:-right-10" />
    </div>
  );
};

export const Globe = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        // longitude latitude
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
      ],
      onRender: (state) => {
        // Called on every animation frame.
        // `state` will be an empty object, return updated params.
        state.phi = phi;
        phi += 0.01;
      },
    });

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      className={className}
    />
  );
};

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  const features = [
    {
      title: "Create Customizable Homepages",
      description:
        "Create startup homepages with our no-code solution to help your venture gain visibility.",
      skeleton: <SkeletonOne />,
      className:
        "col-span-1 lg:col-span-4 border-b lg:border-r border-neutral-800",
    },
    {
      title: "Easy-to-make Applications",
      description:
        "Use our robust application creation and management system to streamline hiring.",
      skeleton: <SkeletonTwo />,
      className: "border-b col-span-1 lg:col-span-2 border-neutral-800",
    },
    {
      title: "Seamless Application Discoverability",
      description:
        "Get connected by exploring open applications, and help narrow down your next experience by relevant skills",
      skeleton: <SkeletonThree />,
      className: "col-span-1 lg:col-span-3 lg:border-r border-neutral-800",
    },
    {
      title: "Unlock Limitless Connections",
      description:
        "What are you waiting for? Get started with CampusConnect to help you get connected with students!",
      skeleton: <SkeletonFour />,
      className: "col-span-1 lg:col-span-3 border-b lg:border-none",
    },
  ];

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <div className="relative flex w-full flex-col bg-neutral-950">
        <BackgroundBeams />

        <div className="mx-auto flex min-h-screen flex-col items-center justify-center p-4">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            <div className="flex flex-col py-4 ">
              <h4 className="bg-gradient-to-br from-neutral-500 to-slate-800 bg-clip-text text-lg tracking-wide">
                Campus Connect
              </h4>
              <p>
                Connect with students <br /> like never before
              </p>
            </div>
            <div className="my-4 flex w-full flex-row items-center justify-center gap-4">
              <SignedOut>
                <SignUpButton mode="modal" redirectUrl="/get-started">
                  <Button>Get started</Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </motion.h1>
        </div>

        <div className="relative z-20 mx-auto max-w-7xl py-10 lg:py-40">
          <div className="px-8">
            <h4 className="mx-auto max-w-5xl text-center text-3xl font-medium tracking-tight text-white lg:text-5xl lg:leading-tight">
              Help grow your startup
            </h4>

            <p className="mx-auto my-4  max-w-2xl  text-center text-sm font-normal text-neutral-300 lg:text-base">
              CampusConnect looks to provide startups with tools to connect with
              students, bringing the student led start up ecosystem to the next
              level.
            </p>
            <div className="mt-12 grid max-w-7xl grid-cols-1 rounded-2xl border-neutral-800 bg-black lg:grid-cols-6 xl:border">
              {features.map((feature) => (
                <FeatureCard key={feature.title} className={feature.className}>
                  <FeatureTitle>{feature.title}</FeatureTitle>
                  <FeatureDescription>{feature.description}</FeatureDescription>
                  <div className="h-full w-full">{feature.skeleton}</div>
                </FeatureCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout className="min-h-screen">{page}</UserLayout>;
};

export default Home;
