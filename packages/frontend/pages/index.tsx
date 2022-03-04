import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout } = useMoralis();

  if (isAuthenticated) {
    router.push({ pathname: "/dashboard" });

    return null;
  }

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
          <button
            onClick={() => {
              authenticate({ provider: "metamask" });
            }}
          >
            Sign in with MetaMask
          </button>
        )}
      </main>
    </div>
  );
};

export default Home;
