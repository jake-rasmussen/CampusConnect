import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "react";
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

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <main className="min-h-screen w-screen bg-background">
      <ClerkProvider {...pageProps}>
        {getLayout(<Component {...pageProps} />)}
      </ClerkProvider>
    </main>
  );
}

export default api.withTRPC(MyApp);
