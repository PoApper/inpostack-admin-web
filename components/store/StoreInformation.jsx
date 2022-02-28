import React, { useEffect, useState } from 'react'
import { Image, Segment } from 'semantic-ui-react'
import { Mobile, PC } from '../MediaQuery'
import axios from 'axios'
import styled from 'styled-components'

const StoreInformation = ({ storeInfo }) => {
  const uuid = storeInfo.uuid
  const [storeImageLinkList, setStoreImageLinkList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${uuid}`).
      then(res => setStoreImageLinkList(res.data)).
      catch((err) => console.log(err))
  }, [uuid])

  return (
    <>
      <PC>
        <StoreImageGrid>
          {
            storeImageLinkList.map(link => {
              return (
                <div key={link}>
                  <Image style={{ width: 170, height: 170, borderRadius: '5px' }}
                         alt={'store_photo'}
                         src={link ?? 'https://via.placeholder.com/170'}/>
                </div>
              )
            })
          }
        </StoreImageGrid>
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment style={{ flex: 1 }}>
              <h5>상호명</h5>
              {storeInfo.name}
            </Segment>
            <Segment style={{ flex: 1 }}>
              <h5>전화번호</h5>
              {storeInfo.phone}
            </Segment>
          </Segment.Group>
          <Segment>
            <h5>가게 주소</h5>
            {storeInfo.address1} <br/>
            {storeInfo.address2} <br/>
            (우) {storeInfo.zipcode}
          </Segment>
          <Segment.Group horizontal>
            <Segment>
              <h5>여는 시간</h5>
              {storeInfo.open_time}
            </Segment>
            <Segment>
              <h5>닫는 시간</h5>
              {storeInfo.close_time}
            </Segment>
          </Segment.Group>
          <Segment>
            <h5>가게 소개</h5>
            {storeInfo.description}
          </Segment>
          <Segment>
            <h5>가게 타입</h5>
            {storeInfo.store_type}
          </Segment>
        </Segment.Group>
      </PC>

      {/* TODO: refactor legacy mobile view */}
      {/* TODO: show four(4) store image! using `storeImageLinkList` state */}
      <Mobile>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}>
          <Image style={{ width: 170, height: 170, borderRadius: '5px' }}
                 src={storeInfo.image_url
                   ? storeInfo.image_url
                   : 'https://via.placeholder.com/170'}
                 alt="store_photo"/>
          <Segment.Group>
            <Segment.Group horizontal>
              <Segment style={{ flex: 1 }}>
                <h5>상호명</h5>
                {storeInfo.name}
              </Segment>
              <Segment style={{ flex: 1 }}>
                <h5>전화번호</h5>
                {storeInfo.phone}
              </Segment>
            </Segment.Group>
            <Segment>
              <h5>가게 주소</h5>
              {storeInfo.address1} <br/>
              {storeInfo.address2}
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <h5>여는 시간</h5>
                {storeInfo.open_time}
              </Segment>
              <Segment>
                <h5>닫는 시간</h5>
                {storeInfo.close_time}
              </Segment>
            </Segment.Group>
            <Segment>
              <h5>가게 소개</h5>
              {storeInfo.description}
            </Segment>
            <Segment>
              <h5>가게 타입</h5>
              {storeInfo.store_type}
            </Segment>
          </Segment.Group>
        </div>
      </Mobile>
    </>
  )
}

export default StoreInformation

const StoreImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  margin-left: -10px;
  margin-right: -10px;
`