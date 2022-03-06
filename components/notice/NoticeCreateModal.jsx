import React, { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import styled from 'styled-components'
import { Form, Icon, Modal } from 'semantic-ui-react'

const NoticeCreateModal = ({ noticeType }) => {
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [notice_type, setNotice_type] = useState('')

  const NoticeOptions = Object.entries(noticeType).map((type) => {
    const [key, value] = type
    return { key: key, text: value, value: value }
  })

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/notice`, {
        title: title,
        content: content,
        notice_type: notice_type,
      }, { withCredentials: true })
      router.reload()
    } catch (err) {
      alert('공지 생성에 실패했습니다.')
      console.log(err)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<CreateButton>Notice <Icon name="add circle"/></CreateButton>}
    >
      <Modal.Header>공지 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input
            required
            label="제목"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="required field">
            <Form.TextArea
              required
              label="내용"
              name="content"
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
            onChange={(e, { value }) => setNotice_type(
              value?.toString())}
          />
          <FormButton onClick={handleSubmit}>Create <Icon
            name="add circle"/></FormButton>
        </Form>
      </Modal.Content>
    </Modal>
  )
}

export default NoticeCreateModal

const CreateButton = styled.button`
  cursor: pointer;
  width: 100px;
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