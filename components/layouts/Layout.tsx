import Head from "next/head"
import { FC, PropsWithChildren } from "react"
import { Navbar } from '../ui';
import { useRouter } from 'next/router';


interface Props {
  title?: string  
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

// @ts-ignore
export const Layout: FC<Props> = ({ children, title }) => {

  


  return (
    <>
      <Head>
        <title>{ title || 'Pokemon App'}</title>
        <meta name="author" content="Julian C" ></meta>
        <meta name="description" content={`Información sobre el pokemon ${ title }`} ></meta>
        <meta name="keywords" content="XXXX. pokemon, pokedex"></meta>

        <meta property="og:title" content ={`informacion sobre ${title}`} />
        <meta property="og:description" content={ `Esta es la pagina sobre ${title}` } />
        <meta property="og:image" content={`${ origin }/img/banner.png`} />
      </Head>

      {  <Navbar /> }
      <main  style={{
        padding: '0px 20px'
      }}>
        { children }
      </main>

    </>
  )
}
