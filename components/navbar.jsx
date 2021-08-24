import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react'

import useUser from '../data/useUser'
import { logout } from '../requests/userApi'
import styled from 'styled-components'

const Navbar = () => {
  const router = useRouter()
  const { user, loading } = useUser()
  // const [menuFixed, setMenuFixed] = useState(false)

  return (
    <_Navbar>
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
          <Link href="/store" style={{ color: 'black', paddingRight: '15px' }}>
            <Menu.Item simple>
              가게관리
            </Menu.Item>
          </Link>
          <Menu.Item>
            <Link href="/account"><a
              style={{ color: 'black', paddingRight: '15px' }}>계정
              관리</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/notice"><a
              style={{ color: 'black', paddingRight: '15px' }}>공지
              관리</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Link href="/statistics"><a
              style={{ color: 'black', paddingRight: '15px' }}>통계
              보기</a></Link>
          </Menu.Item>
          {
            user ?
              <Menu.Item position={'right'}>
                <Dropdown item simple
                          text={`[${user.account_type}] ${user.name} (${user.id})`}>
                  <Dropdown.Menu style={{
                    border: 'none',
                    boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                  }}>
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