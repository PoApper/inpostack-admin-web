import styled from 'styled-components'

import Layout from '../components/layout'
import OverviewBlock from '../components/index/overview-block'
import RecentBlock from '../components/index/recent-block'

export default function Home () {
  return (
    <Layout>
      <Title>인포스택 관리자 페이지 입니다.</Title>

      <ul style={{ margin: 0 }}>
        <li>
          <a href={'https://inpostack.poapper.club/'}
             target={'_blank'} rel={'noreferrer'}>
            InPoStack 퍼블릭 페이지
          </a>
        </li>
        <li>
          <a href={'https://inpostack.poapper.com/home/'}
             target={'_blank'} rel={'noreferrer'}>
            (구) InPoStack
          </a>
        </li>
      </ul>

      <OverviewBlock/>

      <RecentBlock/>
    </Layout>
  )
}

const Title = styled.h2`
  letter-spacing: -1px;
`
