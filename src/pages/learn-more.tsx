import { Divider } from "@nextui-org/react";
import { motion } from "framer-motion";
import { BackgroundBeams } from "~/components/aceternity-ui/background-beams";
import UserLayout from "~/layouts/userLayout";

const Home = () => {
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
            <div className="flex flex-col py-4 text-4xl max-w-5xl tracking-normal mx-4">
              <p>
                Are you a student entrepreneur ready to turn your groundbreaking ideas into reality? Or are you looking for hands-on experience by joining a dynamic startup team? CampusConnect is here to bridge the gap.
              </p>
              <br />
              <p>
                CampusConnect is a platform designed to connect student founders with entrepreneurship-driven peers seeking to join a startup. Whether you’re building the next big startup or looking to contribute your skills to an ambitious project, CampusConnect is your gateway to finding like-minded collaborators at JHU.
              </p>

              <Divider className="bg-neutral-500 my-8"/>

              <p>
                Stay tuned! CampusConnect is coming soon!
              </p>
            </div>
          </div>
          <div className="my-4 flex w-full flex-row items-center justify-center gap-4">
          </div>
        </motion.h1>
      </div>
    </div>
  );
}

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout className="min-h-screen">{page}</UserLayout>;
};

export default Home;
