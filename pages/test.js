import { getSession, signIn, signOut } from "next-auth/client";
import Head from 'next/head';
import Link from "next/link";
import React from "react";
import Style from '../styles/Login.module.css'
// import AddPosts from "../components/add-post/add";
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


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
      <div className={Style.container}>
      <Head>
        <title>Sign in</title>
      </Head>
        <h2 className={Style.h2}>Sign In</h2>
          <div className={Style.button_container}>
          {signOutButtonNode()}
          {signInButtonNode()}
        </div><br/>
      </div>
    )
  }

  const [values, setValues] = useState({
    Title: "",
    Content: "",
  })

  const {Title, Content} = values;

  let router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === "");

    if (emptyFieldCheck) {
      toast.error("Please fill all Input Field")
    }

    const { API_URL } = process.env
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${session.jwt}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    });
  
    if(!res.ok) {
      toast.error("Something went wrong")
    } else if(emptyFieldCheck) {
      return false;
    } else {
      const post = await res.json();
      router.push(` /posts/${post.Slug}`);
    }
  };
  

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value});
    console.log(name)
  };

  return (
    <div className={Style.container}>
      <Head>
        <title>Add Post</title>
      </Head>
      <div className={Style.align}>
        {/* <AddPosts/> */}
        {/* <h2 className={Style.h2}>Add Post</h2>
        <table>
          <tr>
            <th>Title:</th>
            <th><input className={Style.input} type="text" /></th>
            <th></th>
            <th></th>
          </tr>
          <tr>
            <td className={Style.content}>Content:</td>
            <td><textarea className={Style.input_content} type="text" />
            </td>
            <td className={Style.content}>Image:</td>
            <td><input  type="file" /></td>
          </tr>
          <tr>
            <td></td>
            <td><button className={Style.add_button}  type="button">Add Post</button></td>
            <td></td>
            <td></td>
          </tr>
        </table> */}
        <div>
            {signOutButtonNode()}
            {signInButtonNode()}
        </div>
        <h2 className={Style.h2}>Add Posts</h2>
      <ToastContainer/>
      <form onSubmit={handleSubmit} >
        <div >
          <div>
            <label htmlFor="Title">Title</label>
            <input
            className={Style.input} 
            name="Title" 
            type="text"
            id="Title"
            value={Title}
            onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="Content">Content</label>
            <textarea
            className={Style.input_content}
            name="Content" 
            type="text"
            id="Content"
            value={Content}
            onChange={handleInputChange}
            />
          </div>
        </div>
        <input className={Style.add_button} type="submit" value="Add Posts"/>
      </form>
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
