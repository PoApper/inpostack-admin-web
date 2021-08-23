import React, { useState } from 'react'
import useUser from '../data/useUser'
import { logout } from '../requests/userApi'

import Link from 'next/link'
import { Button, Dropdown, Grid, Header, Image, Menu, Visibility } from 'semantic-ui-react'

const Logo='./inpostack-logo.svg'

import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const { loading, loggedIn, user } = useUser()
  const [ menuFixed, useMenuFixed ] = useState(false)
  
  const menuStyle = {
    cursor: 'pointer',
    border: 'none',
    borderRadius: 0,
    boxShadow: 'none',
    transition: 'box-shadow 0.5s ease',
  }
  
  const fixedMenuStyle = {
    cursor: 'pointer',
    backgroundColor: '#fff',
    border: 'none',
    boxShadow: '0 0.4vw 1vh rgba(0, 0, 0, 0.2)',
    backdropFilter: "blur(8px)",
    background: "rgba(255, 255, 255, 0.5)"
  }

  return(
    <nav>
      <Visibility once={false}
                  onBottomPassed={()=>useMenuFixed(true)} onBottomVisible={()=>useMenuFixed(false)}>
        <Menu borderless fixed='top'
                style={menuFixed ? fixedMenuStyle : menuStyle}>
          <Menu.Item position={"left"} style={{paddingLeft: "30px", paddingRight:"0.5%"}}>
            <Link href={"/"}>
              <Grid columns={2} verticalAlign='middle'>
                <Grid.Column>
                  <Image centered src={Logo} alt="logo" style={{width: "24px"}}/>
                </Grid.Column>
                <Grid.Column>
                  <Header as='h1'
                          style={{
                            //fontFamily: "Caveat",
                            textAlign: "center",
                            marginTop: "-0.2em",
                            fontSize: "medium",
                          }}>
                    Inpostack <br/>
                    <small>(관리자)</small>
                  </Header>
                </Grid.Column>
              </Grid>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/store'><a style={{color: 'black', paddingRight: '15px'}}>가게 관리</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/account'><a style={{color: 'black', paddingRight: '15px'}}>계정 관리</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/notice'><a style={{color: 'black', paddingRight: '15px'}}>공지 관리</a></Link>
          </Menu.Item>
          <Menu.Item>
            <Link href='/statistics'><a style={{color: 'black', paddingRight: '15px'}}>통계 보기</a></Link>
          </Menu.Item>
            {
              loggedIn ? 
                <Menu.Item position={"right"}>
                  <Dropdown item simple
                            text={`[${user.account_type}] ${user.name} (${user.id})`}>
                    <Dropdown.Menu style={{border: "none", boxShadow: "0 2px 5px 0px rgba(0, 0, 0, 0.2)"}}>
                      <Dropdown.Item text={"로그아웃"} onClick={() => {
                        logout()
                        router.push('/login')
                      }}/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item> 
                :
                <Menu.Item position={"right"}> 
                  <Button style={{border: "none", background: "none"}} href={"/login"}>로그인</Button>
                </Menu.Item>
            }
          </Menu>
        </Visibility>
      </nav>
    
  )
}

export default Navbar