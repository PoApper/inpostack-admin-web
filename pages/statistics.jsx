import React from 'react'
import dynamic from 'next/dynamic'
import Layout from '../components/layout'
import { Divider } from 'semantic-ui-react'
const DRU_Line = dynamic(()=> import('../components/statistics/DRU_Line'), {ssr: false});
const DAU_Line = dynamic(()=> import('../components/statistics/DAU_Line'), {ssr: false});

const Statistics = () => {
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