import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
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
      <section>
        <div className="container flex flex-col items-center justify-center gap-y-8 my-20">
          <Image
            src={"/assets/SWEC Logo.png"}
            alt={"SWEC Logo"}
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-96"
          />
          <h1 className="border-b-8 border-black text-8xl font-bold text-secondary">
            SWEC Connect
          </h1>
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
    );
  }
};

Home.getLayout = (
  page: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
) => {
  return <UserLayout>{page}</UserLayout>;
};

export default Home;
