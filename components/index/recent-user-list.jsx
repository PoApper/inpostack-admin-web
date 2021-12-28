import axios from "axios";
import Link from "next/link";
import {Icon, Table} from "semantic-ui-react";
import moment from "moment";
import {useEffect, useState} from "react";
import styled from "styled-components";

const RecentUserList = () => {
  const [accounts, setAccounts] = useState([])

  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_API}/account?take=5`,
        {withCredentials: true})
      .then((res) => setAccounts(res.data))
      .catch((err) => alert('최근 접속 계정을 불러오는데 실패했습니다.'))
  }, [])

  return (
    <MainBox>
      <h2 style={{display: 'inline-block'}}>최근 접속 유저</h2>
      <Link href={'/account'}>
        <CheckButton>
          <span>Check</span><Icon name="arrow right"/>
        </CheckButton>
      </Link>

      <Table celled selectable style={{borderRadius: '14px'}}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>이름</Table.HeaderCell>
            <Table.HeaderCell>최근 접속</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {
            accounts.map((account, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell>{account.name}</Table.Cell>
                  <Table.Cell>
                    {moment(account.last_login_at).format('YYYY.MM.DD HH:mm')}
                  </Table.Cell>
                </Table.Row>
              )
            })
          }
        </Table.Body>
      </Table>
    </MainBox>
  )
}

export default RecentUserList

const MainBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }
`

const CheckButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  float: right;
  background-color: #265c71;
  color: #fff;
  border: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #32738b;
  }

  span {
    margin: 0 10px;
    font-weight: bold;
  }
`