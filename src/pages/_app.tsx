import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";

import type { AppProps } from "next/app";
import MainLayout from "~/layouts/layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MainLayout>
      <main className="min-h-screen w-screen bg-background pt-24">
        <ClerkProvider {...pageProps}>
          <Component {...pageProps} />
        </ClerkProvider>
      </main>
    </MainLayout>

  );
}

export default api.withTRPC(MyApp);
