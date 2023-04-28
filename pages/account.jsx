import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { Table } from 'semantic-ui-react'

import Layout from '../components/layout'
import AccountUpdateModal from '../components/account/AccountUpdateModal'
import AccountCreateModal from '../components/account/AccountCreateModal'

const Account = (props) => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/account`,
      { withCredentials: true }).
      then(res => {
        setAccounts(res.data)
      }).
      catch((err) => {
        const errMsg = err.response.data.message;
        alert(`계정 정보를 불러오는데 실패했습니다.\n${errMsg}`);
      })
  }, [])

  const account_types = props.accountMeta.account_type

  return (
    <Layout>
      <div>
        <h2>계정 관리</h2>
        <AccountCreateModal accountType={account_types}/>
        <Table textAlign="center" celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1}>#</Table.HeaderCell>
              <Table.HeaderCell>이름</Table.HeaderCell>
              <Table.HeaderCell>계정 타입</Table.HeaderCell>
              <Table.HeaderCell>마지막 로그인</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{
            accounts.map((account, idx) => {
              return <AccountUpdateModal
                key={idx}
                accountType={account_types}
                accountInfo={account}
                trigger={
                  <Table.Row>
                    <Table.Cell>{idx + 1}</Table.Cell>
                    <Table.Cell>{account.name}</Table.Cell>
                    <Table.Cell>{account.account_type}</Table.Cell>
                    <Table.Cell>
                      {moment(account.last_login_at).format('YYYY.MM.DD HH:mm')}
                    </Table.Cell>
                  </Table.Row>
                }/>
            })}
          </Table.Body>
        </Table>
      </div>
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