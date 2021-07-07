import { getSession, signIn, signOut } from "next-auth/client";
import Head from 'next/head';
import Link from "next/link";
import React from "react";
import Style from '../styles/Login.module.css'

const IndexPage = ({
  session,
}) => {
  const signInButtonNode = () => {
    if (session) {
      return false;
    }

    return (
      <div>
        <Link href="/api/auth/signin">
          <button className={Style.button} 
            onClick={(e) => {
              e.preventDefault();
              signIn('google');
            }}
          >
            Sign In
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
          <button className={Style.button} 
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
      <div className="hero">
      <Head>
        <title>Sign in</title>
      </Head>
        <h2 className={Style.h2}>Sign In</h2>
        <form>
          <div>
            <h2>Email: </h2>
            <input className={Style.input} type="email" />
          </div>
          <div>
            <h2>Password: </h2>
            <input className={Style.input}type="password" /><br/>
          </div>
          <div className="navbar">
          {signOutButtonNode()}
          {signInButtonNode()}
        </div><br/>
        </form>
      </div>
    )
  }

  return (
    <div className="hero">
      <Head>
        <title>Add Post</title>
      </Head>
      <h2>Add Post</h2>
      <form>
        <input className={Style.input} type="text" /><br/>
        <input className={Style.input} type="text" /><br/>
        <button className={Style.button}  type="button">Add Post</button>
      </form>
      <div className="navbar">
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
    </div>
  );
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