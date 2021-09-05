import { getSession, signIn, signOut } from "next-auth/client";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import Style from "./Login.module.css";
import "react-toastify/dist/ReactToastify.css";
import UploadPage from "./uploadPage";
const IndexPage = ({ session }) => {
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button
            className={Style.button}
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            Sign In with Google Account
          </button>
        </Link>
      </div>
    );
  };

  const signOutButtonNode = () => {
    if (!session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signout">
          <button
            className={Style.add_button}
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </Link>
      </div>
    );
  };

  if (!session) {
    return (
      <div className={Style.container}>
        <Head>
          <title>Sign in</title>
        </Head>
        <h2 className={Style.h2}>Sign In</h2>
        <div className={Style.button_container}>
          {signOutButtonNode()}
          {signInButtonNode()}
        </div>
        <br />
      </div>
    );
  }

  return <UploadPage signIn={signInButtonNode} signOut={signOutButtonNode} />;
};

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  return {
    props: {
      session,
    },
  };
};

export default IndexPage;
