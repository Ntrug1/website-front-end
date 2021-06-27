import HomeStyle from '../styles/Home.module.css'
import SimpleCarousel from '../components/Slider'
import Cards from '../components/Cards'

export default function Home({posts}) {
  console.log(posts)
  return (
    <div>
      <SimpleCarousel/>
      <div className={HomeStyle.container}>
        <h1 className={HomeStyle.h1}>OUR CURRICULUM</h1>
        <div className={HomeStyle.container_up}>
          <img className={HomeStyle.image} src="/images_home/Rectangle_3.png"></img>
          <div className={HomeStyle.text_container_up}>
            <h2>Preschool</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget maecenas semper lacus amet. Malesuada faucibus feugiat et integer imperdiet sed. Aliquam scelerisque non netus eget varius viverra non tortor, volutpat. Eu diam convallis nulla ac. Augue nisi, lectus porttitor lectus.</p>
            <button className={HomeStyle.button}>
            <a href="/class#play_group">Learn more
            </a>
            </button>
          </div>
        </div>
        <hr className={HomeStyle.line}></hr>
        <div className={HomeStyle.container_down}>
          <div className={HomeStyle.text_container_down}>
            <h2>Preschool</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget maecenas semper lacus amet. Malesuada faucibus feugiat et integer imperdiet sed. Aliquam scelerisque non netus eget varius viverra non tortor, volutpat. Eu diam convallis nulla ac. Augue nisi, lectus porttitor lectus.</p>
            <button className={HomeStyle.button}>
              <a href="/class#nursery_1">Learn more</a></button>
          </div>
          <img className={HomeStyle.image2} src="/images_home/Rectangle_4.png"></img>
        </div>
        <img className={HomeStyle.img} src="/images_home/Rectangle_5.png"></img>
        <h1 className={HomeStyle.h1}>NEWS</h1>
        <div className={HomeStyle.last_container}>
          {/*data fetched*/}
            {posts.map(post => (
                <Cards key={post.id} post={post}/>
             ))}

        </div>
      </div>
    </div>
  )
}

//*Testing

export async function getServerSideProps() {
  const { API_URL } = process.env

  const res = await fetch(`${API_URL}/posts?_limit=3`)
  const data = await res.json()

  return{
    props: {
      posts: data
    }
  }
}