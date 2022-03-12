import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Divider, Icon, Image } from 'semantic-ui-react'
// import StoreMap from './storeMap';
import axios from 'axios'
import { isBlurry } from '../../utils/blurry-check'

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

      <div>
        <p>
          <Icon name={'call'}/>
          {
            isBlurry(storeInfo.phone) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              <span> {storeInfo.phone}</span>
            )
          }
        </p>
        <p>
          <Icon name={'home'}/>
          {
            isBlurry(storeInfo.address1) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              storeInfo.naver_map_url ? (
                <a href={storeInfo.naver_map_url} target={'_blank'}
                   rel={'noreferrer'}>
                  {storeInfo.address1} {storeInfo.address2}
                </a>
              ) : (
                <span>
                  {storeInfo.address1} {storeInfo.address2}
                </span>
              )
            )
          }

          {/* TODO: 클릭하면 펼쳐보이게 */}
          {/*<StoreMap address1={storeInfo.address1} />*/}
        </p>
        <p>
          <Icon name={'clock'}/>
          {
            isBlurry(storeInfo.open_time) || isBlurry(storeInfo.close_time) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              <span>{storeInfo.open_time} ~ {storeInfo.close_time}</span>
            )
          }
        </p>
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
      </div>
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