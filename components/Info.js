import Style from '../styles/Info.module.css'
import Link from  'next/link'
function Info(){
  return (
    <nav className={Style.nav}>
      <p>Phone number: 0936565681</p>
      <p>Email: something@gmail.com</p>
      <Link href='/test'>
        <button className={Style.button}>Upload</button>
      </Link>
    </nav>
  )
}

export default Info