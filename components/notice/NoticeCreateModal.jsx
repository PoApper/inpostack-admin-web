import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { createNotice } from '../../requests/noticeAPI'
import { Button, Form, Modal } from 'semantic-ui-react'

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
      trigger={<Button>공지 생성</Button>}
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
              <Form.Input required
                label='내용'
                name='content'
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
            
            {<Form.Input required // TODO: Select로 수정
                label='공지 타입'
                name='notice_type'
                value={notice_type}
                onChange={(e) => setNotice_type(e.target.value)}
            />}

            {/*<Form.Select required
              label="공지 타입"
              name="notice_type"
              value={notice_type}
              placeholder="공지 타입을 선택하세요."
              options={NoticeOptions}
              onChange={(e) => setNotice_type(e.target.text)}
            />*/}
            <Form.Button positive onClick={handleSubmit}>
              생성
            </Form.Button>
          </Form>
        </Modal.Content>
      </Modal>
  )
}

export default NoticeCreateModal