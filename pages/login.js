import getconfig from 'next/config'
import Style from '../styles/Login.module.css'
import { useState } from 'react';
import { setCookie } from 'nookies';
import Router from 'next/router';
const {publicRuntimeConfig} = getconfig();

export default function Login(){

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogin(){
    // console.log('login handeled')
    const loginInfo = {
      identifier: username,
      password: password
    }

    const login = await fetch(`${publicRuntimeConfig.API_URL}/auth/local`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginInfo)
    })

    const loginRes = await login.json();

    setCookie(null, 'jwt', loginRes.jwt, {
      maxAge: 30 * 24 * 60 * 60,
      path:'/',
    })

    Router.push('/add-posts')
    
    console.log(loginRes)
  }

  return(
  <div>
    <h2 className={Style.h2}>Sign In</h2>
    <form>
      <div>
        <h2>Email: </h2>
        <input className={Style.input} type="email" onChange={e => setUsername(e.target.value) } value={username} />
      </div>
      <div>
        <h2>Password: </h2>
        <input className={Style.input}type="password" onChange={e => setPassword(e.target.value) } value={password} /><br/>
      </div>
      <button className={Style.button} type="button" onClick={() => handleLogin() }>Sign In</button><br/>
    </form>
  </div>
  )
}