import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'

import Layout from '../../../components/layout'
import StoreUpdate from '../../../components/store/StoreUpdate'

const StoreInformationPage = () => {
  const router = useRouter()
  const [storeWithAll, setStoreWithAll] = useState()
  const store_name = router.query.store_name;

  useEffect(async () => {
    if (!store_name) return
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/name/${store_name}?category=true&menu=true`)
      setStoreWithAll(res.data)
    } catch (err) {
      alert('가게 정보를 불러오는데 실패했습니다.')
    }
  }, [store_name])

  return (
    <Layout>
      {
        storeWithAll ? (
          <>
            <Title>{store_name} 정보 수정</Title>
            <StoreUpdate storeInfo={storeWithAll}/>
          </>
        ) : (
          <>
            <h1>해당 가게는 존재하지 않습니다.</h1>
          </>
        )
      }
    </Layout>
  )
}

export default StoreInformationPage

const Title = styled.h2`
  letter-spacing: -1px;
`