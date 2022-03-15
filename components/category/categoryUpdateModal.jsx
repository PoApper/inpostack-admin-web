import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Form, Icon, Modal } from 'semantic-ui-react'

import theme from '../../styles/theme'

export const CategoryUpdateModal = ({ storeUuid, trigger, categoryInfo }) => {
  const router = useRouter()

  const [isModalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState(categoryInfo.name)

  async function handleUpdate (e) {
    e.preventDefault()
    if (!storeUuid) {
      alert('유효하지 않은 가게 정보 입니다.')
      return;
    }

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API}/category/${categoryInfo.uuid}`, {
          name: name,
          store_uuid: storeUuid,
        }, { withCredentials: true })
      alert('카테고리 정보를 수정 했습니다.')
      router.reload()
    } catch (err) {
      alert('카테고리 정보 수정에 실패했습니다.')
      console.log(err.message)
    }
  }

  async function handleDelete (e) {
    e.preventDefault()

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API}/category/${categoryInfo.uuid}`,
        { withCredentials: true })
      alert('카테고리를 삭제 했습니다.')
      router.reload()
    } catch (err) {
      alert('카테고리 삭제에 실패했습니다.')
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
      <Modal.Header>카테고리 수정</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleUpdate}>
          <Form.Input
            required
            label={'변경할 이름'}
            placeholder={'수정할 카테고리 이름을 입력해주세요.'}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Group>
            <Form.Button>
              <Icon name="save" style={{ marginRight: '0.5rem' }}/>
              저장
            </Form.Button>
            <Form.Button
              style={{
                backgroundColor: theme.color.inpostack_red2, color: 'white',
              }}
              onClick={handleDelete}>
              <Icon name="delete" style={{ marginRight: '0.5rem' }}/>
              삭제
            </Form.Button>
          </Form.Group>
        </Form>

      </Modal.Content>
    </Modal>
  )

}
