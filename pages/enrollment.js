import EnrollmentStyle from '../styles/Enrollment.module.css'
import Head from 'next/head'
export default function Enrollment(){
  return(
    <div>
      <Head>
        <title>Enrollment</title>
      </Head>
      <img className={EnrollmentStyle.img} src="/images_enrollment/Rectangle 2.png"></img>
      <h1 className={EnrollmentStyle.h1}>ADMISSION FORM</h1>
      <div className={EnrollmentStyle.form}>
        {/* <table className={EnrollmentStyle.table}>
          <tr>
            <th>Name: <input></input></th>
            <td>DOB: <input></input></td>
          </tr>
          <tr>
            <th>Phone Number: <input></input></th>
            <td>Gender: <input></input></td>
          </tr>
          <tr>
            <th>Email: <input></input></th>
          </tr>
          <tr>
            <th>Class: <select></select></th>
          </tr>
          <tr>
            <th>Adress: <input></input></th>
          </tr>
        </table> */}
        {/* <button className={EnrollmentStyle.button}>Submit</button> */}
      </div>
    </div>
  )
}