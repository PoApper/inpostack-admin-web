import React from 'react'
import { Divider, List } from 'semantic-ui-react'
// import StoreMap from './storeMap';
import { isBlurry } from '../../utils/blurry-check'
import StoreOpeningHours from './StoreOpeningHours'
import StoreImageGrid from './StoreImageGrid'

const StoreInfoDiv = ({ storeInfo }) => {
  const uuid = storeInfo.uuid

  return (
    <div style={{ marginBottom: 16 }}>

      <StoreImageGrid store_uuid={uuid}/>

      <Divider/>

      <List>
        <List.Item>
          <List.Icon name={'call'}/>
          <List.Content>
            {
              isBlurry(storeInfo.phone) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                <span> {storeInfo.phone}</span>
              )
            }
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name={'home'}/>
          <List.Content>
            {
              isBlurry(storeInfo.address1) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                storeInfo.naver_map_url ? (
                  <a href={storeInfo.naver_map_url} target={'_blank'}
                     rel={'noreferrer'}>
                    {storeInfo.address1} {storeInfo.address2}
                    <span style={{ color: 'gray', marginLeft: 8 }}>
                    (우) {storeInfo.zipcode}
                  </span>
                  </a>
                ) : (
                  <span>
                  {storeInfo.address1} {storeInfo.address2}
                    <span style={{ color: 'gray', marginLeft: 8 }}>
                    (우) {storeInfo.zipcode}
                  </span>
                </span>
                )
              )
            }
          </List.Content>
          {/* TODO: 클릭하면 펼쳐보이게 */}
          {/*<StoreMap address1={storeInfo.address1} />*/}
        </List.Item>
        <List.Item>
          <List.Icon name={'clock'}/>
          <List.Content>
            {
              isBlurry(storeInfo.opening_hours) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                <StoreOpeningHours
                  openingHours={storeInfo.opening_hours}
                />
              )
            }
          </List.Content>
        </List.Item>

        <Divider/>

        <p>
          {
            isBlurry(storeInfo.description) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              <span>
                {storeInfo.description}
              </span>
            )
          }
        </p>
      </List>
    </div>
  )
}

export default StoreInfoDiv
