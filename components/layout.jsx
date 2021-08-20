import React from 'react'
import Head from 'next/head'

import Navbar from './navbar'
import Footer from './footer'

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
        <div style={main_}>
          {children}
        </div>
        <Footer style={{flex: 0}}/>
      </main>
    </div>
    )
}

const main_ ={
  width: "60rem",
  itemAlign: "center",
  height: "100%",
  margin: "120px auto 0px",
  flex: 1,
}

export default Layout