import React, { useState } from 'react'
import { Header, Segment } from 'semantic-ui-react'
import styled from 'styled-components'

const StoreInformation = (props) => {
  const storeInfo = props.storeInfo
  const uuid = props.storeInfo.uuid

  const storeOptions = []
  // TODO: store/meta와 연동하는 부분 체크할 것
  // const StoreOptions = Object.entries(props.storeMeta.store_type).map((type) => {
  //   const [key, value] = type
  //   return { key: key, text: value, value: value }
  // })


  return (
      <div style={{display: 'flex', justifyContent:'space-between'}}>
      <Left>
      <Header as='h5' attached='top'>
        상호명
      </Header>
      <Segment attached>{storeInfo.name}</Segment>
      
      <Header as='h5' attached='top'>
        전화번호
      </Header>
      <Segment attached>{storeInfo.phone}</Segment>

      <Header as='h5' attached='top'>
        가게 소개
      </Header>
      <Segment attached>{storeInfo.description}</Segment>

      <Header as='h5' attached='top'>
        가게 타입
      </Header>
      <Segment attached>{storeInfo.storeType}</Segment>

      <Header as='h5' attached='top'>
        가게 주소
      </Header>
      <Segment attached>
        {storeInfo.address1} <br/>
        {storeInfo.address2}
      </Segment>

      <Header as='h5' attached='top'>
        오픈시간
      </Header>
      <Segment attached>{storeInfo.openTime}</Segment>

      <Header as='h5' attached='top'>
        닫는 시간
      </Header>
      <Segment attached>{storeInfo.closeTime}</Segment>

      {/*  TODO: API 안정화 후 적용
      <Header as='h5' attached='top'>
        점주 유저
      </Header>
      <Segment attached>{storeInfo.owner_uuid}</Segment>
      */}
      </Left>
      <Right>
        <label>가게 이미지</label>
        <img width={170} height={170}
                src={storeInfo.imageUrl}
                alt="store_photo"/>
      </Right>
      </div>
  )
}

// StoreUpdate.getInitialProps = async (context) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/store/meta`)
//   const data = await res.json()
//
//   return {
//     storeMeta: data,
//   }
// }

export default StoreInformation

const Left = styled.div`
  margin-right: 20px;
  flex: 1;
`
const Right = styled.div`
  width: 200px;
`