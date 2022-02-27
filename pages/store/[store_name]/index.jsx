import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button } from 'semantic-ui-react'

import Layout from '../../../components/layout'
import StoreInformation from '../../../components/store/StoreInformation'
import { Mobile, PC } from '../../../components/MediaQuery'
import StoreImageAddModal from '../../../components/store/StoreImageAddModal'

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
      {
        storeWithAll ? (
          <>
            <PC>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                AlignItems: 'flex-start',
              }}>
                <h2>{store_name}</h2>
                <Button.Group style={{ marginBottom: '9px' }}>
                  <StoreImageAddModal storeInfo={storeWithAll}/>
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

            {/* TODO: refactor legacy mobile view */}
            <Mobile>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                AlignItems: 'center',
                justifyContent: 'center',
              }}>
                <h2>{store_name}</h2>
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
