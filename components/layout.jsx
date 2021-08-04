import Navbar from './navbar'

import Footer from './footer'
import Head from 'next/head'
import React from 'react'

const Layout = ({ children }) => {
  return(
    <div style={{
      contentWidth: "60rem",
    }}>
      <Head>
        <title>InPoStack 관리자페이지</title>
        <meta name="description" content="InPoStack 행복한 배달 생활"/>
        <link rel="icon" href="/favicon.ico"/>    
      </Head>

      <Navbar/>
      <main>
        <div classname="Wrapper" style={{
          height: "100%",
          minHeight: "100vh",
          margin: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center", 
        }}>
          <div style={{width: "100%"}}>
              {children}
          </div>
        </div>
      </main>
      <Footer/>
    </div>
    )
}

export default Layout