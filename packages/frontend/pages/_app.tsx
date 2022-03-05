import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import type { AppProps } from "next/app";
import RouteGuard from "../components/RouteGuard";
import Navbar from "../components/Navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MoralisProvider
      appId={`${process.env.NEXT_PUBLIC_MORALIS_APP_ID}`}
      serverUrl={`${process.env.NEXT_PUBLIC_MORALIS_SERVER_URL}`}
    >
      <RouteGuard>
        <Navbar />
        <Component {...pageProps} />
      </RouteGuard>
    </MoralisProvider>
  );
}

export default MyApp;
