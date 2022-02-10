import React, { useEffect, useState } from 'react'
import { Mobile, PC, Pad } from '../MediaQuery'
import { Grid } from 'semantic-ui-react'
import axios from 'axios'

import OverviewBox from "./overview-box";

const OverviewBlock = () => {
  const [overview, setOverview] = useState({})

  useEffect(() => {
   axios
     .get(`${process.env.NEXT_PUBLIC_API}/overview`)
     .then((res) => setOverview(res.data))
     .catch((err) => alert('Overview를 불러오는데 실패했습니다.'))
  }, [])

  return (
    <div>
      <PC>
        <Grid columns={4} style={{ marginTop: '30px' }}>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 사용자 수'}
                number={overview['account_count']}
                link={'/account'}
              />
            </Grid.Column>
            <Grid.Column>
              <OverviewBox
                header={'전체 가게 수'}
                number={overview['store_count']}
                link={'/store'}
              />
            </Grid.Column>
            <Grid.Column>
              <OverviewBox
                header={'전체 공지 수'}
                number={overview['notice_count']}
                link={'/notice'}
              />
            </Grid.Column>
            <Grid.Column>
              <OverviewBox
                header={'전체 리뷰 수'}
                number={overview['review_count']}
                link={'/review'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PC>
      <Pad>
        <Grid columns={2} style={{ marginTop: '30px' }}>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 사용자 수'}
                number={overview['account_count']}
                link={'/account'}
              />
            </Grid.Column>
            <Grid.Column>
              <OverviewBox
                header={'전체 가게 수'}
                number={overview['store_count']}
                link={'/store'}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 공지 수'}
                number={overview['notice_count']}
                link={'/notice'}
              />
            </Grid.Column>
            <Grid.Column>
              <OverviewBox
                header={'전체 리뷰 수'}
                number={overview['review_count']}
                link={'/review'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Pad>
      <Mobile>
        <Grid columns={1} style={{ marginTop: '30px' }}>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 사용자 수'}
                number={overview['account_count']}
                link={'/account'}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 가게 수'}
                number={overview['store_count']}
                link={'/store'}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 공지 수'}
                number={overview['notice_count']}
                link={'/notice'}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row stretched>
            <Grid.Column>
              <OverviewBox
                header={'전체 리뷰 수'}
                number={overview['review_count']}
                link={'/review'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Mobile>
    </div>
  )
}

export default OverviewBlock