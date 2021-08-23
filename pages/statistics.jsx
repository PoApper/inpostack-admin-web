import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../data/useUser'
import Layout from '../components/layout'

const Statistics = () => {
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
     <h3>통계 보기 페이지 준비 중 입니다.</h3>
   </Layout> 
  )
}

export default Statistics;