import React from 'react'

import { Grid, List, Segment } from 'semantic-ui-react'

const BuildOverview = () => {
  const getOverviewElement = ({ header, number }) => {
    return <Grid.Column>
      <Segment style={{boxShadow: 'none'}}>
        <List>
          <List.Item>
            <List.Header><h3>{header}</h3></List.Header>
            <p className={'main-indicators'} style={{fontSize: "35px"}}>{number}</p>
          </List.Item>
        </List>
      </Segment>
    </Grid.Column>
  }

  return (
    <Grid columns={4} divided>
      <Grid.Row stretched>
        {getOverviewElement({ header: '전체 사용자 수', number: 100 })}
        {getOverviewElement({ header: '전체 가게 수', number: 50 })}
        {getOverviewElement({ header: '전체 공지 수', number: 10 })}
        {getOverviewElement({ header: '전체 리뷰 수', number: 27})}
      </Grid.Row>
    </Grid>
  )
}

export default BuildOverview