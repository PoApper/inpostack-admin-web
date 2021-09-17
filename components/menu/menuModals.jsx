import React, { useState } from 'react'
import Image from 'next/image'
import { Form, Icon, Message, Modal } from 'semantic-ui-react'
import { useRouter } from 'next/router'
import axios from 'axios'
import theme from '../../styles/theme'
import styled from 'styled-components'

export const MenuCreateModal = (props) => {
  const router = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [image_url, setImageUrl] = useState(
    'https://via.placeholder.com/200?text=InPostack')
  const [newMenuImg, setNewMenuImg] = useState()

  async function handleCreate (e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('store_uuid', props.store_uuid)
    formData.append('category_uuid', props.categoryUUID)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    if (newMenuImg) {
      formData.append('menu_img', newMenuImg)
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/menu`, formData,
        { withCredentials: true })
      alert('메뉴를 생성 했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('메뉴 생성에 실패했습니다.')
    }
  }

  return (
    <Modal
      size="small"
      open={isModalOpen}
      trigger={props.trigger}
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
          <Form.Field>
            <label>메뉴 사진</label>
            <ImgBox>
              <Image style={{ borderRadius: '70%' }} width={150} height={150}
                   src={image_url ??
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
          <Form.Input
            required
            label={'메뉴 이름'}
            placeholder={'생성할 메뉴 이름을 입력해주세요.'}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Input
            required
            label={'가격'}
            placeholder={'가격을 입력해주세요.'}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Form.TextArea
            required
            label={'메뉴 설명'}
            placeholder={'ex. 2인분 이상 배달 가능\n원산지: 호주\n소: 5,000, 중: 8,000, 대: 12,000'}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Form.Input
            label={'카테고리'}
            value={props.categoryName}
          />

          <Form.Button>
            <Icon name="save" style={{ marginRight: '0.5rem' }}/>
            저장
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export const MenuUpdateModal = (props) => {
  const router = useRouter()
  const [isModalOpen, setModalOpen] = useState(false)

  const menuInfo = props.menuInfo

  const [name, setName] = useState(menuInfo.name)
  const [description, setDescription] = useState(menuInfo.description)
  const [price, setPrice] = useState(menuInfo.price)
  const [image_url, setImageUrl] = useState(menuInfo.image_url)
  const [newMenuImg, setNewMenuImg] = useState()

  async function handleUpdate (e) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('category_uuid', props.categoryUUID)
    formData.append('name', name)
    formData.append('description', description)
    formData.append('price', price)
    if (newMenuImg) {
      formData.append('menu_img', newMenuImg)
    }

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API}/menu/owner/${menuInfo.uuid}`, formData,
        { withCredentials: true })
      alert('메뉴를 수정 했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('메뉴 수정에 실패했습니다.')
    }
  }

  async function handleDelete (e) {
    e.preventDefault()

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/menu/owner/${menuInfo.uuid}`,
        { withCredentials: true })
      alert('메뉴를 삭제 했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('메뉴 삭제에 실패했습니다.')
    }
  }

  return (
    <Modal
      size="small"
      open={isModalOpen}
      trigger={props.trigger}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
    >
      <Modal.Header>메뉴 수정: {menuInfo.name}</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleUpdate}>
          <div style={{display: 'flex', justifyContent:'space-between', marginBottom: '20px'}}>
          <Left>
          <Form.Input
            required
            label={'메뉴 이름'}
            value={name}
            placeholder={'생성할 메뉴 이름을 입력해주세요.'}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Input
            required
            label={'가격'}
            value={price}
            placeholder={'가격을 입력해주세요.'}
            onChange={(e) => setPrice(e.target.value)}
          />

          <Form.TextArea
            required
            label={'메뉴 설명'}
            value={description}
            placeholder={'ex. 2인분 이상 배달 가능\n원산지: 호주\n소: 5,000, 중: 8,000, 대: 12,000'}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Form.Input
            label={'카테고리'}
            value={props.categoryName}
          />
          </Left>
          <Right>
            <Form.Field>
              <label>메뉴 사진</label>
              <ImgBox>
                <Image width={150} height={150}
                    src={image_url ??
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
          <Form.Group>
            <Form.Button>
              <Icon name="save" style={{ marginRight: '0.5rem' }}/>
              저장
            </Form.Button>
            <Form.Button
              style={{
                backgroundColor: theme.color.inpostack_red2, color: 'white',
              }}
              onClick={handleDelete}>
              <Icon name="delete" style={{ marginRight: '0.5rem' }}/>
              삭제
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

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