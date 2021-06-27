import style from '../styles/Layout.module.css'
import Nav from '../components/Nav'
import Info from './Info'
import Footer from './Footer'
const Layout = ({children}) => {
  return (
    <>
    <Info/>
    <Nav/>
    <div className={style.container}>
      <main className = {style.main}>
        {children}
      </main>
    </div>
    <Footer/>
    </>
  )
}

export default Layout