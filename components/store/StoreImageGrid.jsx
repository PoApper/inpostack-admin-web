import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'

const StoreImageGrid = ({ store_uuid }) => {
  const [storeImageLinkList, setStoreImageLinkList] = useState()

  useEffect(() => {
    if (!store_uuid) return

    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${store_uuid}`).
      then(res => setStoreImageLinkList(res.data)).
      catch((err) => console.log(err))
  }, [store_uuid])

  return (
    <StoreImageDiv>
      {
        storeImageLinkList ? (
          storeImageLinkList.map(link => {
            return (
              <div key={link}>
                <Image style={{ width: 170, height: 170, borderRadius: '5px' }}
                       alt={'store_photo'}
                       src={link ?? 'https://via.placeholder.com/170'}/>
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

  margin-left: -10px;
  margin-right: -10px;
`
