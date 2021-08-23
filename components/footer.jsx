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
              <p style={{ color: 'gray' }}>경상북도 포항시 남구 청암로 77(효자동 산31) 학생회관 211호
                <br/>COPYRIGHT 2021 PoApper. ALL RIGHTS RESERVED.</p>
              <a style={{ color: '#70572b' }} href="mailto:poapper@gmail.com"
                 target="_blank" rel="noopener noreferrer">Contact Us / </a>
              <a style={{ color: '#70572b' }} href="mailto:poapper@gmail.com"
                 target="_blank" rel="noopener noreferrer">Privacy Policy</a>
            </Grid.Column>
            <Grid.Column width={3}>
              <p style={{ color: '#413930', fontSize: 16 }}><b>POSTECH</b></p>
              <a style={{ color: '#70572b' }} href="https://www.postech.ac.kr"
                 target="_blank" rel="noopener noreferrer">포항공대 홈페이지</a>
              <br/>
              <a style={{ color: '#70572b' }} href="https://povis.postech.ac.kr"
                 target="_blank" rel="noopener noreferrer">POVIS</a>
              <br/>
              <a style={{ color: '#70572b' }}
                 href="https://library.postech.ac.kr/" target="_blank"
                 rel="noopener noreferrer">박태준 학술정보관</a>
              <br/>
            </Grid.Column>
            <Grid.Column width={3}>
              <p style={{ color: '#413930', fontSize: 16 }}><b>Our Sites</b></p>
              <a style={{ color: '#70572b' }} href="https://www.postech.ac.kr"
                 target="_blank" rel="noopener noreferrer">PoApper</a>
              <br/>
              <a style={{ color: '#70572b' }} href="https://www.postech.ac.kr"
                 target="_blank" rel="noopener noreferrer">InPoStack</a>
              <br/><br/>
              <a style={{ color: '#70572b', backgroundColor: '#f3f0eb' }}
                 href="mailto:poapper@gmail.com" target="_blank"
                 rel="noopener noreferrer">Join Our team!</a>
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
  padding: 1rem;
`

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`