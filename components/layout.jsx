import Navbar from './navbar'

import Footer from './footer'
import Head from 'next/head'
import React from 'react'

const Layout = ({ children }) => {
  return(
    <div style={{
      contentWidth: "60rem",
      backgroundColor: "#f3f0eb"
    }}>
      <Head>
        <title>InPoStack 관리자페이지</title>
        <meta name="description" content="InPoStack 행복한 배달 생활"/>
        <link rel="icon" href="/favicon.ico"/>    
      </Head>
      <main style={{display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh"}}>
        <Navbar/>
        <div style={{width: "100%", height:"100%" ,marginTop: "120px", flex: "1"}}>
          {children}
        </div>
        <Footer style={{flex: 0}}/>
      </main>
    </div>
    )
}

export default Layout