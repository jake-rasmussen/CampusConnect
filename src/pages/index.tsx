import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";

import Button from "~/components/button";
import LoadingPage from "~/components/loadingPage";
import UserLayout from "~/layouts/userLayout";

const Home = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded) {
    return <LoadingPage />;
  } else {
    return (
      <>
        <section className="">
          <div className="container flex flex-col items-center justify-center">
            <div className="mx-auto flex flex-col items-center justify-center p-6 sm:py-12 lg:flex-row lg:justify-between lg:py-24">
              <div className="flex w-1/2 items-center justify-center">
                <img
                  src="assets/logo.png"
                  alt=""
                  className="max-w-xl object-contain drop-shadow-2xl"
                />
              </div>
              <div className="flex max-w-2xl flex-col justify-center rounded-sm p-6 text-left">
                <h1 className="border-b-8 border-black text-8xl font-bold text-secondary">
                  SWEC Connect
                </h1>
                <p className="mb-8 mt-6 text-center text-lg text-black sm:mb-12">
                  Be at the heart of our vibrant community, managing membership
                  applications with efficiency and ensuring a seamless
                  onboarding experience for all new members. Help us make
                  connections and build an inclusive club environment like never
                  before.
                </p>
              </div>
            </div>
            {!isSignedIn ? (
              <SignInButton mode="modal">
                <Button className="px-14 py-6 text-2xl shadow-xl">
                  Get Started
                </Button>
              </SignInButton>
            ) : (
              <Link href={"/club"}>
                <Button className="px-14 py-6 text-2xl shadow-xl">
                  Get Started
                </Button>
              </Link>
            )}
          </div>
        </section>
      </>
    );
  }
};

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Home;
