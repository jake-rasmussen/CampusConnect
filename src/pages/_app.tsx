import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "react";
import "~/styles/globals.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

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
  return (
    <main className="min-h-screen w-screen bg-background">
      <ClerkProvider {...pageProps}>
        <Navbar />
        <Toaster />
        {/* TODO: see if we should add this to specific admin layout */}
        <DndProvider backend={HTML5Backend}>
          {getLayout(<Component {...pageProps} />)}
        </DndProvider>
      </ClerkProvider>
    </main>
  );
}

export default api.withTRPC(MyApp);
