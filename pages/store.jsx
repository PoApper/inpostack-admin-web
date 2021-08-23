import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useStore from '../data/useStore'
import useUser from '../data/useUser'
//import useAccount from '../data/useAccount'
import Layout from '../components/layout'
import StoreUpdateModal from '../components/StoreUpdateModal'
import StoreCreateModal from '../components/StoreCreateModal'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const Store = (props) => {
  const router = useRouter()
  const { user, loading } = useUser()
  const { stores, isLoaded } = useStore()
  //const { accounts } = useAccount() - owner_uuid TODO: fix after api develope

  useEffect(() => {
    if (loading) return
    if (!user) {
      alert('관리자 계정으로 로그인해주세요!')
      router.push("/login")
      return
    }
  }, [loading])

  const store_type = props.storeMeta.store_type

  return (
    <Layout>
      { isLoaded ?
        <div>
        <h2>가게 관리</h2>
        <StoreCreateModal storeType={store_type}/>
        <Table textAlign={'center'} celled selectable color={'orange'}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell width={5}>가게명</Table.HeaderCell>
              <Table.HeaderCell width={3}>타입</Table.HeaderCell>
              <Table.HeaderCell width={4}>위치</Table.HeaderCell>
              <Table.HeaderCell width={3}>등록일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              stores.map((store, idx) => {
                return (
                  <StoreUpdateModal
                    key={idx}
                    storeType={store_type}
                    storeInfo={store}
                    //owners={owners}
                    trigger={
                      <Table.Row key={idx}>
                        <Table.Cell>{idx + 1}</Table.Cell>
                        <Table.Cell>{store.name}</Table.Cell>
                        <Table.Cell>{store.store_type}</Table.Cell>
                        <Table.Cell>{store.location}</Table.Cell>
                        <Table.Cell>{moment(store.created_at).
                          format('YYYY.MM.DD HH:mm')}</Table.Cell>
                      </Table.Row>
                    }
                  />
                )
              })
            }
          </Table.Body>
        </Table>
        </div>
        :
        <div/>
      }
    </Layout> 
  )
}

Store.getInitialProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/store/meta`)
  const data = await res.json()

  return {
    storeMeta: data,
  }
}

export default Store