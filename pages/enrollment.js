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
      </div>
    </div>
  )
}

//*finish the crud for the enrollment form