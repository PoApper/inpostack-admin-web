import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'semantic-ui-react'

import Layout from '../components/layout'
import NoticeUpdateModal from '../components/notice/NoticeUpdateModal'
import NoticeCreateModal from '../components/notice/NoticeCreateModal'

const Notice = (props) => {
  const [notices, setNotices] = useState([])

  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/notice`,
        { withCredentials: true })
      setNotices(res.data)
    } catch (err) {
      alert(`공지를 불러오는데 실패했습니다.`)
      console.log(err)
    }
  }, [])

  const notice_type = props.noticeMeta.notice_type

  return (
    <Layout>
      <div>
        <h2>공지 관리</h2>
        <NoticeCreateModal noticeType={notice_type}/>
        <Table textAlign="center" celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell>제목</Table.HeaderCell>
              <Table.HeaderCell width={3}>타입</Table.HeaderCell>
              <Table.HeaderCell width={3}>생성일</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              notices.map((notice, idx) => {
                return (
                  <NoticeUpdateModal
                    key={idx}
                    noticeType={notice_type}
                    noticeInfo={notice}
                    trigger={
                      <Table.Row>
                        <Table.Cell>{idx + 1}</Table.Cell>
                        <Table.Cell>{notice.title}</Table.Cell>
                        <Table.Cell>{notice.notice_type}</Table.Cell>
                        <Table.Cell>{moment(notice.updated_at).
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
    </Layout>
  )
}

Notice.getInitialProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/notice/meta`)
  const data = await res.json()

  return {
    noticeMeta: data,
  }
}

export default Notice