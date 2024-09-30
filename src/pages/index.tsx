import { SignInButton, useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { AuroraBackground } from "~/components/aceternity-ui/aurora-background";
import { FlipWords } from "~/components/aceternity-ui/flip-words";
import { WavyBackground } from "~/components/aceternity-ui/wavy-background";

import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <AuroraBackground className="bg-black">
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <div className="text-4xl mx-auto font-normal text-white">
            Start building your <FlipWords words={["Project", "Network", "Startup", "Community"]} className="text-[#FF731D] w-[10rem]" /> <br />
          </div>
          <div className="text-9xl font-bold text-white text-center">
            CampusConnect
          </div>
        </motion.div>
      </AuroraBackground >
    );
  }
};

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return (
    <UserLayout className="min-h-screen bg-gradient-to-r from-[#FF9442] to-[#DC5F00]">
      {page}
    </UserLayout>
  );
};

export default Home;
