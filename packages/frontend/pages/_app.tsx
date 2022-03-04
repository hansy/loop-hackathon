import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import RouteGuard from "../components/RouteGuard";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={`${process.env.NEXT_PUBLIC_MORALIS_APP_ID}`}
      serverUrl={`${process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}`}
    >
      <RouteGuard>
        <Component {...pageProps} />
      </RouteGuard>
    </MoralisProvider>
  );
}

export default MyApp;
