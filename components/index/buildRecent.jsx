import React from 'react'
import { Mobile, PC } from '../../components/MediaQuery.tsx'
import styled from 'styled-components'
import { Button, Grid, Icon, Table } from 'semantic-ui-react'

const BuildRecnt = () => {
  const buildRecentOverview = ({ title, body }) => {
    return (
      <Grid.Column>
        <MainBox>
        <h2 style={{display: "inline-block"}}>{title}</h2>
        <CheckButton><span>Check</span><Icon name="arrow right"/></CheckButton>
        <Table celled selectable style={{borderRadius: '14px'}}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>가게 명</Table.HeaderCell>
              <Table.HeaderCell>메뉴 수</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{body}</Table.Body>
        </Table>
        </MainBox>
      </Grid.Column>
    )
  }

  const buildNewRestaurants = () => {
    const newRestaurants = [
      { name: '참서리', count: 4 },
      { name: '훈이네 밥집', count: 5 },
      { name: '마라공방', count: 6 }]
    return getRecentTableRow(newRestaurants)
  }

  const buildRecentUsers = () => {
    const recentUsers = [
      { name: '참서리', count: 4 },
      { name: '훈이네 밥집', count: 5 },
      { name: '마라공방', count: 6 }]
    return getRecentTableRow(recentUsers)
  }

  const getRecentTableRow = (list) => {
    return list.map((d) =>
      <Table.Row key={d}>
        <Table.Cell>{d.name}</Table.Cell>
        <Table.Cell>{d.count}</Table.Cell>
      </Table.Row>)
  }

  return(
    <div>
      <PC>
        <Grid columns={2} style={{marginTop: '40px'}}>
        <Grid.Row>
          {buildRecentOverview(
            { title: '신규 가게', body: buildNewRestaurants() })}
          {buildRecentOverview(
            { title: '최근 접속 유저', body: buildRecentUsers() })}
        </Grid.Row>
        </Grid>
      </PC>
      <Mobile>
      <Grid columns={1} style={{marginTop: '40px'}}>
        <Grid.Row>
          {buildRecentOverview(
            { title: '신규 가게', body: buildNewRestaurants() })}
        </Grid.Row>
        <Grid.Row>
          {buildRecentOverview(
            { title: '최근 접속 유저', body: buildRecentUsers() })}
        </Grid.Row>
        </Grid>
      </Mobile>
    </div>
  )
}

export default BuildRecnt

const MainBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;
  &:hover {
    transform: translateY(-5px) ease-in-out;
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
  border: 0px;
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