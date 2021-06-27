import ContactStyle from '../styles/Contact.module.css'
import Head from 'next/head'
import SimpleMap from '../components/Map'
export default function Contact(){
  return(
    <div>
      <Head>
        <title>Contact</title>
      </Head>
      <div className={ContactStyle.contact}>
        <img className={ContactStyle.img1} src="/images_contact/Rectangle 2.png">
        </img>
        <div className={ContactStyle.row}>
          <div className={ContactStyle.container1}>
          <h1>CONTACT US</h1>
          {/* <img className={ContactStyle.img2} src="/images_contact/Rectangle 33.png"></img> */}
          {/* <SimpleMap/> */}
          </div>
          <div className={ContactStyle.container2}>
            <h1>Truong mam non Hoa My</h1>
            <ul>
                <li>
                  <h2>Address here</h2>
                </li>
                <li>
                  <h2>Phone number: 0936565681</h2>
                </li>
                <li>
                  <h2>Email: something@gmail.com</h2>
                </li>
                <li>
                  <h2>Monday - Friday (8am- 5pm)</h2>
                </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// *TODO: fix the GOOGLE MAP 