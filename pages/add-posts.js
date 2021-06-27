import Style from '../styles/AddPost.module.css'
import getConfig from 'next/config'
import { useState } from 'react'
import { parseCookies } from 'nookies'

const { publicRuntimeConfig } = getConfig(); 

export default function AddPosts(){

  const [postTitle, setPostTitle] = useState('')
  const [postSlug, setPostSlug] = useState('')

  async function addPost(){

    const jwt = parseCookies().jwt

    const postInfo = {
      Title: postTitle,
      Slug: postSlug
    }

    const add = await fetch(`${publicRuntimeConfig.API_URL}/posts`, {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postInfo)
    })

    const addResponse = await add.json()

    console.log(addResponse)
  }

  return(
    <div>
      <h2>Add Post</h2>
      <form>
        <input type="text" onChange={e => setPostTitle (e.target.value) } value={postTitle} placeholder="Post title"/><br/>
        <input type="text" onChange={e => setPostSlug (e.target.value) } value={postSlug} placeholder="Post slug"/><br/>
        <button type="button" onClick={ () => addPost() }>Add Post</button>
      </form>
    </div>
  )
}

//*TODO: finish the registation