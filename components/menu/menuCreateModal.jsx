import React, { useState } from 'react'
import { Form, Icon, Message, Modal } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'

const MenuCreateModal = ({store_uuid, categoryUUID, categoryName, trigger}) => {
  const router = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [imageUrl, setImageUrl] = useState(
    'https://via.placeholder.com/200?text=InPostack')
  const [newMenuImg, setNewMenuImg] = useState()

  async function handleCreate (e) {
    e.preventDefault()
    if (!store_uuid) {
      alert('유효하지 않은 가게 정보 입니다.')
      return;
    }
    if (!categoryUUID) {
      alert('유효하지 않은 카테고리 정보 입니다.')
      return;
    }

    const formData = new FormData()
    formData.append('store_uuid', store_uuid)
    formData.append('category_uuid', categoryUUID)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    if (newMenuImg) {
      formData.append('menu_image', newMenuImg)
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/menu`, formData,
        { withCredentials: true })
      alert('메뉴를 생성 했습니다.')
      router.reload()
    } catch (err) {
      alert('메뉴 생성에 실패했습니다.')
    }
  }

  return (
    <Modal
      size="small"
      open={isModalOpen}
      trigger={trigger}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
    >
      <Modal.Header>메뉴 생성</Modal.Header>
      <Modal.Content>
        <Message>
          <b>메뉴</b>를 추가해보세요! 인포스택에는 총 <b>200</b>개의 메뉴들이 있으며 음식점들은
          평균 <b>10.8</b>개의
          메뉴를 가지고 있습니다!
        </Message>
        <Form onSubmit={handleCreate}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}>
            <Left>

              <Form.Input
                required
                label={'메뉴 이름'}
                placeholder={'생성할 메뉴 이름을 입력해주세요.'}
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Input
                label={'가격'}
                placeholder={'가격을 입력해주세요.'}
                onChange={(e) => setPrice(e.target.value)}
              />

              <Form.TextArea
                disabled
                label={'메뉴 설명'}
                placeholder={'ex. 2인분 이상 배달 가능\n원산지: 호주\n소: 5,000, 중: 8,000, 대: 12,000'}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Input
                label={'카테고리'}
                value={categoryName}
              />
            </Left>
            <Right>
              <Form.Field>
                <label>메뉴 사진</label>
                <ImgBox>
                  <img width={150} height={150}
                       src={imageUrl ??
                         'https://via.placeholder.com/150?text=InPostack'}
                       alt="menu_photo"/>
                </ImgBox>
                <FileBox>
                  <label>
                    <span>업로드</span>
                    <input
                      type="file" accept="image/*" name="menu_image"
                      onChange={(evt) => {
                        const file = evt.target.files[0]
                        const fileReader = new FileReader()
                        fileReader.onloadend = () => {
                          setImageUrl(fileReader.result)
                          setNewMenuImg(file)
                        }
                        fileReader.readAsDataURL(file)
                      }}/>
                  </label>
                </FileBox>
              </Form.Field>
            </Right>
          </div>
          <Form.Button>
            <Icon name="save" style={{ marginRight: '0.5rem' }}/>
            저장
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default MenuCreateModal

const ImgBox = styled.div`
  margin-top: 15px;
  position: relative;
`

const FileBox = styled.div`
  display: flex;
  margin-bottom: 10px;

  label {
    z-index: 1;

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
const Left = styled.div`
  margin-right: 20px;
  flex: 1;
`
const Right = styled.div`
`