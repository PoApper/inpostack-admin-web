import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Divider, Form, Icon } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'

import Postcode from '../../components/postcode'

const StoreUpdate = (props) => {
  const router = useRouter()

  const storeInfo = props.storeInfo
  const uuid = props.storeInfo.uuid
  const [name, setName] = useState(storeInfo.name)
  const [phone, setPhone] = useState(storeInfo.phone)
  const [description, setDescription] = useState(storeInfo.description)
  const [storeType, setStoreType] = useState(storeInfo.store_type)
  const [address1, setAddress1] = useState(storeInfo.address1)
  const [address2, setAddress2] = useState(storeInfo.address2)
  const [zipcode, setZipcode] = useState(storeInfo.zipcode)
  const [openTime, setOpenTime] = useState(storeInfo.open_time)
  const [closeTime, setCloseTime] = useState(storeInfo.close_time)

  function handleUpdate (e) {
    e.preventDefault()
    const formData = new FormData()
    formData.append('name', name)
    formData.append('phone', phone)
    formData.append('description', description)
    formData.append('store_type', storeType)
    formData.append('address1', address1)
    formData.append('address2', address2)
    formData.append('zipcode', zipcode)
    formData.append('open_time', openTime)
    formData.append('close_time', closeTime)
    axios.put(`${process.env.NEXT_PUBLIC_API}/store/${uuid}`,
      formData, { withCredentials: true }).
      then(() => router.push(`/store/${name}`)).
      catch(() => alert('가게 수정 API 오류!'))
  }

  function handleDelete (e) {
    e.preventDefault()
    axios.delete(`${process.env.NEXT_PUBLIC_API}/store/${uuid}`,
      { withCredentials: true }).
      then(() => {
        alert('가게를 삭제했습니다.')
        router.reload()
      }).
      catch(() => alert('가게 삭제에 실패했습니다.'))
  }

  const storeOptions = []
  // TODO: store/meta와 연동하는 부분 체크할 것
  // const StoreOptions = Object.entries(props.storeMeta.store_type).map((type) => {
  //   const [key, value] = type
  //   return { key: key, text: value, value: value }
  // })

  return (
    <Form>
      <Form.Input
        required
        label="상호명"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <Form.Input
        required
        label="전화번호"
        name="phone"
        placeholder="010-0000-0000"
        value={phone}
        onChange={(e) => {
          if (e.target.value.length > 13) return
          setPhone(e.target.value)
        }}
      />

      <Form.TextArea
        required
        label="가게 소개"
        name="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <Form.Select
        required
        label="가게 타입"
        name="store_type"
        value={storeType}
        placeholder="가게 타입을 선택하세요."
        options={storeOptions}
        onChange={(e, { value }) => setStoreType(value?.toString())}
      />

      <Form.Field required>
        <label>가게 주소</label>
        <Postcode
          address1={address1} zipcode={zipcode}
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
            value={openTime}
            onKeyDown={e => e.preventDefault()}
            onChange={open_time => {
              setOpenTime(
                `${open_time.getHours()}:${open_time.getMinutes() === 0
                  ? '00'
                  : '30'}`)
            }}
          />
        </div>
        <div className={'required field'}
             style={{ width: '100%', paddingRight: 0 }}>
          <label>닫는 시간</label>
          <DatePicker
            showTimeSelect showTimeSelectOnly timeIntervals={30}
            autoComplete="off"
            name="close_time" dateFormat="hh:mm aa"
            value={closeTime}
            onKeyDown={e => e.preventDefault()}
            onChange={close_time => {
              setCloseTime(
                `${close_time.getHours()}:${close_time.getMinutes() === 0
                  ? '00'
                  : '30'}`)
            }}
          />
        </div>
      </Form.Group>

      <Divider/>

      <Form.Group>
        <FormButton onClick={handleUpdate}>Update <Icon
          name="add circle"/></FormButton>
        <DeleteButton onClick={handleDelete}>Delete <Icon
          name="remove circle"/></DeleteButton>
      </Form.Group>
    </Form>
  )
}

// StoreUpdate.getInitialProps = async (context) => {
//   const res = await fetch(`${process.env.NEXT_PUBLIC_API}/store/meta`)
//   const data = await res.json()
//
//   return {
//     storeMeta: data,
//   }
// }

export default StoreUpdate

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
