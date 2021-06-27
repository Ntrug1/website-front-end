import '../styles/globals.css'
import Layout from '../components/Layout'
import { DefaultSeo } from 'next-seo'
import getConfig from 'next/config'
import Head from 'next/head'

import SEO from '../next-seo.config'
import Router from 'next/router'
import { parseCookies } from 'nookies'

function redirectUser(ctx, location) {
  if(ctx.req) {
    ctx.res.writeHead(302, { Location: location});
    ctx.res.end();
  }
  else {
    Router.push(location);
  }
}

function MyApp({ Component, pageProps }) {

  return (
    <>
      <DefaultSeo {...SEO} />
      <Head>
      <meta name = 'keywords' content='preschool'/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <link rel="icon" href="/logo.ico" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"></link>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

MyApp.getInitialProps = async ({Component, ctx}) => {

  let pageProps = {}
  const jwt = parseCookies(ctx).jwt

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if(!jwt) {
    if (ctx.pathname === "/add-posts"){
      redirectUser(ctx, "/login")
    }
  }

  return {
    pageProps
  }
}

export default MyApp
