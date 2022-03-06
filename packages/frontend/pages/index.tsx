import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout } = useMoralis();

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
        rpcUrls: [
          "https://polygon-mumbai.g.alchemy.com/v2/cAX9SrNq8unHmyPGsiKndelT-uY7Ou97",
        ],
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
        <title>Loop</title>
        <meta name="description" content="Videos in web3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {isAuthenticated ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Sign in with MetaMask</button>
        )}
      </main>
    </div>
  );
};

export default Home;
