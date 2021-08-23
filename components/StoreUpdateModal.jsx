import { useRouter } from 'next/router'
import React, { useState } from 'react'
import {Form, Modal} from 'semantic-ui-react'
import { deleteStore, updateStore } from '../requests/storeAPI'

const StoreUpdateModal = ( props ) => {
  const router = useRouter()
  const storeInfo = props.storeInfo
  const uuid = props.storeInfo.uuid
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(storeInfo.name)
  const [phone, setPhone] = useState(storeInfo.phone)
  const [description, setDescription] = useState(storeInfo.description)
  const [store_type, setStore_type] = useState(storeInfo.store_type)
  const [address1, setAddress1] = useState(storeInfo.address1)
  const [address2, setAddress2] = useState(storeInfo.address2)
  const [open_time, setOpen_time] = useState(storeInfo.open_time)
  const [close_time, setClose_time] = useState(storeInfo.close_time)
  const [image_url, setImage_url] = useState(storeInfo.image_url)
  const [owner_uuid, setOwner_uuid] = useState(storeInfo.owner_uuid)

  async function handleUpdate (e) {
    e.preventDefault()
    try {
      await updateStore({
        uuid, name, phone, description, store_type, address1, address2, open_time, close_time, image_url, owner_uuid
      })
      setOpen(false)
      alert('가게를 수정했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('가게 수정에 실패했습니다.')
      console.log(err)
    }
  }

  async function handleDelete (e) {
    e.preventDefault()
    try {
      await deleteStore({
        uuid,
      })
      setOpen(false)
      alert('가게를 삭제했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('가게 삭제에 실패했습니다.')
      console.log(err)
    }
  }

  const StoreOptions = Object.entries(props.storeType)
  .map((type) => {
    const [key, value] = type;
    return {key: key, text: value, value: value}
  });
  
  // TODO: API 안정화 후 적용 (API 상에서 null을 반환) - owner_uuid
  /*const StoreOptions = Object.entries(props.storeType)
  .map((type) => {
    const [key, value] = type;
    return {key: key, text: value, value: value}
  });*/

  return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}
    >
      <Modal.Header>가게 수정</Modal.Header>
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

          <p>메뉴 카테고리와 세부 메뉴 생성은 가게 수정 페이지에서 가능합니다!</p>

          <Form.Group>
            <Form.Button onClick={handleUpdate}>
              수정
            </Form.Button>
            <Form.Button negative onClick={handleDelete} type='delete'>
              삭제
            </Form.Button>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default StoreUpdateModal