import { useClerk } from "@clerk/clerk-react";
import { ClerkProvider, SignedIn, useAuth, useUser } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "react";
import "~/styles/globals.css";
import "react";

import { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

import LoadingPage from "~/components/loadingPage";
import Navbar from "~/components/navbar";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <main className="min-h-screen w-screen overflow-y-hidden bg-background">
      <ClerkProvider {...pageProps}>
        <SignedIn>
          <Navbar isLoading={isLoading} setIsLoading={setIsLoading} />
        </SignedIn>
        <Toaster />
        {isLoading ? (
          <LoadingPage />
        ) : (
          <DndProvider backend={HTML5Backend}>
            {getLayout(<Component {...pageProps} />)}
          </DndProvider>
        )}
      </ClerkProvider>
    </main>
  );
}

export default api.withTRPC(MyApp);
