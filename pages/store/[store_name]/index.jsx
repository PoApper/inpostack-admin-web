import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import Layout from '../../../components/layout'
import Head from 'next/head'
import StoreInfoDiv from '../../../components/store/storeInfoDiv'
import StoreIndexHeader from '../../../components/store/storeIndexHeader'
import MenuGrid from '../../../components/menu/menuGrid'
import ReviewList from '../../../components/review/reviewList'
import { Divider } from 'semantic-ui-react'

const StorePage = () => {
  const router = useRouter()
  const { store_name } = router.query
  const [storeWithAll, setStoreWithAll] = useState()

  useEffect(() => {
    if (!store_name) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/store/name/${store_name}?category=true&menu=true`,
        {withCredentials: true})
      .then(res => setStoreWithAll(res.data))
      .catch((err) => {
        const errMsg = err.response.data.message;
        alert(`가게 정보를 불러오는데 실패했습니다.\n${errMsg}`);
      })
  }, [store_name])

  return (
    <Layout>
      <Head>
        <title>{store_name} | InPoStack</title>
      </Head>
      {
        storeWithAll ? (
          <>
            <StoreIndexHeader storeWithAll={storeWithAll} store_name={store_name} />

            <StoreInfoDiv storeInfo={storeWithAll}/>

            <MenuGrid
                storeUuid={storeWithAll.uuid}
                categoriesWithMenu={storeWithAll.category}
            />

            <Divider/>

            <ReviewList store_uuid={storeWithAll.uuid}/>
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

export default StorePage
