import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { createNotice } from '../../requests/noticeAPI'
import styled from 'styled-components'
import { Button, Form, Modal, Icon } from 'semantic-ui-react'

const NoticeCreateModal = ( props ) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [notice_type, setNotice_type] = useState('')

  const NoticeOptions = Object.entries(props.noticeType)
    .map((type) => {
      const [key, value] = type;
      return {key: key, text: value, value: value}
    });

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      await createNotice({
        title, content, notice_type
      })
      setOpen(false)
      alert('공지를 생성했습니다.')
      router.reload(window.location.pathname)
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
      trigger={<FormButton style={{padding: '0px 15px', width:'160px'}}><b>Notice Create </b><Icon name='add circle'/></FormButton>}
      >
        <Modal.Header>공지 생성</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input required
                        label='제목'
                        name='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="required field">
              <Form.TextArea required
                label='내용'
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            <Form.Select required
              label="공지 타입"
              name="notice_type"
              value={notice_type}
              placeholder="공지 타입을 선택하세요."
              options={NoticeOptions}
              onChange={(e, {value}) => setNotice_type(value?.toString())}
            />
            <FormButton onClick={handleSubmit}><b>Create </b><Icon name='add circle'/></FormButton>
          </Form>
        </Modal.Content>
      </Modal>
  )
}

export default NoticeCreateModal

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