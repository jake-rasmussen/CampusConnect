import { SignInButton, useUser } from "@clerk/nextjs";
import { FlipWords } from "~/components/aceternity_ui/flip-words";
import { WavyBackground } from "~/components/aceternity_ui/wavy-background";

import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <section className="flex items-center justify-center h-full w-full bg-[#FFF7E9]">
        <WavyBackground
          backgroundFill="#FFF7E9"
          colors={["#5F9DF7", "#1746A2"]}
          waveWidth={100}
        />
        <div className="absolute flex flex-col justify-center items-center text-[#FFF7E9]">
          <h1 className="text-9xl font-semibold text-black">
            CampusConnect
          </h1>

          <div className="flex justify-center items-center px-4 my-20">
            <div className="text-4xl mx-auto font-normal text-black">
              Start building your <FlipWords words={["Project", "Network", "Startup", "Community"]} className="text-[#FF731D] w-[10rem]" /> <br />
            </div>
          </div>
        </div>
      </section>
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
