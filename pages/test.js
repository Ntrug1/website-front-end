import { getSession, signIn, signOut } from "next-auth/client";
import Head from 'next/head';
import Link from "next/link";
import React from "react";
import Style from '../styles/Login.module.css'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Modal from "../components/Modal/Modal";
import ImageUpload from "../components/ImageUpload/ImageUpload";
import Image from 'next/image'

const IndexPage = ({
  session,
  posts
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
          <button className={Style.add_button} 
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

  //* need to be check (this part is for upload image)

  const [imagePreview, setImagePreview] = useState(null)

  const [showModal, setShowModal] = useState(false);

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
  
  const ImageUploaded = async (e) => {
    const { API_URL } = process.env
    const res = await fetch(`${API_URL}/posts`);
    const data = await res.json();
    // setImagePreview(ImageUploaded)
    setShowModal(false)
  }

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
      <div className={Style.head}>
      <h2>Add Posts</h2>
      <div>
        {signOutButtonNode()}
        {signInButtonNode()}
      </div>
      </div>
      <ToastContainer/>
      <form onSubmit={handleSubmit} >
        <div className={Style.grid}>
          <div className={Style.grid_items}>
            <label htmlFor="Title">Title:</label>
            <input
            className={Style.input} 
            name="Title" 
            type="text"
            id="Title"
            value={Title}
            onChange={handleInputChange}
            />
          </div>
          <div className={Style.grid_items}>
            <label htmlFor="Content">Content:</label>
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
      {imagePreview ? (
        <Image src={imagePreview} height={200} width={250}/>
      ):(
        <div>
          <p>No Image Available</p>
        </div>
      )}
      <div>
        <button onClick={() => setShowModal(true)} className={Style.button}>Upload Image</button>
      </div>
      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload ImageUploaded={ImageUploaded}/>
      </Modal>
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
