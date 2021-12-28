import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mobile, PC } from '../MediaQuery'
import styled from 'styled-components'
import { Grid, Icon } from 'semantic-ui-react'
import axios from 'axios'

const OverviewBlock = () => {
  const [overview, setOverview] = useState({})

  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/overview`)
      setOverview(res.data)
    } catch (err) {
      alert('Overview를 불러오는데 실패했습니다.')
      console.log(err)
    }
  }, [])

  const getOverviewElement = ({ header, number, link }) => {
    return (
      <MainBox>
        <h3>{header}</h3>
        <p>{number}</p>
        <div
          style={{ gridArea: 'blank', width: '80px', margin: 0, padding: 0 }}/>
        <Link href={link}>
          <div style={{
            gridArea: 'whole',
            margin: '-24px -25px -24px',
            padding: '55px 0 0',
            backgroundColor: '#265c71',
            color: '#fff',
            textAlign: 'center',
            cursor: 'pointer',
          }}>
            <Icon name="arrow right"/>
          </div>
        </Link>
      </MainBox>
    )
  }

  return (
    <div>
      <PC>
        <Grid columns={4} style={{ marginTop: '30px' }}>
          <Grid.Row stretched>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 사용자 수',
                number: overview['account_count'],
                link: '/account',
              })}
            </Grid.Column>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 가게 수',
                number: overview['store_count'],
                link: '/store',
              })}
            </Grid.Column>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 공지 수',
                number: overview['notice_count'],
                link: '/notice',
              })}
            </Grid.Column>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 리뷰 수',
                number: overview['review_count'],
                link: '/review',
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PC>
      <Mobile>
        <Grid columns={1} style={{ marginTop: '30px' }}>
          <Grid.Row stretched>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 사용자 수',
                number: overview['account_count'],
                link: '/account',
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 가게 수',
                number: overview['store_count'],
                link: '/store',
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 공지 수',
                number: overview['notice_count'],
                link: '/notice',
              })}
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              {getOverviewElement({
                header: '전체 리뷰 수',
                number: overview['review_count'],
                link: '/review',
              })}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Mobile>
    </div>
  )
}

export default OverviewBlock

const MainBox = styled.div`
  display: grid;
  grid-template-areas:
		"header blank whole"
		"number blank whole";
  overflow: hidden;

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
    grid-area: header;
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }

  p {
    grid-area: number;
    font-size: 35px;
    margin: auto;
    text-align: center;
  }

  h3 {
    text-align: right;
  }
`