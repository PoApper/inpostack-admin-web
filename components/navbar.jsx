import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Container, Dropdown, Grid, Header, Image, Menu, Sticky, Visibility } from 'semantic-ui-react'

const Logo='./inpostack-logo.svg'

import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const [dropdownOpen, toggleDropdown] = useState(false)
  var menuFixed = false
  return(
    <nav>
        <Visibility once={false}
                    /*onBottomPassed={() => {menuFixed: true}} onBottomVisible={() => {menuFixed: true}}*/>
          <Menu borderless fixed='top'
                /*style={menuFixed ? fixedMenuStyle : menuStyle}*/>
            <Menu.Item position={"left"} style={{paddingLeft: "30px"}}>
              <Link href={"/"}>
                <Grid columns={2} verticalAlign='middle'>
                  <Grid.Column>
                    <Image centered src={Logo} style={{width: "24px"}}/>
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
                <a style={NavLink}><Link href="/store">가게 관리</Link></a>
              </Menu.Item>
              <Menu.Item>
                <a style={NavLink}><Link href="/account">계정 관리</Link></a>
              </Menu.Item>
              <Menu.Item>
                <a style={NavLink}><Link href="/notice">공지 관리</Link></a>
              </Menu.Item>
              <Menu.Item>
                <a style={NavLink}><Link href="/statistics">통계 보기</Link></a>
              </Menu.Item>
            {
              //account ?
                <Menu.Item position={"right"}>
                  <p>example</p>
                  {/*<Dropdown item simple
                            text={`[${account.account_type}] ${account.name} (${account.id})`}>
                    <Dropdown.Menu style={{border: "none", boxShadow: "0 2px 5px 0px rgba(0, 0, 0, 0.2)"}}>
                      <Dropdown.Item text={"로그아웃"} onClick={this.handleLogout} href={"/"}/>
                    </Dropdown.Menu>
                  </Dropdown>
                </Menu.Item> :
                <Menu.Item position={"right"}> {/*}
                  <Button style={{border: "none", background: "none"}} href={"/login"}>로그인</Button>
                */}</Menu.Item>
            }
          </Menu>
        </Visibility>
      </nav>
    
  )
}

const menuStyle = {
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  transition: 'box-shadow 0.5s ease',
}

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0 0.4vw 1vh rgba(0, 0, 0, 0.2)',
  backdropFilter: "blur(8px)",
  background: "rgba(255, 255, 255, 0.5)"
}

const NavLinks = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
}

const NavLink = {
  
}

export default Navbar