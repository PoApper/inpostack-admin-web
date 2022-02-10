import React from 'react'
import { Mobile, PC, Tablet } from '../MediaQuery'
import { Grid } from 'semantic-ui-react'

import RecentUserList from "./recent-user-list";
import RecentStoreList from "./recent-store-list";

const RecentBlock = () => {
  return (
    <div>
      <PC>
        <Grid columns={2} style={{ marginTop: '40px' }}>
          <Grid.Row>
            <Grid.Column>
              <RecentStoreList/>
            </Grid.Column>
            <Grid.Column>
              <RecentUserList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </PC>
      <Tablet>
        <Grid columns={2} style={{ marginTop: '40px' }}>
          <Grid.Row>
            <Grid.Column>
              <RecentStoreList/>
            </Grid.Column>
            <Grid.Column>
              <RecentUserList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Tablet>
      <Mobile>
        <Grid columns={1} style={{ marginTop: '40px' }}>
          <Grid.Row>
            <Grid.Column>
              <RecentUserList/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <RecentStoreList/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Mobile>
    </div>
  )
}

export default RecentBlock