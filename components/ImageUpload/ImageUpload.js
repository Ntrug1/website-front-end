import { useState } from "react";
import styles from "./ImageUpload.module.css"

export default function ImageUpload({ ImageUploaded }) {

  const [Image, setImage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", Image);
    
    const {API_URL} = process.env
    const res = await fetch(`${API_URL}/upload`, {
      method: "POST",
      body: formData,
    });

    if(res.ok){
      ImageUploaded();
    }
  }

  const handleFileChange = (e) => {
    setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <h4>Upload Image here:</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange}/>
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  );
}