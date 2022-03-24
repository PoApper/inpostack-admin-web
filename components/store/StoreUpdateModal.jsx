import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Divider, Form, Icon, Modal } from 'semantic-ui-react'
import Postcode from './postcode'
import { StoreTypeOption } from '../../assets/StoreType'
import { StoreRegionTypeOption } from '../../assets/StoreRegionType'
import TextareaAutosize from 'react-textarea-autosize';

const StoreUpdateModal = ({ storeInfo, trigger }) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const uuid = storeInfo.uuid
  const [name, setName] = useState(storeInfo.name)
  const [phone, setPhone] = useState(storeInfo.phone)
  const [description, setDescription] = useState(storeInfo.description)
  const [storeType, setStoreType] = useState(storeInfo.store_type)
  const [address1, setAddress1] = useState(storeInfo.address1)
  const [address2, setAddress2] = useState(storeInfo.address2)
  const [zipcode, setZipcode] = useState(storeInfo.zipcode)
  const [openingHours, setOpeningHours] = useState(storeInfo.opening_hours)
  const [naverMapUrl, setNaverMapUrl] = useState(storeInfo.naver_map_url)
  const [kakaoMapUrl, setKakaoMapUrl] = useState(storeInfo.kakao_map_url)
  const [label, setLabel] = useState(storeInfo.label)
  const [region, setRegion] = useState(storeInfo.region)

  function handleUpdate (e) {
    e.preventDefault()
    axios.put(`${process.env.NEXT_PUBLIC_API}/store/${uuid}`, {
      name: name,
      phone: phone,
      description: description,
      store_type: storeType,
      address1: address1,
      address2: address2,
      zipcode: zipcode,
      opening_hours: openingHours,
      naver_map_url: naverMapUrl,
      kakao_map_url: kakaoMapUrl,
      label: label,
      region: region,
    }, { withCredentials: true }).
      then(() => router.reload()).
      catch(() => alert('가게 수정 API 오류!'))
  }

  function handleDelete (e) {
    e.preventDefault()
    axios.delete(`${process.env.NEXT_PUBLIC_API}/store/${uuid}`,
      { withCredentials: true }).
      then(() => {
        alert('가게를 삭제했습니다.')
        router.push('/store')
      }).
      catch(() => alert('가게 삭제에 실패했습니다.'))
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={trigger}
    >
      <Modal.Header>가게 정보 수정</Modal.Header>
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

          <Form.Field>
            <label>가게 운영 시간</label>
            <p>
              {`ex: { "월, 화, 수": [{"startTime": "09:00", "endTime": "14:00"}], "주말": "정기 휴일" }`}
            </p>
            <TextareaAutosize
              value={openingHours}
              placeholder={
                'JSON format. ' +
                'ex: { "월, 화, 수": [{"startTime": "09:00", "endTime": "14:00"}], "주말": "정기 휴일" }'
              }
              onChange={(e) => setOpeningHours(e.target.value)}
            />
          </Form.Field>


          <br/>

          <Form.Input
            label={'가게 라벨'}
            placeholder={'퍼블릭 페이지 가게 목록에 표시될 라벨. ex. 전통맛집, 강추'}
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <Form.Select
            label={'가게 지역'}
            placeholder={'가게가 속한 지역을 선택하세요.'}
            value={region}
            options={StoreRegionTypeOption}
            onChange={(e, { value }) => setRegion(value?.toString())}
          />

          <Divider/>

          <Form.Group>
            <FormButton onClick={handleUpdate}>Update <Icon
              name="add circle"/></FormButton>
            <DeleteButton onClick={handleDelete}>Delete <Icon
              name="remove circle"/></DeleteButton>
          </Form.Group>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default StoreUpdateModal

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
