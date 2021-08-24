import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { updateNoticeInfo, deleteNoticeInfo } from '../../requests/noticeAPI'
import styled from 'styled-components'
import { Form, Modal } from 'semantic-ui-react'

const NoticeUpdateModal = ( props ) => {
  const router = useRouter()
  const noticeInfo = props.noticeInfo
  const uuid = props.noticeInfo.uuid
  const [ open, setOpen ] = useState(false)
  const [ title, setTitle ] = useState(noticeInfo.title)
  const [ content, setContent ] = useState(noticeInfo.content)
  const [ notice_type, setNotice_type ] = useState(noticeInfo.notice_type)

  async function handleUpdate (e) {
    e.preventDefault()
    try {
      await updateNoticeInfo({
        title, content, notice_type, uuid,
      })
      setOpen(false)
      alert('공지를 수정했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('공지 수정에 실패했습니다.')
      console.log(err)
    }
  }

  async function handleDelete (e) {
    e.preventDefault()
    try {
      await deleteNoticeInfo({
        uuid,
      })
      setOpen(false)
      alert('공지를 삭제했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('공지 삭제에 실패했습니다.')
      console.log(err)
    }
  }

  const NoticeOptions = Object.entries(props.noticeType)
    .map((type) => {
      const [key, value] = type;
      return {key: key, text: value, value: value}
    });
  
  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}>
      <Modal.Header>공지 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input required
                      label='제목'
                      name='title'
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}/>
          <div className="required field">
            <label>내용</label>
            <Form.Input
              name='content'
              value={content}
              onChange={(e) => setContent(e.target.value)}
              />
          </div>

          <Form.Select
            required
            label="공지 타입"
            name="notice_type"
            value={notice_type}
            placeholder="공지 타입을 선택하세요."
            options={NoticeOptions}
            onChange={(e, {value}) => setNotice_type(value?.toString())}
          />

          <Form.Group>
            <FormButton onClick={handleUpdate}>수정</FormButton>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </Form.Group>
        </Form>
        </Modal.Content>
      </Modal>
  )
}

export default NoticeUpdateModal

const FormButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  margin-left: 9px;
  background-color: #265c71;
  color: #fff;
  border: 0px;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #32738b;
  }
`

const DeleteButton = styled.button`
  cursor: pointer;
  width: 100px;
  height: 35px;
  margin-left: 10px;
  background-color: #c83053;
  color: #fff;
  border: 0px;
  border-radius: 15px;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #E24D6F;
  }
`
