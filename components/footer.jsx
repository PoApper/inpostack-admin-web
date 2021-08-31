import { Grid, Image } from 'semantic-ui-react'
import styled from 'styled-components'

const Footer = () => {
  return (
    <_Footer>
      <FooterWrapper>
          <Grid columns='equal'>
            <Grid.Row colums={3}>
              <Grid.Column>
                <FooterInfo>
                  <Alink href="https://club.poapper.com" style={{marginRight:'40px'}}><h5>© 2021 PoApper</h5></Alink>
                  <Alink href="mailto:poapper@gmail.com">Privacy</Alink>
                </FooterInfo>
              </Grid.Column>
              <Grid.Column width={6}>
                <div style={{display: 'flex', justifyContent:'center'}}>
                  <a href="https://club.poapper.com"><Image src='/PoApper_Logo_cut.svg' size="mini" alt="poapper_logo"/></a>
                </div>
              </Grid.Column>
              <Grid.Column>
                <FooterInfo>
                  <Alink href="https://github.com/PoApper" style={{marginRight: '40px'}}>Github</Alink>
                  <Hoverlink href="mailto:poapper@gmail.com" ><b>Join Our Team!</b></Hoverlink>
                </FooterInfo>
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
  flex-direction: column;
  //align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`

const Alink = styled.a`
  color: #000;
  &:link { color: #000; }
  &:visited { color: #000; }
  margin-top: 10px;
`

const FooterInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) { 
    display: none;
  }
`

const Hoverlink = styled(Alink)`
  text-decoration: underline 0.25em rgba(168, 168, 168, 0);
  transition: text-decoration 300ms;
  &:hover {
    text-decoration: underline 0.25em rgba(168, 168, 168, 1);
  }
`