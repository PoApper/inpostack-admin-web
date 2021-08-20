import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../data/useUser'
import Layout from '../components/layout'

const Account = () => {
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

  async function handleUpdate (e) {
    e.preventDefault()
  }
  
  return(
    <Layout>
      계정관리
    </Layout>
  )
}

export default Account;