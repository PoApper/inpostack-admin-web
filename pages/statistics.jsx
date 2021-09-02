import React from 'react'
import Layout from '../components/layout'
import { Divider } from 'semantic-ui-react'
import DRU_Line from '../components/statistics/DRU_Line'

const Statistics = () => {
  return (
    <Layout>
      <h2>InPoStack 통계</h2>
      <p>InPoStack의 현황을 통계로 확인하세요.</p>

      <Divider/>

      <DRU_Line/>
    </Layout>
  )
}

export default Statistics