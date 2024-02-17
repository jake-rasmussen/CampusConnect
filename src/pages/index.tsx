import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "~/components/aceternity_ui/3d-card";
import { BackgroundBeams } from "~/components/aceternity_ui/background-beams";

import LoadingPage from "~/components/loadingPage";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/shadcn_ui/card";
import UserLayout from "~/layouts/userLayout";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <section>
        <BackgroundBeams className="w-screen h-screen fixed top-0 z-0" />

        <div className="container flex flex-col items-center justify-center gap-y-8">
          <section className="flex min-h-[93vh] w-full flex-col items-center justify-center gap-y-8">
            <Image
              src={"/assets/SWEC Logo.svg"}
              alt={"SWEC Logo"}
              width="0"
              height="0"
              sizes="75vw"
              className="h-auto w-2/3 md:w-1/3 z-30"
            />
            <span className="mt-10 text-2xl font-light text-white z-30">
              <div className="flex flex-row items-center">
                Welcome to
                <div className="grow bg-secondary h-px ml-2"></div>
              </div>

              <h1 className="py-0 text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white">
                SWEConnect
              </h1>
            </span>
          </section>

          <Card className="shadow-xl max-w-2xl z-30 mb-52 bg-gradient-to-r from-primary to-secondary hover:scale-125 transition duration-300 ease-in-out">
            <CardHeader>
              <CardTitle className="uppercase font-black text-2xl text-center text-white">What we do</CardTitle>
            </CardHeader>
            <CardContent className="group flex h-full flex-col items-center text-center gap-8 text-white text-sm md:text-lg">
              Designed to seamlessly connect aspiring minds with exciting
              opportunities right here on campus, SWEConnect revolutionizes the
              way students discover and engage in projects at Johns Hopkins.
              Whether it's a student-led venture or a faculty-led research
              project, our platform empowers you to find the perfect fit for
              your passion and expertise. Say goodbye to endless searches and
              missed connections – join us and unlock a world of collaborative
              possibilities today!

              {!isSignedIn ? (
                <SignInButton mode="modal">
                  <div className="w-fit rounded-xl bg-black px-14 py-4 py-6 shadow-xl transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
                    <span className="tracking-none font-black uppercase text-white text-lg md:text-2xl">
                      Get Started
                    </span>
                  </div>
                </SignInButton>
              ) : (
                // </Button>
                <Link href={"/project"}>
                  <div className="w-fit rounded-xl bg-black px-14 py-4 py-6 shadow-xl transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
                    <span className="tracking-none font-black uppercase text-white text-lg md:text-2xl">
                      Get Started
                    </span>
                  </div>
                </Link>
              )}
            </CardContent>
          </Card>


        </div>
      </section>
    );
  }
};

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return (
    <UserLayout className="min-h-screen bg-gradient-to-b from-[#01325B] to-[#001530]">
      {page}
    </UserLayout>
  );
};

export default Home;
