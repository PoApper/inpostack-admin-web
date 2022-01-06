import React from 'react'
import Layout from '../components/layout'
import { Divider } from 'semantic-ui-react'
import DRU_Line from '../components/statistics/DRU_Line'
import DAU_Line from '../components/statistics/DAU_Line'

const Statistics = () => {
  // TODO: migration to @nivo chart library
  return (
    <Layout>
      <h2>InPoStack 통계</h2>
      <p>InPoStack의 현황을 통계로 확인하세요.</p>

      <Divider/>

      <DRU_Line/>

      <Divider/>

      <DAU_Line/>

    </Layout>
  )
}

export default Statistics