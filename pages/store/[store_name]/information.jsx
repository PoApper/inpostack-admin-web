import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'

import Layout from '../../../components/layout'
import StoreUpdate from '../../../components/store/StoreUpdate'

const StoreInformationPage = () => {
  const router = useRouter()
  const [storeWithAll, setStoreWithAll] = useState()
  const storeName = router.query.store_name;

  useEffect(() => {
    if (!storeName) return
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/store/name/${storeName}?category=true&menu=true`)
      .then((res) => setStoreWithAll(res.data))
      .catch((err) => alert('가게 정보를 불러오는데 실패했습니다.'))
  }, [storeName])

  return (
    <Layout>
      {
        storeWithAll ? (
          <>
            <Title>{storeName} 정보 수정</Title>
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