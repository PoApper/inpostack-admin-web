import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'semantic-ui-react'

import Layout from '../../components/layout'
import StoreCreateModal from '../../components/store/StoreCreateModal'

const StoreIndexPage = (props) => {
  const [stores, setStores] = useState([])
  //const [ accounts, setAccounts ] = useState() - owner_uuid TODO: fix after api develope

  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store`,
        { withCredentials: true })
      setStores(res.data)
    } catch (err) {
      alert('가게들을 불러오는데 실패했습니다.')
      console.log(err)
    }
  })

  const store_type = props.storeMeta.store_type

  return (
    <Layout>
      <div>
        <h2>가게 관리</h2>
        <StoreCreateModal storeType={store_type}/>
        <Table textAlign={'center'} celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell width={4}>가게명</Table.HeaderCell>
              <Table.HeaderCell width={2}>타입</Table.HeaderCell>
              <Table.HeaderCell width={4}>위치</Table.HeaderCell>
              <Table.HeaderCell width={2}>등록일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              stores.map((store, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell>{idx + 1}</Table.Cell>
                    <Table.Cell>
                      <Link
                        href="/store/[store_name]"
                        as={`/store/${store.name}`}
                      >
                        {store.name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>{store.store_type}</Table.Cell>
                    <Table.Cell>{store.address1}</Table.Cell>
                    <Table.Cell>
                      {moment(store.created_at).format('YYYY-MM-DD HH:mm')}
                    </Table.Cell>
                  </Table.Row>
                )
              })
            }
          </Table.Body>
        </Table>
      </div>
    </Layout>
  )
}

StoreIndexPage.getInitialProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/store/meta`)
  const data = await res.json()

  return {
    storeMeta: data,
  }
}

export default StoreIndexPage