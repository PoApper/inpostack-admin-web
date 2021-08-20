import React from 'react'
import { Button, Grid, Icon, List, Segment, Table } from 'semantic-ui-react'

const BuildRecnt = () => {
  const buildRecentOverview = ({ title, body }) => {
    return (
      <Grid.Column>
        <h2 style={{display: "inline-block"}}>{title}</h2>
        <Button color="yellow" style={{float: "right"}}>Check<Icon name="arrow right"/></Button>
        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>가게 명</Table.HeaderCell>
              <Table.HeaderCell>메뉴 수</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{body}</Table.Body>
        </Table>
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
    <Grid columns={2} divided>
      <Grid.Row>
        {buildRecentOverview(
          { title: '신규 가게', body: buildNewRestaurants() })}
        {buildRecentOverview(
          { title: '최근 접속 유저', body: buildRecentUsers() })}
      </Grid.Row>
    </Grid>
  )
}

export default BuildRecnt
