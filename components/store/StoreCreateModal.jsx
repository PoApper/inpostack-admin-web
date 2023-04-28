import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Form, Icon, Modal } from 'semantic-ui-react'
import Postcode from './postcode'
import { StoreTypeOption } from '../../assets/StoreType'
import TextareaAutosize from 'react-textarea-autosize'

const StoreCreateModal = () => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [description, setDescription] = useState('')
  const [storeType, setStoreType] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [naverMapUrl, setNaverMapUrl] = useState()
  const [kakaoMapUrl, setKakaoMapUrl] = useState()

  async function handleSubmit (e) {
    e.preventDefault()
    axios.post(`${process.env.NEXT_PUBLIC_API}/store`,
      {
        name: name,
        phone: phone,
        description: description,
        store_type: storeType,
        address1: address1,
        address2: address2,
        zipcode: zipcode,
      }, { withCredentials: true }).
      then(() => {
        router.reload()
      }).
      catch((err) => {
        const errMsg = err.response.data.message;
        alert(`가게 생성에 실패했습니다.\n${errMsg}`);
      })
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<CreateButton>Store <Icon name="add circle"/></CreateButton>}
    >
      <Modal.Header>가게 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label={'상호명'}
            name={'name'}
            placeholder={'네이버 지도 기준으로 작성'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Form.Input
            required
            label={'전화번호'}
            name={'phone'}
            placeholder={'010-0000-0000'}
            value={phone}
            onChange={(e) => {
              if (e.target.value.length > 13) return
              setPhone(e.target.value)
            }}
          />

          <Form.Field>
            <label>가게 소개</label>
            <TextareaAutosize
              name={'description'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Field>

          <Form.Select
            required
            label={'가게 타입'}
            name={'store_type'}
            value={storeType}
            placeholder={'가게 타입을 선택하세요.'}
            options={StoreTypeOption}
            onChange={(e, { value }) => setStoreType(value?.toString())}
          />

          <Form.Field required>
            <label>가게 주소</label>
            <Postcode
              zipcode={zipcode}
              address1={address1}
              handleAddress={(zipcode, address1) => {
                setZipcode(zipcode)
                setAddress1(address1)
              }}
            />
            <Form.Input
              name={'address2'}
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </Form.Field>

          <Form.Group widths={'equal'}>
            <Form.Input
              label={'네이버 지도 URL'}
              name={'naver_map_url'}
              value={naverMapUrl}
              placeholder={'https://map.naver.com/v5/entry/place/xxxxxxxxxx'}
              onChange={(e) => setNaverMapUrl(e.target.value)}
            />
            <Form.Input
              label={'카카오 지도 URL'}
              name={'kakao_map_url'}
              value={kakaoMapUrl}
              placeholder={'https://place.map.kakao.com/xxxxxxxx'}
              onChange={(e) => setKakaoMapUrl(e.target.value)}
            />
          </Form.Group>

          <p>
            메뉴 카테고리와 세부 메뉴 생성은 가게 생성 후 편집이 가능합니다!
          </p>

          <FormButton onClick={handleSubmit}>
            <b>Create</b> <Icon name="add circle"/>
          </FormButton>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default StoreCreateModal

const CreateButton = styled.button`
  cursor: pointer;
  width: 90px;
  height: 35px;
  padding: 0 15px;
  line-height: 35px;
  background-color: #00758e;
  color: #fff;
  border: 0;
  border-radius: 15px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #005d73;
  }
`

const FormButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  line-height: 35px;
  background-color: #00758e;
  color: #fff;
  border: 0;
  border-radius: 5px;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #005d73;
  }
`