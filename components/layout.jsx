import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

import Navbar from './navbar'
import Footer from './footer'
import { useRouter } from 'next/router'

const Layout = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true })

    const _user = res.data
    setUser(_user)

    if (!_user) {
      router.push('/login')
    } else {
      console.log(_user.account_type);
      if (_user.account_type !== 'ADMIN') {
        alert('관리자 계정이 아닙니다.')
        router.push('/login')
      }
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>InPoStack 관리자페이지</title>
        <meta name="description" content="InPoStack 행복한 배달 생활"/>
        <link rel="icon" href={'/favicon.ico'}/>
      </Head>
      {
        user ?
          (<>
            <Navbar/>
            <main>
              <Wrapper>
                <div style={{ width: '100%' }}>
                  {children}
                </div>
              </Wrapper>
            </main>
            <Footer/>
          </>) : null
      }
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - 300px);
  max-width: ${({ theme }) => theme.contentWidth};
  padding: 8rem 1rem 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout