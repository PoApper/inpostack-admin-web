import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { Form, Icon, Modal } from 'semantic-ui-react'

import theme from '../../styles/theme'

export const CategoryCreateModal = (props) => {
  const router = useRouter()

  const [isModalOpen, setModalOpen] = useState(false)
  const [name, setName] = useState('')
  const store_uuid = props.store_uuid

  async function handleCreate (e) {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/category`, {
        name: name,
        store_uuid: store_uuid,
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
      trigger={props.trigger}
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

export const CategoryUpdateModal = (props) => {
  const router = useRouter()

  const [isModalOpen, setModalOpen] = useState(false)
  const categoryInfo = props.categoryInfo
  const [name, setName] = useState(categoryInfo.name)
  const store_uuid = props.store_uuid

  async function handleUpdate (e) {
    e.preventDefault()

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API}/category/${categoryInfo.uuid}`, {
          name: name,
          store_uuid: store_uuid,
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
    } catch(err) {
      alert('카테고리 삭제에 실패했습니다.')
    }
  }

  return (
    <Modal
      size={'small'}
      open={isModalOpen}
      trigger={props.trigger}
      onClose={() => setModalOpen(false)}
      onOpen={() => setModalOpen(true)}
    >
      <Modal.Header>카테고리 수정</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleUpdate}>
          <Form.Input
            required
            label={'변경할 이름'}
            placeholder={"수정할 카테고리 이름을 입력해주세요."}
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
