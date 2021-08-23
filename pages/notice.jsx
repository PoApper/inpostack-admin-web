import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../data/useUser'
import useNotices from '../data/useNotice'
import Layout from '../components/layout'
import NoticeUpdateModal from '../components/NoticeUpdateModal'
import NoticeCreateModal from '../components/NoticeCreateModal'
import { Table } from 'semantic-ui-react'
import moment from 'moment'


const Notice = (props) => {
  const router = useRouter()
  const { user, loading } = useUser()
  const { notices, isLoaded } = useNotices()

  useEffect(() => {
    if (loading) return
    if (!user) {
      alert('관리자 계정으로 로그인해주세요!')
      router.push("/login")
      return
    }

  }, [loading])

  const notice_type = props.noticeMeta.notice_type

  return(
    <Layout>
      { isLoaded ?
        <div>
          <h2>공지 관리</h2>
          <NoticeCreateModal noticeType={notice_type}/>
          <Table textAlign='center' celled selectable color='orange'>
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
                          <Table.Cell>{moment(notice.updated_at).format("YYYY.MM.DD HH:mm")}</Table.Cell>
                        </Table.Row>
                      }
                    />
                  );
                })
              }
            </Table.Body>
          </Table>
        </div>
        : null
      }
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