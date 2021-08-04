import React, { useState } from 'react'
import Link from 'next/link'
import { Button, Container, Dropdown, Grid, Header, Image, Menu, Visibility } from 'semantic-ui-react'
import Logo from '../public/inpostack-logo.svg'

import { useRouter } from 'next/router'

const Navbar = () => {
  const router = useRouter()
  const [dropdownOpen, toggleDropdown] = useState(false)
  

  return(
    <div className="NavbarWrapper">
      <Container>
        <Link href={'/'}>
            <div className="Logo">
              <Image src="/inpostack-logo.svg" alt="icon"
                    width={60} height={60}/>
              <Header>InPoStack</Header>
            </div>
          </Link>
          <div className="NavLinks">
            <Link href="/store">가게 관리</Link>
            <Link href="/account">계정 관리</Link>
            <Link href="/notice">공지 관리</Link>
            <Link href="/statistics">통계 보기</Link>
          </div>
      </Container>
    </div>
  )
}

export default Navbar