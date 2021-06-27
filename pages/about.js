import AboutStyle from '../styles/About.module.css'
import Head from 'next/head'
export default function About(){
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>
      <img className={AboutStyle.img} src="/images_about/Rectangle 2.png"></img>
      <h1 className={AboutStyle.h1}>ABOUT US</h1>
      <img className={AboutStyle.img_2} src="/images_about/Rectangle 3.png"></img>
      <p className={AboutStyle.p}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod eget in est adipiscing est eleifend integer vestibulum volutpat. Interdum ac, ac turpis enim facilisi morbi amet.</p>
      <img className={AboutStyle.img_3} src="/images_about/Group 15.png"></img>
      <h1 className={AboutStyle.h1}>TEACHERS & STAFFS</h1>
    </div>
  )
}

