import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import moment from 'moment'
import { Table, Dropdown } from 'semantic-ui-react'

import Layout from '../../components/layout'
import StoreCreateModal from '../../components/store/StoreCreateModal'

const StoreIndexPage = () => {
  const [stores, setStores] = useState([])
  const [order, setOrder] = useState('visit')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/store`,
      { withCredentials: true }).
      then((res) => {
        setStores(res.data)
      }).
      catch((err) => {
        alert('가게들을 불러오는데 실패했습니다.')
        console.log(err)
      })
  }, [])

  return (
    <Layout>
      <div>
        <h2>가게 관리</h2>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <StoreCreateModal />
          <Dropdown selection placeholder='방문자순'
                    options={[{key:'name', text:'이름순', value:'name'}, {key:'visit', text:'방문자순', value:'visit'}]}
                    onChange={(e, {value}) => setOrder(value?.toString())}
                    style={{marginBottom: '10px'}}
                    value={order}
                    />
        </div>
        <Table textAlign={'center'} celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell width={3}>가게명</Table.HeaderCell>
              <Table.HeaderCell width={2}>타입</Table.HeaderCell>
              <Table.HeaderCell width={5}>주소</Table.HeaderCell>
              <Table.HeaderCell width={2}>등록일</Table.HeaderCell>
              <Table.HeaderCell width={1}>조회수</Table.HeaderCell>
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
                        href={"/store/[store_name]"}
                        as={`/store/${store.name}`}
                        passHref
                      >
                        {store.name}
                      </Link>
                    </Table.Cell>
                    <Table.Cell>
                      {store.store_type}
                    </Table.Cell>
                    <Table.Cell>
                      {
                        store.naver_map_url ? (
                          <a href={store.naver_map_url}>
                            {store.address1}
                          </a>
                        ) : (
                          <span>
                             {store.address1}
                          </span>
                        )
                      }
                    </Table.Cell>
                    <Table.Cell>
                      {moment(store.created_at).format('YYYY-MM-DD HH:mm')}
                    </Table.Cell>
                    <Table.Cell>
                      {Number(store.visit_count).toLocaleString()}
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

export default StoreIndexPage