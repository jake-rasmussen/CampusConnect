import { ClerkProvider } from "@clerk/nextjs";
import { NextUIProvider } from "@nextui-org/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Toaster } from "react-hot-toast";

import Navbar from "~/components/navbar";
import { api } from "~/utils/api";

import "~/styles/globals.css";

import type { NextPage } from "next";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";

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
    <NextUIProvider>
      <Toaster position="bottom-center" />
      <DndProvider backend={HTML5Backend}>{children}</DndProvider>
    </NextUIProvider>
  </ClerkProvider>
);

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className="min-h-screen w-screen overflow-y-hidden bg-background">
      <Providers pageProps={pageProps}>
        {/* <Navbar /> */}
        {getLayout(<Component {...pageProps} />)}
      </Providers>
    </main>
  );
}

export default api.withTRPC(MyApp);
