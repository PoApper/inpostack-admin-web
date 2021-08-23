import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <_Footer>
      <FooterWrapper>
        <Grid style={{ width: '100%' }}>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src='/PoApper_logo.svg' size="small" left
                     alt="poapper_logo"/>
            </Grid.Column>
            <Grid.Column width={6}>
              <NonLink>경상북도 포항시 남구 청암로 77(효자동 산31) 학생회관 211호
                <br/>COPYRIGHT 2021 PoApper. ALL RIGHTS RESERVED.</NonLink>
              <WithLink 
                href="mailto:poapper@gmail.com"
                target="_blank" rel="noopener noreferrer">Contact Us</WithLink>
              <WithLink> / </WithLink>
              <WithLink 
                href="mailto:poapper@gmail.com"
                target="_blank" rel="noopener noreferrer">Privacy Policy</WithLink>
            </Grid.Column>
            <Grid.Column width={3}>
              <NonLink><b>POSTECH</b></NonLink>
              <WithLink
                href="https://www.postech.ac.kr"
                target="_blank" rel="noopener noreferrer">포항공대 홈페이지</WithLink>
              <br/>
              <WithLink 
                href="https://povis.postech.ac.kr"
                target="_blank" rel="noopener noreferrer">POVIS</WithLink>
              <br/>
              <WithLink
                 href="https://library.postech.ac.kr/" target="_blank"
                 rel="noopener noreferrer">박태준 학술정보관</WithLink>
              <br/>
            </Grid.Column>
            <Grid.Column width={2}>
              <NonLink><b>Our Sites</b></NonLink>
              <WithLink
                href="https://www.postech.ac.kr"
                target="_blank" rel="noopener noreferrer">PoApper</WithLink>
              <br/>
              <WithLink
                href="https://www.postech.ac.kr"
                target="_blank" rel="noopener noreferrer">InPoStack</WithLink>
              <br/><br/>
            </Grid.Column>
            <Grid.Column width={2}>
              <WithLink
                  href="mailto:poapper@gmail.com" target="_blank"
                  rel="noopener noreferrer">Join Our team!</WithLink>
              </Grid.Column>
          </Grid.Row>
        </Grid>
      </FooterWrapper>
    </_Footer>
  )
}

export default Footer

const _Footer = styled.footer`
  width: 100%;
  height: ${({ theme }) => theme.footerHeight};
  background-color: white;
  bottom: 0;
  padding: 5rem;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`

const WithLink = styled.a`
  margin-bottom: 10px;
  color: #888;
  transition: all 0.2s;
  &:hover{
    color: #000;
  }
`

const NonLink = styled.p`
  color: #000;
`