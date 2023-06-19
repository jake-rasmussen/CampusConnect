import { ClerkProvider } from "@clerk/nextjs";

import type { AppProps } from "next/app";

import "~/styles/globals.css";

import { api } from "~/utils/api";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <div className="h-5 bg-[#CC0007] p-10 w-5">test</div>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
