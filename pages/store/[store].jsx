import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Divider, Message } from 'semantic-ui-react'

import Layout from '../../components/layout'
import MenuGrid from '../../components/menu/menuGrid'
import StoreUpdate from '../../components/store/StoreUpdate'


const StoreUpdatePage = () => {
  const router = useRouter()
  const [storeWithAll, setStoreWithAll] = useState()

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/name/${router.query.store}?category=true&menu=true`)
      setStoreWithAll(res.data)
    } catch (err) {
      alert('가게 정보를 불러오는데 실패했습니다.')
    }
  }, [router.query.store])

  console.log(storeWithAll)

  return (
    <Layout>
      {
        storeWithAll ? (
          <>
            <Title>{router.query.store} 정보 수정</Title>
            <StoreUpdate storeInfo={storeWithAll} />
            <Divider/>
            <Title>메뉴 정보 수정</Title>
            <Message>
              메뉴 아래의 <b>수정</b> 버튼을 클릭해 메뉴 정보를 수정할 수 있습니다.
            </Message>
            <MenuGrid categoriesWithMenu={storeWithAll.category}
                      store_uuid={storeWithAll.uuid}
            />
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

export default StoreUpdatePage

const Title = styled.h2`
  letter-spacing: -1px;
`