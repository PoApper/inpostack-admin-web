import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../data/useUser'
import Layout from '../components/layout'
//import useNotices from '../data/useNotice'
//import useNoticemeta from '../data/useNotice'
import { Table } from 'semantic-ui-react'

const Notice = () => {
  const router = useRouter()
  const { user, loading } = useUser()
  //const { notices } = useNotices()
  //const { noticemeta, isLoaded } = useNoticemeta()

  useEffect(() => {
    if (loading) return
    if (!user) {
      alert('관리자 계정으로 로그인해주세요!')
      router.push("/login")
      return
    }

  }, [loading])

  async function handleUpdate (e) {
    e.preventDefault()
  }

  return(
    <Layout>
      공지관리페이지
    </Layout>
  )
}

export default Notice;