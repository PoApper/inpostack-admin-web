import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Message } from 'semantic-ui-react'

import Layout from '../../../components/layout'
import MenuGrid from '../../../components/menu/menuGrid'

const StoreMenuPage = () => {
  const router = useRouter()
  const [storeWithAll, setStoreWithAll] = useState()
  const storeName = router.query.store_name

  useEffect(() => {
    if (!storeName) return
    axios.get(
      `${process.env.NEXT_PUBLIC_API}/store/name/${storeName}?category=true&menu=true`).
      then((res) => setStoreWithAll(res.data)).
      catch((err) => alert('가게 정보를 불러오는데 실패했습니다.'))
  }, [storeName])

  return (
    <Layout>
      {
        storeWithAll ? (
          <>
            <Title>{storeName} 메뉴 수정</Title>
            <Message>
              메뉴 아래의 <b>수정</b> 버튼을 클릭해 메뉴 정보를 수정할 수 있습니다.
            </Message>
            <MenuGrid
              store_uuid={storeWithAll.uuid}
              categoriesWithMenu={storeWithAll.category}
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

export default StoreMenuPage

const Title = styled.h2`
  letter-spacing: -1px;
`