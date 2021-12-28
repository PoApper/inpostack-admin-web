import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Mobile, PC } from './MediaQuery'
import { Button, Dropdown, Image, Menu, Icon, Accordion } from 'semantic-ui-react'
import styled from 'styled-components'

const Navbar = () => {
  const router = useRouter()
  const [ user, setUser ] = useState()
  const [activeIndex, setActiveIndex] = useState(1)
  
  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/verifyToken`, {
        withCredentials: true,
      });
      setUser(res.data)
    } catch (err) {
      router.push('/login')
    }
  }, [])

  function handleClink (e, titleProps)  {
    const { index } = titleProps
    const newIndex = activeIndex === index ? -1 : index
    setActiveIndex(newIndex)
  }

  async function handleLogout () {
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log('로그아웃에 실패했습니다.')
      throw err;
    }
  }

  return (
    <_Navbar>
      <PC>
      <NavbarWrapper>
        <NavbarMenu borderless>
          <Link href={'/'}>
            <LogoMenuItem position="left">
              <LogoDiv>
                <div style={{ marginRight: '1.2rem' }}>
                  <Image centered src={'/inpostack-logo.svg'} alt="logo"
                         style={{ width: '24px' }}/>
                </div>
                <LogoHeader>
                  InPoStack
                  <LogoSub>
                    (Admin)
                  </LogoSub>
                </LogoHeader>
              </LogoDiv>
            </LogoMenuItem>
          </Link>
          <Link href={'/store'} style={{ color: 'black', paddingRight: '15px' }}>
            <Menu.Item>
              가게관리
            </Menu.Item>
          </Link>
          <Link href={'/account'} style={{ color: 'black', paddingRight: '15px' }}>
            <Menu.Item>
              계정관리
            </Menu.Item>
          </Link>
          <Link href={'/notice'} style={{ color: 'black', paddingRight: '15px' }}>
            <Menu.Item>
              공지관리
            </Menu.Item>
          </Link>
          <Link href={'/statistics'} style={{ color: 'black', paddingRight: '15px' }}>
            <Menu.Item>
              통계관리
            </Menu.Item>
          </Link>
          {
            user ?
              <Menu.Item position={'right'}>
                <Dropdown item simple
                          text={`[${user.account_type}] ${user.name}`}>
                  <Dropdown.Menu style={{
                    border: 'none',
                    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
                  }}>
                    <Dropdown.Item text={'로그아웃'} onClick={() => {
                      handleLogout()
                      router.push('/login')
                    }}/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              :
              <Menu.Item position={'right'}>
                <Button style={{ border: 'none', background: 'none' }}
                        href={'/login'}>로그인</Button>
              </Menu.Item>
          }
        </NavbarMenu>
      </NavbarWrapper>
      </PC>
      <Mobile>
        <NavbarWrapper>
        <NavbarMenu borderless>
        <Accordion fluid>
          <Accordion.Title
            active={activeIndex === 0}
            index={0}
            onClick={handleClink}
          >
            <Icon name='bars' size='big' style={{margin: '10px'}}/>
          </Accordion.Title>
          <Accordion.Content
            active={activeIndex === 0}
          >
            <Link href="/store" style={{ color: 'black', paddingRight: '15px' }}>
              <Menu.Item>가게관리</Menu.Item>
            </Link>
            <Link href="/account" style={{ color: 'black', paddingRight: '15px' }}>
              <Menu.Item>계정관리</Menu.Item>
            </Link>
            <Link href="/notice" style={{ color: 'black', paddingRight: '15px' }}>
              <Menu.Item>공지관리</Menu.Item>
            </Link>
            <Link href="/statistics" style={{ color: 'black', paddingRight: '15px' }}>
              <Menu.Item>통계관리</Menu.Item>
            </Link>
          </Accordion.Content>
        </Accordion>
        <LogoDiv style={{verticalAlign: 'top'}}>
              <Link href={'/'}>
                <LogoHeader>InPoStack<LogoSub>(Admin)</LogoSub></LogoHeader>
              </Link>
        </LogoDiv>
          {
            user ?
              <Menu.Item position={'right'}>
                <Dropdown item simple
                          text={`${user.name}`}>
                  <Dropdown.Menu style={{
                    border: 'none',
                    boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.2)',
                  }}>
                    <Dropdown.Item text={`TYPE: ${user.account_type}`}/>
                    <Dropdown.Item text={`ID: ${user.id}`}/>
                    <Dropdown.Item text={'로그아웃'} onClick={() => {
                      logout()
                      router.push('/login')
                    }}/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              :
              <Menu.Item position={'right'}>
                <Button style={{ border: 'none', background: 'none' }}
                        href={'/login'}>로그인</Button>
              </Menu.Item>
          }
      </NavbarMenu>
      </NavbarWrapper>
      </Mobile>
    </_Navbar>
  )
}

export default Navbar

const _Navbar = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;

  font-weight: bold;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 10;
`

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`

const NavbarMenu = styled(Menu)`
  box-shadow: none !important;
  border: none !important;
  width: 100%;
`

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const LogoHeader = styled.h1`
  font-family: Oswald, serif;
  font-size: 1.8rem;
  margin: 0;
`

const LogoSub = styled.span`
  margin-left: 0.4rem;
  font-size: 1.2rem;
`

const LogoMenuItem = styled(Menu.Item)`
  &:hover {
    background: white !important;
  }
`