import type { NextPage } from "next";
import Head from "next/head";
import { useMoralis } from "react-moralis";
// import styles from "../styles/Home.module.css";

const UserPage: NextPage = () => {
  const { authenticate, isAuthenticated, logout } = useMoralis();

  return <div>jello</div>;
};

export default UserPage;
