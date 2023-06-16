import { ClerkProvider } from "@clerk/nextjs";
import { MantineProvider } from "@mantine/core";

import { api } from "~/utils/api";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          //TODO: Add theme
          colorScheme: "light",
        }}
      >
        <Component {...pageProps} />
      </MantineProvider>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
