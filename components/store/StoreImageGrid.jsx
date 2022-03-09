import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'

const StoreImageGrid = ({ store_uuid }) => {
  const [storeImageLinkList, setStoreImageLinkList] = useState([])

  useEffect(() => {
    if (!store_uuid) return

    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${store_uuid}`).
      then(res => setStoreImageLinkList(res.data)).
      catch((err) => console.log(err))
  }, [store_uuid])

  return (
    <StoreImageDiv>
      {
        storeImageLinkList.length ? (
          storeImageLinkList.map(link => {
            return (
              <div key={link} style={{height: 250, borderRadius: '5px', overflow: 'hidden', margin: '5px'}}>
                <Image style={{width:"100%", height:"100%", objectFit: "cover"}}
                       alt={'store_photo'}
                       src={link ?? 'https://via.placeholder.com/240'}/>
              </div>
            )
          })
        ) : (
          <h3>
            등록된 이미지가 없습니다.
          </h3>
        )
      }
    </StoreImageDiv>
  )
}

export default StoreImageGrid

const StoreImageDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }
`
