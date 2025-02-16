import { ClerkProvider } from "@clerk/nextjs";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

import Navbar from "~/components/navbar";
import { api } from "~/utils/api";

import "~/styles/globals.css";

import { useState } from "react";

import LoadingPage from "~/components/loadingPage";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import { Chip, HeroUIProvider, Button } from "@heroui/react";
import Link from "next/link";
import { Pencil } from "tabler-icons-react";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const Providers: React.FC<{ children: React.ReactNode; pageProps: any }> = ({
  children,
  pageProps,
}) => (
  <ClerkProvider {...pageProps}>
    <HeroUIProvider>
      <Toaster position="bottom-center" />
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </HeroUIProvider>
  </ClerkProvider>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [isNavbarLoading, setIsNavbarLoading] = useState(true);

  return (
    <main className="min-h-screen w-screen overflow-y-hidden bg-background">
      <Providers pageProps={pageProps}>

        <Navbar setIsLoadingNavbar={setIsNavbarLoading} />
        {isNavbarLoading ? (
          <LoadingPage />
        ) : (
          <>
            {getLayout(<Component {...pageProps} />)}


            <Link href="" className="fixed left-0 bottom-0 translate-x-[1rem] -translate-y-[1rem]">
              <Button color="warning" endContent={<Pencil />}>Give Feedback</Button>
            </Link>
          </>
        )}
      </Providers>
    </main>
  );
}

export default api.withTRPC(MyApp);
