import React from 'react'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'
import moment from 'moment'

const BuildOverview = () => {
  const getOverviewElement = ({ header, number }) => {
    return <Grid.Column>
      <MainBox>
        <h3>{header}</h3>
        <p>{number}</p>
        <h6>{moment().format('YYYY.MM.DD hh:mm a')}</h6>
      </MainBox>
    </Grid.Column>
  }

  return (
    <Grid columns={4} style={{marginTop: '30px'}}>
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
  h6 {
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }
  p {
    font-size: 35px;
    //float: right;
    margin: auto;
  }
`