import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../data/useUser'
import Layout from '../components/layout'

const Store = () => {
  const router = useRouter()
  const { user, loading } = useUser()

  useEffect(() => {
    if (loading) return
    if (!user) {
      alert('관리자 계정으로 로그인해주세요!')
      router.push("/login")
      return
    }
  }, [loading])

  return (
    <Layout>
      가게관리페이지
    </Layout> 
  )
}

export default Store