import ClassStyle from '../styles/Class.module.css'
import Head from 'next/head'
export default function Class(){
  return(
    <div>
      <Head>
        <title>Class</title>
      </Head>
      <img className={ClassStyle.img1} src="/images_class/Rectangle 2.png">
      </img>
      <a id="play_group"></a>
      <h1 className={ClassStyle.h1}>OUR CURRICULUM</h1>
      <div className={ClassStyle.container}>
        <div className={ClassStyle.row}>
          <div className={ClassStyle.text_box_left}>
            <h1>Play Group</h1>
            <h2>From 18-36 months old</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, habitant neque, diam ultricies sagittis. Est tincidunt pharetra, vitae integer varius erat ut. Nisl ornare amet rutrum posuere nunc. Tortor ac ornare pellentesque pulvinar auctor. Magna amet eu curabitur eget eget.</p>
          <a id="nursery_1"></a>
          </div>
          <img src="/images_class/Rectangle 21.png"></img>
        </div>
        <div className={ClassStyle.row}>
          <img src="/images_class/Rectangle 23.png"></img>
          <div className={ClassStyle.text_box_right}>
            <h1>Nursery 1</h1>
            <h2>From 3-4 years old</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, habitant neque, diam ultricies sagittis. Est tincidunt pharetra, vitae integer varius erat ut. Nisl ornare amet rutrum posuere nunc. Tortor ac ornare pellentesque pulvinar auctor. Magna amet eu curabitur eget eget.</p>
          </div>
        </div>
        <div className={ClassStyle.row}>
          <div className={ClassStyle.text_box_left}>
            <h1>Nursery 2</h1>
            <h2>From 4-5 years old</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, habitant neque, diam ultricies sagittis. Est tincidunt pharetra, vitae integer varius erat ut. Nisl ornare amet rutrum posuere nunc. Tortor ac ornare pellentesque pulvinar auctor. Magna amet eu curabitur eget eget.</p>
          </div>
          <img src="/images_class/Rectangle 26.png"></img>
        </div>
        <div className={ClassStyle.row}>
          <img src="/images_class/Rectangle 27.png"></img>
          <div className={ClassStyle.text_box_right}>
            <h1>Kindergarten</h1>
            <h2>From 5-6 years old</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Neque, habitant neque, diam ultricies sagittis. Est tincidunt pharetra, vitae integer varius erat ut. Nisl ornare amet rutrum posuere nunc. Tortor ac ornare pellentesque pulvinar auctor. Magna amet eu curabitur eget eget.</p>
          </div>
        </div>
      </div>
    </div>
  )
}