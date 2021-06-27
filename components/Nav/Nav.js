import navStyle from './Nav.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

function Nav(){

  const router = useRouter()
  // console.log(router)
  
  return (
    <nav className={navStyle.nav}>
        <Link href='/'>
             <img className={navStyle.img} src="/images_home/logo.png"></img>
        </Link>
        <ul>
          <li>
            <Link href='/'>
            <a className={router.pathname === '/' ? navStyle.active : ''}>HOME</a>
            </Link>
          </li>
          <li>
            <Link href='/about'>
              <a className={router.pathname === '/about' ? navStyle.active : ''}>ABOUT</a>
            </Link>
          </li>
          <li>
            <Link href='/enrollment'>
            <a className={router.pathname === '/enrollment' ? navStyle.active : ''}>ENROLLMENT</a>
            </Link>
          </li>
          <li>
            <Link href='/class'>
            <a className={router.pathname === '/class' ? navStyle.active : ''}>CLASS</a>
            </Link>
          </li>
          <li>
            <Link href='/posts'>
            <a className={router.pathname === '/posts' ? navStyle.active : ''}>POSTS</a>
            </Link>
          </li>
          <li>
            <Link href='/contact'>
            <a className={router.pathname === '/contact' ? navStyle.active : ''}>CONTACT</a>
            </Link>
          </li>
        </ul>
    </nav>
  )
}

export default Nav