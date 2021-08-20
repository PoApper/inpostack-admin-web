import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Button, Form, Container, Segment } from 'semantic-ui-react'
import LoginLayout from '../components/login_layout'
import { login } from '../requests/userApi'
import Logo from '../public/inpostack-logo.svg'

const Login = () => {
  const router = useRouter()
  const [id, setID] = useState('')
  const [password, setPWD] = useState('')

  async function handleLogin (e) {
    e.preventDefault()

    try {
      await login({ id, password })
      router.push('/')
    } catch (err) {
      alert('⚠ 관리자로 등록되지 않은 ID/PW 입니다.')
      router.push('/login')
    }

  }

  return (
    <LoginLayout>
      <Container id={"login"} textAlign={'center'} style={{margin: "1.2rem"}}>
        <Image src={Logo} width={80} height={80} centered/>
        <h1>InPoStack</h1>
        <h2>관리자 페이지</h2>
        <Segment>
          <Container textAlign={'left'} style={{padding: "5vh 5vw"}}>
            <h3>관리자 로그인</h3>
            <Form>
              <Form.Input required label={'아이디'} name={'id'}
                          onChange={(e) => setID(e.target.value)}/>
              <Form.Input required type='password' label={'비밀번호'} name={'password'}
                          onChange={(e) => setPWD(e.target.value)}/>
              <Button primary onClick={handleLogin}>로그인</Button>
            </Form>
          </Container>
        </Segment>
      </Container>
  </LoginLayout>
  )
}

export default Login
