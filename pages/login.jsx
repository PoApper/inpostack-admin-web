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
      <Image src={Logo} alt="logo"
             width={200} height={200}/>
      <h2 stype={{marginTop: '2rem'}}>InPoStack</h2>
      <h3>점주페이지</h3>

      <Form style={{width: '22rem'}}>
        <Form.Input
          name="id" placeholder="아이디"
          onChange={(e) => setID(e.target.value)}
        />
          <Form.Input type="password" name="password"
                 placeholder="비밀번호" onChange={(e) => setPWD(e.target.value)}/>
        <Button onClick={handleLogin} style={LoginButton}>로그인</Button>
      </Form>
  </LoginLayout>
  )
}

const LoginButton = {
  width: '100%',
  backgroundColor: '#005d73',
  border: 'none',
  transition: '0.3s',
  fontWeight: 'bold',
  color: 'white'
}

export default Login
