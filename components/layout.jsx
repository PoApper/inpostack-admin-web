import React from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'

import theme from '../styles/theme'
import Navbar from './navbar'
import Footer from './footer'
import useUser from '../data/useUser'

const Layout = ({ children }) => {
  const router = useRouter()
  const { loading, user, isLogout } = useUser()

  if (!loading &&
    (isLogout || (!isLogout && user.account_type !== 'ADMIN'))) {
    if (process.env.NODE_ENV === 'production') {
      router.push('/login')
    }
  }

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