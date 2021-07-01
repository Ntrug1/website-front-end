import styled from '../styles/Cards.module.css'
import Link from 'next/link'

export default function Card({post}){
  
  // console.log(post)

  // console.log(post.Image[0].url)

  return (
    <Link href="/posts/[slug]" as={`/posts/${post.Slug}`}>
    <div className={styled.card}>
      {post.Image && (
        <img className={styled.image} src={post.Image[0].url}/>
      )}
      <div className={styled.body}>
        <h3 className={styled.h3}>{ post.Title }</h3>
        <p className={styled.p} dangerouslySetInnerHTML={{__html: post.Content}}/>
      </div>
    </div>
    </Link>
  )
}