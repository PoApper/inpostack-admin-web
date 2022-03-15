import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Form, Icon, Modal } from 'semantic-ui-react'

import theme from '../../styles/theme'

export const CategoryCreateModal = ({storeUuid, trigger}) => {
  const router = useRouter()

  const [isModalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')

  async function handleCreate (e) {
    if (!storeUuid) {
      alert('유효하지 않은 가게 정보 입니다.')
      return;
    }

    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/category`, {
        name: name,
        store_uuid: storeUuid,
      }, { withCredentials: true })
      alert('카테고리를 생성 했습니다.')
      router.reload()
    } catch (err) {
      alert('카테고리 생성에 실패했습니다.')
      console.log(err.message)
    }
  }

  return (
    <Modal
      size={'small'}
      open={isModalOpen}
      trigger={trigger}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
    >
      <Modal.Header>카테고리 생성</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleCreate}>
          <Form.Input
            required
            label={'카테고리 이름'}
            placeholder={"생성할 카테고리 이름을 입력해주세요."}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Button
            style={{
              backgroundColor: theme.color.inpostack_blue2, color: 'white',
            }}
          >
            <Icon name="save" style={{ marginRight: '0.5rem' }}/>
            저장
          </Form.Button>
        </Form>
      </Modal.Content>
    </Modal>
  )
}
