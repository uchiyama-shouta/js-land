import Head from "next/head";
import type { AppProps } from "next/app";

import "src/styles/globals.css";
import GoogleAnalytics from "src/lib/GoogleAnalytics";
import { usePageView } from "src/hooks/usePageView";

export default function MyApp({ Component, pageProps }: AppProps) {
  usePageView();
  return (
    <>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <GoogleAnalytics />
      <Component {...pageProps} />
    </>
  );
}
