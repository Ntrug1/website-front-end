import FooterStyle from '../styles/Footer.module.css'
import Link from 'next/link'
function Footer(){
  return(
    <footer className={FooterStyle.footer}>
      <div className={FooterStyle.container}>
          <Link href='/'>
            <img src="/images_home/logo.png"></img>
          </Link>
        <ul>
          <li>
            <h2>Truong mam non Hoa My</h2>
          </li>
          <li>
            <h2>Address here</h2>
          </li>
          <li>
            <h2>Phone number: 0936565681</h2>
          </li>
          <li>
            <h2>Email: something@gmail.com</h2>
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer