import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'

import Layout from '../../../components/layout'
import StoreInformationBlock from '../../../components/store/StoreInformation'
import { Mobile, PC } from '../../../components/MediaQuery'
import StoreImageAddModal from '../../../components/store/StoreImageAddModal'
import StoreImageGrid from '../../../components/store/StoreImageGrid'
import StoreLogoAddModal from '../../../components/store/StoreLogoAddModal'

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
              <StoreIndexHeader>
                <div style={{ marginRight: 40 }}>
                  <Image
                    src={storeWithAll.image_url ??
                      'https://via.placeholder.com/160'}
                    alt={'store_logo'}
                    width={200}
                  />
                </div>

                <div style={{ width: '100%' }}>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}>
                    <h2 style={{ fontSize: 32 }}>
                      {store_name}
                    </h2>

                    <div>
                      <Button basic>
                        <Icon fitted color={'orange'}
                              name={'star'}/>
                        <span style={{ marginLeft: 4 }}>
                            {Number(storeWithAll.favorite_count).
                              toLocaleString()}
                          </span>
                      </Button>
                      <Button basic>
                        <Icon fitted color={'orange'}
                              name={'eye'}/>
                        <span style={{ marginLeft: 4 }}>
                            {Number(storeWithAll.visit_count).toLocaleString()}
                          </span>
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Button.Group style={{ marginBottom: '9px' }}>
                      <StoreLogoAddModal store_uuid={storeWithAll.uuid}/>
                      <StoreImageAddModal storeInfo={storeWithAll.uuid}/>
                      <Link href={`/store/${store_name}/information`} passHref>
                        <Button>정보 수정</Button>
                      </Link>
                      <Link href={`/store/${store_name}/menu`} passHref>
                        <Button>메뉴 수정</Button>
                      </Link>
                    </Button.Group>
                  </div>

                  <div>
                    가게 로고, 가게 이미지는 AWS CloudFront에 캐싱되기 때문에 사진 변경 후 몇 분 뒤에 반영됩니다!
                  </div>
                </div>
              </StoreIndexHeader>

              <StoreImageGrid
                store_uuid={storeWithAll.uuid}
              />

              <StoreInformationBlock storeInfo={storeWithAll}/>
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
              <StoreInformationBlock storeInfo={storeWithAll}/>
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

const StoreIndexHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`