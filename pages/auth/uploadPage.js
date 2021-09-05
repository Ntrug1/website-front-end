import Head from "next/head";
import React from "react";
import Style from "../styles/Login.module.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPage({ signIn, signOut }) {
  const [values, setValues] = useState({
    Title: "",
    Content: "",
  });

  const { Title, Content } = values;

  //* define value for image upload
  const [imagePreview, setImagePreview] = useState();

  const [Image, setImage] = useState();

  let router = useRouter();

  //*Upload form logic
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emptyFieldCheck = Object.values(values).some(
      (element) => element === ""
    );

    if (emptyFieldCheck) {
      toast.error("Please fill all Input Field");
    }

    const { API_URL } = process.env;
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session.jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values, Image),
    });

    if (!res.ok) {
      toast.error("Something went wrong");
    } else if (emptyFieldCheck) {
      return false;
    } else {
      const post = await res.json();
      const postID = post.id;
      await ImageUpload(postID);
      router.push(` /posts/${post.Slug}`);
    }
  };

  //*Image upload logic
  const ImageUpload = async (ID) => {
    const post = ID;
    console.log(post);
    const formData = new FormData();
    formData.append("files", Image);
    formData.append("ref", "posts");
    formData.append("refId", post);
    formData.append("field", "Image");

    const { API_URL } = process.env;
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    const res2 = await res.json();
    console.log(res2);
    return res2;
  };

  //*text input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    console.log(name);
  };

  //* Image preview
  useEffect(() => {
    if (Image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(Image);
    } else {
      setImagePreview(null);
    }
  }, [Image]);

  //* Image upload handler
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div className={Style.container}>
      <Head>
        <title>Add Post</title>
      </Head>
      <div className={Style.head}>
        <h2>Add Posts</h2>
        <div>
          {signIn()}
          {signOut()}
        </div>
      </div>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
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
          <img src={imagePreview} className={Style.imagePreview} />
        ) : (
          <label className={Style.imageUpload}>
            <input
              className={Style.image_upload_button}
              accept="image/*"
              type="file"
              onChange={handleFileChange}
            />
            <img className={Style.upload_icon} src="/fa-solid_upload.png"></img>
            <p>Upload Image here</p>
          </label>
        )}
        <br />
        <input className={Style.add_button} type="submit" value="Add Posts" />
      </form>
    </div>
  );
}
