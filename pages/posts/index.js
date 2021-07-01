import Style from './index.module.css'
import Cards from '../../components/Cards';
import {useRouter} from 'next/router'
import Head from 'next/head';

export default function PostsPage({postList, page, numbofPosts}){
  const router = useRouter()
  
  const lasPage = Math.ceil(numbofPosts / 6)

  return (
    <div>
      <Head>
        <title>Posts</title>
      </Head>
      <img className={Style.img1} src="/images_news/Rectangle 2.png"></img>
      <h1 className={Style.h1}>POSTS</h1>
    <div className={Style.last_container}>
      <div className={Style.card}>
        {postList.map(post => (
        <Cards key={post.Slug} post={post}/>
        ))}
      </div>
      <div className={Style.button_container}>
      <button onClick={() => router.push(`/posts?page=${page - 1}`)} disabled={page <= 1}>Previous</button>
      <button onClick={() => router.push(`/posts?page=${page + 1}`)}
      disabled={page >= lasPage}>Next</button>
      </div>
    </div>
    </div>
  )
}

export async function getServerSideProps({query: {page = 1}}){
  console.log(page)

  const { API_URL } = process.env

  const start = +page === 1 ? 0 : (+page - 1) * 6;

  const numbOfPostRes = await fetch(`${API_URL}/posts/count`);
  const numbofPosts = await numbOfPostRes.json();

  const res = await fetch(`${API_URL}/posts?_limit=6&_start=${start}`);
  const allPosts = await res.json();
  return{
    props:{
      postList: allPosts,
      page: +page,
      numbofPosts
    }
  }
}
