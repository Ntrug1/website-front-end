import Style from '../styles/Info.module.css'
import Link from  'next/link'
function Info(){
  return (
    <nav className={Style.nav}>
      <p>Phone number: 0936565681</p>
      <p>Email: something@gmail.com</p>
      <Link href='/add-posts'>
        <button className={Style.button}>Sign In</button>
      </Link>
    </nav>
  )
}

export default Info