import React from 'react'
import Image from 'next/image'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

import LoginLayout from '../components/login_layout'

const Login = () => {
  return (
    <LoginLayout>
      <Image src={'/inpostack-logo.svg'} alt="logo"
             width={200} height={200}/>
      <Title>InPoStack</Title>
      <SubTitle>관리자 페이지</SubTitle>

      <Button
        href={`${process.env.NEXT_PUBLIC_API}/auth/login?redirect=https://admin.inpo.poapper.com`}>
        로그인
      </Button>
    </LoginLayout>
  )
}

const LoginButton = {
  width: '100%',
  backgroundColor: '#005d73',
  border: 'none',
  transition: '0.3s',
  fontWeight: 'bold',
  color: 'white',
}

const Title = styled.h2`
  margin-top: 2rem;
  margin-bottom: 8px;
  font-size: 36px !important;
  font-family: Oswald, serif !important;
  font-weight: 500;
`

const SubTitle = styled.h3`
  margin-top: 0;
  font-size: 26px !important;
  font-weight: 500;
`

export default Login
