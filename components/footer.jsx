//import Image from 'next/image'
import { Grid, Image, Container } from 'semantic-ui-react'
import styled from 'styled-components'

const src='./PoApper_logo.svg'

const Footer = () => {
  return(
    <_Footer>
      <FooterWrapper>
        <Grid>
          <Grid.Row>
            <Grid.Column width={8}>
              <Container fluid>
                <p style={{color:'#413930', fontSize: 16}}><b>PoApper, POSTECH 개발자 네트워크</b></p>
                <p>
                  PoApper는 함께 최신 개발 기술을 익히고 공유하며 성장하는 개발 동아리 입니다. 데이터 플랫폼을 개발해 POSTECH의 데이터를 수집하며, 개발 세미나와 해커톤 등을 개최하여 POSTECH의 개발 문화를 이끌고 있습니다.
                  <br/>
                </p>
              </Container>
            </Grid.Column>
            <Grid.Column width={2}></Grid.Column>
            <Grid.Column width={3}>
              <p style={{color:'#413930', fontSize: 16}}><b>POSTECH</b></p>
              <a style={{color:'#70572b'}} href="https://www.postech.ac.kr" target="_blank" rel="noopener noreferrer">포항공대 홈페이지</a>
              <br/>
              <a style={{color:'#70572b'}} href="https://povis.postech.ac.kr" target="_blank" rel="noopener noreferrer">POVIS</a>
              <br/>
              <a style={{color:'#70572b'}} href="https://library.postech.ac.kr/" target="_blank" rel="noopener noreferrer">박태준 학술정보관</a>
              <br/>
            </Grid.Column>
            <Grid.Column width={3}>
              <p style={{color:'#413930', fontSize: 16}}><b>Our Sites</b></p>
              <a style={{color:'#70572b'}} href="https://www.postech.ac.kr" target="_blank" rel="noopener noreferrer">PoApper</a>
              <br/>
              <a style={{color:'#70572b'}} href="https://www.postech.ac.kr" target="_blank" rel="noopener noreferrer">InPoStack</a>
              <br/><br/>
              <a style={{color:'#70572b', backgroundColor:'#f3f0eb'}} href="mailto:poapper@gmail.com" target="_blank" rel="noopener noreferrer">Join Our team!</a>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3}><Image src={src} size='small' left/></Grid.Column>
            <Grid.Column width={10}>
              <p style={{color:'gray'}}>경상북도 포항시 남구 청암로 77(효자동 산31) 학생회관 211호
                <br/>COPYRIGHT 2021 PoApper. ALL RIGHTS RESERVED.</p>
              <a style={{color:'#70572b'}} href="mailto:poapper@gmail.com" target="_blank" rel="noopener noreferrer">Contact Us / </a>
              <a style={{color:'#70572b'}} href="mailto:poapper@gmail.com" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
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
  height: 300px;
  background-color: white;
  bottom: 0;
  padding: 1rem;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;
  
  max-width: ${({ theme }) => theme.contentWidth};
`