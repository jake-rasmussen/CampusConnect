import { SignInButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import Link from "next/link";
import { BackgroundBeams } from "~/components/aceternity-ui/background-beams";
import Image from "next/image";

import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";
import { BrandYoutube } from "tabler-icons-react";
import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import { cn } from "lib/utils";
import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/react";

const FeatureCard = ({
  children,
  className,
}: {
  children?: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn(`p-4 sm:p-8 relative overflow-hidden`, className)}>
      {children}
    </div>
  );
};

const FeatureTitle = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p className=" max-w-5xl mx-auto text-left tracking-tight text-white text-xl md:text-2xl md:leading-snug">
      {children}
    </p>
  );
};

const FeatureDescription = ({ children }: { children?: React.ReactNode }) => {
  return (
    <p
      className={cn(
        "text-sm md:text-base  max-w-4xl text-left mx-auto",
        "text-neutral-500 text-center font-normal text-neutral-300",
        "text-left max-w-sm mx-0 md:text-sm my-2"
      )}
    >
      {children}
    </p>
  );
};

export const SkeletonOne = () => {
  return (
    <div className="relative flex py-8 px-2 gap-10 h-full">
      <div className="w-full  p-5  mx-auto bg-neutral-900 shadow-2xl group h-full">
        <div className="flex flex-1 w-full h-full flex-col space-y-2  ">
          <Image
            src="/images/homepage.png"
            alt="Homepage"
            fill
            className="h-full w-full aspect-square object-contain object-left-top rounded-lg"
          />
        </div>
      </div>

      <div className="absolute bottom-0 z-40 inset-x-0 h-60 bg-gradient-to-t from-black via-black to-transparent w-full pointer-events-none" />
      <div className="absolute top-0 z-40 inset-x-0 h-60 bg-gradient-to-b from-black via-transparent to-transparent w-full pointer-events-none" />
    </div>
  );
};

export const SkeletonThree = () => {
  return (
    <div className="w-full  mx-auto bg-transparent group h-full">
      <div className="flex flex-1 w-full h-full flex-col space-y-2 relative">
        <Image
          src="/images/demo-open-applications.jpeg"
          alt="Open Applications"
          fill
          className="h-full w-full aspect-square object-cover object-center rounded-sm"
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
    <div className="relative flex flex-col items-start p-8 gap-10 h-full overflow-hidden">
      <div className="flex flex-row -ml-20">
        <motion.div
          variants={imageVariants}
          style={{
            rotate: Math.random() * 20 - 10,
          }}
          whileHover="whileHover"
          whileTap="whileTap"
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border-neutral-700 border flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/images/demo-application-1.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border-neutral-700 border flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/images/demo-application-2.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border-neutral-700 border flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/images/demo-application-1.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border-neutral-700 border flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/images/demo-application-2.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border-neutral-700 border flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/images/demo-application-1.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
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
          className="rounded-xl -mr-4 mt-4 p-1 bg-white border-neutral-700 border flex-shrink-0 overflow-hidden"
        >
          <Image
            src="/images/demo-application-2.jpeg"
            alt="Demo Application"
            width={80}
            height={80}
            sizes="(max-width: 768px) 80px, 240px"
            className="rounded-lg h-20 w-20 md:h-40 md:w-40 object-cover flex-shrink-0"
            quality={100}
          />
        </motion.div>
      </div>

      <div className="absolute left-0 z-[100] inset-y-0 w-20 bg-gradient-to-r from-black to-transparent  h-full pointer-events-none" />
      <div className="absolute right-0 z-[100] inset-y-0 w-20 bg-gradient-to-l from-black  to-transparent h-full pointer-events-none" />
    </div>
  );
};

export const SkeletonFour = () => {
  return (
    <div className="h-60 max-h-lg flex flex-col items-center relative bg-transparent mt-10">
      <Globe className="absolute -right-10 md:-right-10 -bottom-80 md:-bottom-72" />
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
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const features = [
    {
      title: "Create Customizable Homepages",
      description:
        "Create project homepages with our no-code solution to help your project gain visibility.",
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
      className:
        "col-span-1 lg:col-span-3 lg:border-r border-neutral-800",
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
      <div className="w-full bg-neutral-950 relative flex flex-col">
        <BackgroundBeams />

        <div className="mx-auto p-4 min-h-screen flex flex-col items-center justify-center">
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            <div className="flex flex-col py-4 ">
              <h4 className="text-lg bg-gradient-to-br from-neutral-500 to-slate-800 bg-clip-text tracking-wide">
                Campus Connect
              </h4>
              <p>Connect with students <br /> like never before</p>
            </div>
            <div className="flex flex-row gap-4 w-full items-center justify-center my-4">
              <Button onPress={onOpen}>Get started</Button>
            </div>
          </motion.h1>
        </div>

        <div className="relative z-20 py-10 lg:py-40 max-w-7xl mx-auto">
          <div className="px-8">
            <h4 className="text-3xl lg:text-5xl lg:leading-tight max-w-5xl mx-auto text-center tracking-tight font-medium text-white">
              Help grow your startup
            </h4>

            <p className="text-sm lg:text-base  max-w-2xl  my-4 mx-auto text-center font-normal text-neutral-300">
              CampusConnect looks to provide startups with tools to connect with students, bringing the student led start up
              ecosystem to the next level.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-6 mt-12 xl:border border-neutral-800 bg-black rounded-2xl max-w-7xl">
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
  return (
    <UserLayout className="min-h-screen">
      {page}
    </UserLayout>
  );
};

export default Home;
