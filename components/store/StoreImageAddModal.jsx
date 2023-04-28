import {
  Button,
  Divider,
  Header,
  Icon,
  Modal,
  Segment,
} from 'semantic-ui-react'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Dropzone from 'react-dropzone'
import { imageRatioCheck } from '../../utils/image-validate'

const StoreImageAddModal = ({ store_uuid }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [newStoreImg, setNewStoreImg] = useState()

  function uploadStoreImage () {
    if (!newStoreImg) {
      alert('이미지가 입력되지 않았습니다!')
      return;
    }
    if (!store_uuid) {
      alert('유효하지 않은 가게 정보입니다.')
      return;
    }

    const formData = new FormData()
    formData.append('store_image', newStoreImg)
    axios.post(`${process.env.NEXT_PUBLIC_API}/store-image/${store_uuid}`,
      formData, { withCredentials: true },
    ).then(() => {
      alert('가게 이미지가 등록되었습니다!')
      router.reload()
    }).catch((err) => {
      const errMsg = err.response.data.message;
      alert(`가게 이미지 등록에 실패했습니다.\n${errMsg}`);
    })
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
      <Button>
        사진 추가 <Icon name={'add circle'} style={{marginLeft: 4}}/>
      </Button>
    }
    >
      <Modal.Header>가게 사진 추가</Modal.Header>
      <Modal.Content>
        {
          newStoreImg ? (
            <div>
              {/* TODO: add preview image here! */}
              <Header>
                이미지를 업로드하시겠습니까?
              </Header>
            </div>
          ) : (
            <Dropzone onDrop={acceptedFiles => imageRatioCheck(acceptedFiles[0], setNewStoreImg)}>
              {
                ({ getRootProps, getInputProps }) => (
                  <section>
                    <Segment placeholder {...getRootProps()}>
                      <Header icon>
                        <Icon name="image file outline" style={{ height: 60 }}/>
                        <p>
                          가게에 추가할 이미지를 이곳에 놓으세요! (1:1 비율만 허용)
                        </p>
                      </Header>
                      <Button primary>Add Image</Button>
                      <input {...getInputProps()} type={'file'}
                             accept={'image/*'}/>
                    </Segment>
                  </section>
                )}
            </Dropzone>
          )
        }

        <Divider/>

        <div>
          <Button onClick={uploadStoreImage}>
            업로드
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default StoreImageAddModal
