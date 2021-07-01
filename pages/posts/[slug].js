import getConfig from 'next/config'
import Style from './Posts.module.css'
import {NextSeo} from 'next-seo'
import Head from 'next/head'

export default function Post({post}){
  // console.log(post)

  const { API_URL } = process.env

  const SEO = {
    title: `Hoa My | ${post.Title}`,
    description: post.Title,

    openGraph: {
    title: `Hoa My | ${post.Title}`,
    description: post.Title,
    }
  }

  return(
    <>
    <NextSeo {...SEO}/>
    <Head>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
    </Head>
    <div className={Style.container}>
      <h2 className={Style.h2}>{post.Title}</h2>
      <div className={Style.content}>
        <p dangerouslySetInnerHTML={{ __html: post.Content}}></p>
        {post.Image && (
          <img className={Style.image} src={post.Image[0].url}/>
        )}
      </div>
    </div>
    </>
  )
}

//* fetch data
//* test new fetching:

const {publicRuntimeConfig} = getConfig()

export async function getServerSideProps(context) {
  console.log(context)

  const {slug} = context.query
  const res = await fetch(`${publicRuntimeConfig.API_URL}/posts?Slug=${slug}`)
  const data = await res.json()

  return{
    props: {
      post: data[0]
    }
  }
}