import React from 'react'
import { Segment, Image } from 'semantic-ui-react'
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
      <div style={{display: 'flex', justifyContent:'space-between', marginTop: '20px'}}>
      <Left>
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment>
              <h5>상호명</h5>
              {storeInfo.name}
            </Segment>
            <Segment>
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
      </Left>
      <Right>
        <Image style={{width: 170, height: 170}}
               src={storeInfo.image_url ?? "https://via.placeholder.com/170"}
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