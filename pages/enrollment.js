import EnrollmentStyle from '../styles/Enrollment.module.css'
import Head from 'next/head'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
export default function Enrollment(){

  const [values, setValues] = useState({
    Name: "",
    Phone: "",
    DOB: "",
    Gender: "",
    Email: "",
    Address: "",
    Class: "",
  })

  const {Name, Phone, DOB, Gender, Email, Address, Class} = values;

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({ ...values, [name]: value});
    console.log(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const emptyFieldCheck = Object.values(values).some(
      (element) => element === "");

    if (emptyFieldCheck) {
      toast.error("Please fill all Input Field")
    }

    const { API_URL } = process.env
    const res = await fetch(`${API_URL}/admissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values),
    });
  
    if(!res.ok) {
      toast.error("Something went wrong")
    } else {
      
    } 
  }

  return(
    <div>
      <Head>
        <title>Enrollment</title>
      </Head>
      <img className={EnrollmentStyle.img} src="/images_enrollment/Rectangle 2.png"></img>
      <h1 className={EnrollmentStyle.h1}>ADMISSION FORM</h1>
      <ToastContainer/>
      <form onSubmit={handleSubmit} className={EnrollmentStyle.form}>
        <div className={EnrollmentStyle.grid}>
          <div>
          <label htmlFor="Name">Name</label>
          <input
              name="Name" 
              type="text"
              id="Name"
              value={Name}
              onChange={handleInputChange}/>
          </div>
          <div>
          <label htmlFor="Phone">Phone Number</label>
          <input
              name="Phone" 
              type="text"
              id="Phone"
              value={Phone}
              onChange={handleInputChange}/>
          </div>
          <div>
          <label htmlFor="DOB">DOB</label>
          <input
              name="DOB" 
              type="date"
              id="DOB"
              value={DOB}
              onChange={handleInputChange}/>
          </div>
          <div>
          <label htmlFor="Gender">Gender</label>
          <input
              name="Gender" 
              list="Gender"
              value={Gender}
              onChange={handleInputChange}/>
              <datalist id="Gender">
                <option value="Male"/>
                <option value="Female"/>
              </datalist>
          </div>
          <div>
          <label htmlFor="Email">Email</label>
          <input
              name="Email" 
              type="text"
              id="Email"
              value={Email}
              onChange={handleInputChange}/>
          </div>
          <div>
          <label htmlFor="Class">Class</label>
          <input
              name="Class" 
              list="Class"
              value={Class}
              onChange={handleInputChange}/>
              <datalist id="Class">
                <option value="Play Group"/>
                <option value="Nursery 1"/>
                <option value="Nursery 2"/>
                <option value="Kindergarden"/>
              </datalist>
          </div>
          <div>
          <label htmlFor="Address">Address</label>
          <textarea
              name="Address" 
              type="text"
              id="Address"
              value={Address}
              onChange={handleInputChange}/>
          </div>
        </div>
        <input type="submit" value="Submit"/>  
      </form>
    </div>
  )
}

//*finish the crud for the enrollment form