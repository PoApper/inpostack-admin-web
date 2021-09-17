import React, { useState } from 'react'
import styled from 'styled-components'
import { Form, Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import { deleteStore, updateStore } from '../../requests/storeAPI'
import Postcode from '../postcode'

const StoreInfos = (props) => {
  const storeInfo = props.store
  const uuid = storeInfo.uuid
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(storeInfo.name)
  const [phone, setPhone] = useState(storeInfo.phone)
  const [description, setDescription] = useState(storeInfo.description)
  const [store_type, setStore_type] = useState(storeInfo.store_type)
  const [address1, setAddress1] = useState(storeInfo.address1)
  const [address2, setAddress2] = useState(storeInfo.address2)
  const [zipcode, setZipcode] = useState(storeInfo.zipcode)
  const [open_time, setOpen_time] = useState('')
  const [close_time, setClose_time] = useState('')
  const [image_url, setImage_url] = useState(storeInfo.image_url)

  const [newStoreImg, setNewStoreImg] = useState()

  //const [owner_uuid, setOwner_uuid] = useState(storeInfo.owner_uuid)

  async function handleUpdate (e) {
    e.preventDefault()
    try {
      await updateStore({
        uuid,
        name,
        phone,
        description,
        store_type,
        address1,
        address2,
        zipcode,
        open_time,
        close_time,
        image_url, /*owner_uuid*/
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

  const StoreOptions = Object.entries(props.storeType).map((type) => {
    const [key, value] = type
    return { key: key, text: value, value: value }
  })

  // TODO: API 안정화 후 적용 (API 상에서 null을 반환) - owner_uuid
  /*const StoreOptions = Object.entries(props.storeType)
  .map((type) => {
    const [key, value] = type;
    return {key: key, text: value, value: value}
  });*/

  return (
    <Form>
      <Form.Input required
                  label="상호명"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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

      <Form.TextArea required
                      label="가게 소개"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
      />

      <Form.Select
        required
        label="가게 타입"
        name="store_type"
        value={store_type}
        placeholder="가게 타입을 선택하세요."
        options={StoreOptions}
        onChange={(e, { value }) => setStore_type(value?.toString())}
      />

      <Form.Field required>
        <label>가게 주소</label>
        <Postcode address1={address1} zipcode={zipcode}
                  handleAddress={(address1, zipcode) => {
                    setAddress1(address1)
                    setZipcode(zipcode)
                  }}
        />
        <Form.Input
          name="address1"
          value={address1}
          onChange={(e) => setAddress1(e.target.value)}
          style={{ margin: '0', padding: '0' }}
        />
        <Form.Input
          name="address2"
          value={address2}
          onChange={(e) => setAddress2(e.target.value)}
          style={{ margin: '0 0 1rem', padding: '0' }}
        />
      </Form.Field>

      <Form.Group style={{ width: '100%', margin: '0 0 14px 0' }}>
        <div className={'required field'}
              style={{ width: '100%', paddingLeft: 0 }}>
          <label>오픈 시간</label>
          <DatePicker
            showTimeSelect showTimeSelectOnly timeIntervals={30}
            autoComplete="off"
            name="open_time" dateFormat="hh:mm aa"
            selected={open_time}
            onKeyDown={e => e.preventDefault()}
            onChange={(e) => setOpen_time(e)}
          />
        </div>
        <div className={'required field'}
              style={{ width: '100%', paddingRight: 0 }}>
          <label>닫는 시간</label>
          <DatePicker
            showTimeSelect showTimeSelectOnly timeIntervals={30}
            autoComplete="off"
            name="close_time" dateFormat="hh:mm aa"
            selected={close_time}
            onKeyDown={e => e.preventDefault()}
            onChange={(e) => setClose_time(e)}
          />
        </div>
      </Form.Group>

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
        //value={owner_uuid}
        //onChange={(e)=>setOwner_uuid(e.target.value)}
      />

      <Form.Field required>
        <label>가게 이미지</label>
        <img width={200} height={200}
                src={image_url}
                alt="store_photo"/>
        <FileBox>
          <label>
            <span>업로드</span>
            <input
              type="file" accept="image/*" name="store_image"
              onChange={(evt) => {
                const file = evt.target.files[0]
                const fileReader = new FileReader()
                fileReader.onloadend = () => {
                  setImage_url(fileReader.result)
                  setNewStoreImg(file)
                }
                fileReader.readAsDataURL(file)
              }}/>
          </label>
        </FileBox>
      </Form.Field>

      <Form.Group>
        <FormButton onClick={handleUpdate}>Update <Icon name="add circle"/></FormButton>
        <DeleteButton onClick={handleDelete}>Delete <Icon
          name="remove circle"/></DeleteButton>
      </Form.Group>
    </Form>
  )
}

export default StoreInfos

const FormButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  line-height: 35px;
  margin-left: 9px;
  background-color: #00758e;
  color: #fff;
  border: 0;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #005d73;
  }
`

const DeleteButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  line-height: 35px;
  margin-left: 10px;
  background-color: #da1451;
  color: #fff;
  border: 0;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #b81f54;
  }
`
const FileBox = styled.div`
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