import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'
import styled, { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true }).
      then((res) => {
        if (res.data.account_type !== 'ADMIN') {
          alert('관리자 계정이 아닙니다.')
          router.push('/login')
        }
        setUser(res.data);
      }).catch((err) => {
        console.log(err)
        alert('로그인 후 접속해주세요.')
        router.push('/login')
      })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>InPoStack 관리자페이지</title>
        <meta name="description" content="InPoStack 행복한 배달 생활"/>
        <link rel="icon" href={'/favicon.ico'}/>
      </Head>
      <Navbar/>
      <main>
        <Wrapper>
          <div style={{ width: '100%' }}>
            {children}
          </div>
        </Wrapper>
      </main>
      <Footer/>
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.footerHeight});
  max-width: ${({ theme }) => theme.contentWidth};
  padding: 8rem 1rem 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout