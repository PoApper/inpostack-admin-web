import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import useUser from '../data/useUser'
import Layout from '../components/layout'
import useAccount from '../data/useAccount'
import AccountUpdateModal from '../components/account/AccountUpdateModal'
import AccountCreateModal from '../components/account/AccountCreateModal'
import { Table } from 'semantic-ui-react'
import moment from 'moment'

const Account = ( props ) => {
  const router = useRouter()
  const { user, loading } = useUser()
  const { isLoaded, accounts } = useAccount()
  
  useEffect(() => {
    if (loading) return
    if (!user) {
      alert('관리자 계정으로 로그인해주세요!')
      router.push("/login")
      return
    }
  }, [loading])
  
  const account_types = props.accountMeta.account_type

  return(
    <Layout>
      { isLoaded ?
        <div>
          <h2>계정 관리</h2>

          <AccountCreateModal accountType={account_types}/>
          <Table textAlign='center' celled selectable color='orange'>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={1}>#</Table.HeaderCell>
                <Table.HeaderCell>이름</Table.HeaderCell>
                <Table.HeaderCell>계정 타입</Table.HeaderCell>
                <Table.HeaderCell>마지막 로그인</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{
              accounts && accounts.map((account, idx) => {
                return <AccountUpdateModal
                  key={idx}
                  accountType={account_types}
                  accountInfo={account}
                  trigger={
                    <Table.Row>
                      <Table.Cell>{idx + 1}</Table.Cell>
                      <Table.Cell>{account.name}</Table.Cell>
                      <Table.Cell>{account.account_type}</Table.Cell>
                      <Table.Cell>{moment(account.lastLoginAt).format("YYYY.MM.DD HH:mm")}</Table.Cell>
                    </Table.Row>
                  }/>
              })}
            </Table.Body>
          </Table>
        </div>
        : null
      }
    </Layout>
  )
}

Account.getInitialProps = async (context) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/account/meta`)
  const data = await res.json()

  return {
    accountMeta: data,
  }
}

export default Account