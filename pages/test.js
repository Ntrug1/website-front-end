import { getSession, signIn, signOut } from "next-auth/client";
import Head from 'next/head';
import Link from "next/link";
import React from "react";
import Style from '../styles/Login.module.css'
import { useRef, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const IndexPage = ({
  session,
  post
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

  //* define values for text upload
  const [values, setValues] = useState({
    Title: "",
    Content: "",
  })

  const {Title, Content} = values;

  //* define value for image upload
  const [imagePreview, setImagePreview] = useState();

  const [Image, setImage] = useState();

  let router = useRouter();

  //*Upload form logic
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
      body: JSON.stringify(values, Image),
    });
  
    if(!res.ok) {
      toast.error("Something went wrong")
    } else if(emptyFieldCheck) {
      return false;
    } else {
       const post = await res.json();
      // console.log(post.id)
      const postID = post.id
      await ImageUpload(postID)
      router.push(` /posts/${post.Slug}`);
    }
  };
  
  //*Image upload logic
  const ImageUpload = async (ID) => {
    const post = ID
    console.log(post)
    const formData = new FormData()
    formData.append("files", Image)
    formData.append("ref", "posts")
    formData.append("refId", post)
    formData.append("field", "Image")

    const {API_URL} = process.env
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const res2 = await res.json()
    console.log(res2)
    return res2
  }

  //*text input handler
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value});
    console.log(name)
  };

  //* Image preview
  useEffect(() => {
    if (Image) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(Image)
    }else{
      setImagePreview(null)
    }
  }, [Image])

  //* Image upload handler
  const handleFileChange = (e) => {
    setImage(e.target.files[0])
    console.log(e.target.files[0])
  }

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
        <h4>Upload Image here:</h4>
        {imagePreview ? (
          <img src={imagePreview} className={Style.imagePreview}/>
        ):(
          <label className={Style.imageUpload}>
              <input className={Style.image_upload_button} accept="image/*" type="file" onChange={handleFileChange}/>
              <img className={Style.upload_icon} src="/fa-solid_upload.png"></img>
              <p>Upload Image here</p>
          </label>
        )}
        <br/>
        <input className={Style.add_button} type="submit" value="Add Posts"/>  
      </form>
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
