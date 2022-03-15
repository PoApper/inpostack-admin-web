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

const StoreLogoAddModal = ({ store_uuid, trigger }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [newStoreLogo, setNewStoreLogo] = useState()

  function uploadStoreLogo () {
    if (!newStoreLogo) {
      alert('이미지가 입력되지 않았습니다!')
      return
    }
    if (!store_uuid) {
      alert('유효하지 않은 가게 정보입니다.')
      return
    }

    const formData = new FormData()
    formData.append('store_logo', newStoreLogo)
    axios.post(`${process.env.NEXT_PUBLIC_API}/store/logo/${store_uuid}`,
      formData, { withCredentials: true },
    ).then(() => {
      alert('가게 로고가 등록되었습니다!')
      router.reload()
    }).catch((err) => {
      alert('가게 로고 등록에 실패했습니다.')
      console.log(err)
    })
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}>
      <Modal.Header>가게 로고 추가/변경</Modal.Header>
      <Modal.Content>
        {
          newStoreLogo ? (
            <div>
              {/* TODO: add preview image here! */}
              <Header>
                이미지를 업로드하시겠습니까?
              </Header>
            </div>
          ) : (
            <Dropzone
              onDrop={acceptedFiles => setNewStoreLogo(acceptedFiles[0])}>
              {
                ({ getRootProps, getInputProps }) => (
                  <section>
                    <Segment placeholder {...getRootProps()}>
                      <Header icon>
                        <Icon name="image file outline" style={{ height: 60 }}/>
                        <p>
                          가게 로고를 이곳에 놓으세요! (1:1 비율만 허용)
                        </p>
                      </Header>
                      <Button primary>Logo here</Button>
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
          <Button onClick={uploadStoreLogo}>
            업로드
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  )
}

export default StoreLogoAddModal
