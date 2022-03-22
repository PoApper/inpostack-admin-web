import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { Button, Image } from 'semantic-ui-react'

const StoreImageGrid = ({ store_uuid }) => {
  const [storeImageList, setStoreImageList] = useState([])

  useEffect(() => {
    if (!store_uuid) return

    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${store_uuid}`).
      then(res => setStoreImageList(res.data)).
      catch((err) => console.log(err))
  }, [store_uuid])

  function handleImageDelete (image_uuid) {
    axios.delete(`${process.env.NEXT_PUBLIC_API}/store-image/image/${image_uuid}`, {withCredentials: true})
      .then(() => window.location.reload())
      .catch((err) => {
        alert('이미지 삭제에 실패했습니다.'); console.log(err)
      })
  }

  return (
    <Wrapper>
      {
        storeImageList.length ? (
          storeImageList.map(storeImage => {
            return (
              <StoreImageDiv key={storeImage.uuid}>
                <Image
                  rounded
                  src={storeImage.link ??
                    'https://via.placeholder.com/200?text=InPoStack'}
                  alt={'food_img'}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <Button
                  compact style={{ width: '100%' }}
                  onClick={() => handleImageDelete(storeImage.uuid)} color={'red'} >
                  이미지 삭제
                </Button>
              </StoreImageDiv>
            )
          })
        ) : (
          <h3>
            등록된 이미지가 없습니다.
          </h3>
        )
      }
    </Wrapper>
  )
}

export default StoreImageGrid

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }

  margin-left: -10px;
  margin-right: -10px;

  margin-bottom: 40px;
`

const StoreImageDiv = styled.div`
  padding: 10px;
  height: 250px;
  border-radius: 5px;
`
