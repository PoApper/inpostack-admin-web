import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Divider, Image, List } from 'semantic-ui-react'
// import StoreMap from './storeMap';
import axios from 'axios'
import { isBlurry } from '../../utils/blurry-check'
import StoreOpeningHours from './StoreOpeningHours'

const StoreInfoDiv = ({ storeInfo }) => {
  const uuid = storeInfo.uuid

  const [storeImageLinkList, setStoreImageLinkList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${uuid}`).
      then(res => setStoreImageLinkList(res.data)).
      catch((err) => console.log(err))
  }, [uuid])

  return (
    <div style={{marginBottom: 16}}>
      <StoreImageGrid>
        {
          storeImageLinkList.map(link => {
            return (
              <StoreImageDiv key={link}>
                <Image
                  rounded
                  src={link ??
                    'https://via.placeholder.com/200?text=InPoStack'}
                  alt={'food_img'}
                  style={{width:"100%", height:"100%", objectFit: "cover"}}
                />
              </StoreImageDiv>
            )
          })
        }
      </StoreImageGrid>

      <Divider/>

      <List>
        <List.Item>
          <List.Icon name={'call'} />
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
          <List.Icon name={'home'} />
          <List.Content>
          {
            isBlurry(storeInfo.address1) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              storeInfo.naver_map_url ? (
                <a href={storeInfo.naver_map_url} target={'_blank'}
                   rel={'noreferrer'}>
                  {storeInfo.address1} {storeInfo.address2}
                  <span style={{color: 'gray', marginLeft: 8}}>
                    (우) {storeInfo.zipcode}
                  </span>
                </a>
              ) : (
                <span>
                  {storeInfo.address1} {storeInfo.address2}
                  <span style={{color: 'gray', marginLeft: 8}}>
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

const StoreImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }

  margin-left: -10px;
  margin-right: -10px;
`

const StoreImageDiv = styled.div`
  padding: 10px;
  height: 250px;
  border-radius: 5px;
`
