import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Button } from 'semantic-ui-react'

import Layout from '../../../components/layout'
import StoreInformation from '../../../components/store/StoreInformation'
import { Mobile, PC, Tablet } from '../../../components/MediaQuery'

const StoreUpdatePage = () => {
  const router = useRouter()
  const [storeWithAll, setStoreWithAll] = useState()
  const store_name = router.query.store_name

  useEffect(() => {
    if (!store_name) return

    axios.get(
      `${process.env.NEXT_PUBLIC_API}/store/name/${store_name}?category=true&menu=true`).
      then((res) => {
        setStoreWithAll(res.data)
      }).
      catch(err => {
        alert('가게 정보를 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [store_name])

  return (
    <Layout>
      {/* TODO: Just show static view, not show update <form> */}
      {/* TODO: Make button to go `/store/[store_name]/information` and `/store/[store_name]/menu` */}
      {
        storeWithAll ? (
          <>
            <PC>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: '220px',
                AlignItems: 'flex-start',
              }}>
                <Title>{store_name}</Title>
                <Button.Group style={{ marginBottom: '9px' }}>
                  <Link href={`/store/${store_name}/information`} passHref>
                    <Button>정보 수정</Button>
                  </Link>
                  <Link href={`/store/${store_name}/menu`} passHref>
                    <Button>메뉴 수정</Button>
                  </Link>
                </Button.Group>
              </div>
              <StoreInformation storeInfo={storeWithAll}/>
            </PC>
            <Tablet>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: '220px',
                AlignItems: 'flex-start',
              }}>
                <Title>{store_name}</Title>
                <Button.Group style={{ marginBottom: '9px' }}>
                  <Link href={`/store/${store_name}/information`} passHref>
                    <Button>정보 수정</Button>
                  </Link>
                  <Link href={`/store/${store_name}/menu`} passHref>
                    <Button>메뉴 수정</Button>
                  </Link>
                </Button.Group>
              </div>
              <StoreInformation storeInfo={storeWithAll}/>
            </Tablet>
            <Mobile>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                AlignItems: 'center',
                justifyContent: 'center',
              }}>
                <Title>{store_name}</Title>
                <Button.Group style={{ marginBottom: '9px' }}>
                  <Link href={`/store/${store_name}/information`} passHref>
                    <Button>정보 수정</Button>
                  </Link>
                  <Link href={`/store/${store_name}/menu`} passHref>
                    <Button>메뉴 수정</Button>
                  </Link>
                </Button.Group>
              </div>
              <StoreInformation storeInfo={storeWithAll}/>
            </Mobile>
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