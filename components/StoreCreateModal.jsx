import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { CreateStore } from '../requests/storeAPI'
import styled from 'styled-components'
import {Button, Form, Modal} from 'semantic-ui-react'

const StoreCreateModal = (props) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [store_type, setStore_type] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [open_time, setOpen_time] = useState('')
  const [close_time, setClose_time] = useState('')
  const [image_url, setImage_url] = useState('')
  const [owner_uuid, setOwner_uuid] = useState('')

  async function handleSubmit (e) {
    try {
      await CreateStore({
        name, phone, description, store_type, address1, address2, open_time, close_time, image_url, owner_uuid
      })
      setOpen(false)
      alert('가게를 생성했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('가게 생성에 실패했습니다.')
      console.log(err)
    }
  }

  const StoreOptions = Object.entries(props.storeType)
  .map((type) => {
    const [key, value] = type;
    return {key: key, text: value, value: value}
  });  

  return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>가게 생성</Button>}
    >
      <Modal.Header>가게 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input required
                      label="상호명"
                      name="name"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
          />

          <Form.Input required
                      label="전화번호"
                      name="phone"
                      placeholder="010-0000-0000"
                      value={phone}
                      onChange={(e) => {
                        if (e.target.value.length > 13) return
                        setPhone(e.target.value)
                      }}
          />

<Form.Input required
                      label="가게 소개"
                      name="description"
                      value={description}
                      onChange={(e)=>setDescription(e.target.value)}
          />
          
          <Form.Select
            required
            label="가게 타입"
            name="store_type"
            value={store_type}
            placeholder="가게 타입을 선택하세요."
            options={StoreOptions}
            onChange={(e, {value}) => setStore_type(value?.toString())}
          />

          <Form.Input required
                      label="가게 위치"
                      name="address1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
          />
          <Form.Input 
                      name="address2"
                      value={address2}
                      onChange={(e) => setAddress2(e.target.value)}
          />

          <Form.Input required 
                      label="오픈 시간(00:00)"
                      name="open_time" 
                      value={open_time}
                      onChange={(e) => setOpen_time(e.target.value)}
          />

          <Form.Input required 
                      label="오픈 시간(00:00)"
                      name="close_time" 
                      value={close_time}
                      onChange={(e) => setClose_time(e.target.value)}
          />

          {/*  TODO: API 안정화 후 적용
          <Form.Select
            label="점주 유저"
            name="owner_uuid"
            value={owner_uuid}
            placeholder="점주 유저를 선택하세요"
            options={props.owners}
            onChange={(e, {value})=>setOwner_uuid(value?.toString())}
          />
          */}
          <Form.Input disabled
            label="점주 유저 (NOT ALLOWED)"
            name="owner_uuid"
            value={owner_uuid}
            onChange={(e)=>setOwner_uuid(e.target.value)}
          />

          <Form.Input disabled
            label="가게 이미지"
            name="image_url"
            value={image_url}
            onChange={(e)=>setImage_url(e.target.value)}
          />

          <p>
            메뉴 카테고리와 세부 메뉴 생성은 가게 수정 페이지에서 가능합니다!
          </p>

          <FormButton onClick={handleSubmit}>
            생성
          </FormButton>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default StoreCreateModal

const FormButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  background-color: #265c71;
  color: #fff;
  border: 0px;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #32738b;
  }
`