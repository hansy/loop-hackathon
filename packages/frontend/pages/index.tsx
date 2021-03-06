import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

declare var window: any;

const Home: NextPage = () => {
  const router = useRouter();
  const { authenticate, isAuthenticated } = useMoralis();

  if (isAuthenticated) {
    let redirectPath = String(router.query.redirectUrl);

    if (redirectPath === "null" || "undefined") {
      redirectPath = "/dashboard";
    }
    router.push({ pathname: redirectPath });

    return null;
  }

  const login = async () => {
    const params = [
      {
        chainId: "0x13881",
        chainName: "Mumbai",
        nativeCurrency: {
          name: "MATIC Token",
          symbol: "MATIC",
          decimals: 18,
        },
        rpcUrls: [`${process.env.NEXT_PUBLIC_ALCHEMY_POLYGON_RPC_URL}`],
        blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
      },
    ];

    try {
      await authenticate({
        provider: "metamask",
        signingMessage: "Welcome to Loop!",
      });

      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params,
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>LOOP</title>
        <meta name="description" content="Videos in web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={`${styles.main} bg-gray-800 -mt-6 -mb-10`}>
        <h1 className="text-5xl mb-2 text-gray-50">LOOP</h1>
        <p className="text-3xl text-gray-300 my-10">
          Add pay-per-view to your videos
        </p>
        <button
          className="mt-8 px-5 py-3 text-2xl border-2 border-gray-50 rounded-lg hover:bg-gray-50 hover:text-gray-800 text-gray-50"
          onClick={login}
        >
          Sign in with MetaMask
        </button>
      </main>
    </div>
  );
};

export default Home;
