import { Button, Icon, Modal } from 'semantic-ui-react'
import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const StoreImageAddModal = ({ storeInfo }) => {
  const router = useRouter();

  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [newStoreImg, setNewStoreImg] = useState()

  console.log(storeInfo)

  function uploadStoreImage () {
    const formData = new FormData()
    formData.append('store_image', newStoreImg)
    axios.post(`${process.env.NEXT_PUBLIC_API}/store-image/${storeInfo.uuid}`,
      formData, { withCredentials: true },
    ).then(() => {
      alert('가게 이미지가 등록되었습니다!');
      router.reload();
    }).catch((err) => {
      alert('가게 이미지 등록에 실패했습니다.')
      console.log(err)
    })
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>사진 추가 <Icon name={'add circle'}/></Button>}
    >
      <Modal.Header>가게 사진 추가</Modal.Header>
      <Modal.Content>
        <FileBox>
          <label>
            <span>업로드</span>
            <input
              type={'file'} accept={'image/*'}
              onChange={(evt) => {
                const file = evt.target.files[0]
                const fileReader = new FileReader()
                fileReader.onloadend = () => {
                  setImageUrl(fileReader.result)
                  setNewStoreImg(file)
                }
                fileReader.readAsDataURL(file)
              }}/>
          </label>
        </FileBox>
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

const FileBox = styled.div`
  margin-top: 4px;
  display: flex;

  label {
    display: inline-block;
    padding: .5em .75em;
    line-height: normal;
    vertical-align: middle;
    cursor: pointer;
    font-size: inherit;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: .5em;
    color: #fff;
    background-color: #6e757c;
  }

  input[type="file"] { //hidden tag
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`