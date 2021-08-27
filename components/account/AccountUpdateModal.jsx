import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { updateAccount, deleteAccount } from '../../requests/accountAPI'
import styled from 'styled-components'
import {Button, Form, Modal} from 'semantic-ui-react'

const AccountUpdateModal = (props) => {
  const router = useRouter()
  const accountInfo = props.accountInfo
  const uuid = props.accountInfo.uuid

  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState(accountInfo.email)
  const [id, setId] = useState(accountInfo.id)
  const [name, setName] = useState(accountInfo.name)
  const [account_type, setAccount_type] = useState(accountInfo.account_type)
  const [doesSendEmail, setDoesSendEmail ] = useState(false)

  const AccountOptions = Object.entries(props.accountType)
    .map((type) => {
      const [key, value] = type;
      return {key: key, text: value, value: value}
    });

  async function handleUpdate (e) {
    e.preventDefault()
    try {
      await updateAccount({
        email, id, name, account_type, doesSendEmail, uuid
      })
      setOpen(false)
      alert('계정을 수정했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('계정 수정에 실패했습니다.')
      console.log(err)
    }
  }

  async function handleDelete (e) {
    e.preventDefault()
    try {
      await deleteAccount({
        uuid,
      })
      setOpen(false)
      alert('계정을 삭제했습니다.')
      router.reload(window.location.pathname)
    } catch (err) {
      alert('계정 삭제에 실패했습니다.')
      console.log(err)
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={props.trigger}>
      <Modal.Header>계정 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input required
                      label='email'
                      name='email'
                      value={email}
                      onChange={(e) => {setEmail(e.target.value)}}
          />
          <Form.Checkbox
            label='인증 메일 보내기'
            name='doesSendEmail'
            checked={doesSendEmail}
            onChange={(e) => setDoesSendEmail(true)}
          />
          <Form.Input required
                      label='ID'
                      name='id'
                      value={id}
                      onChange={(e) => setId(e.target.value)}
          />
          <div className="field">
            <label>비밀번호</label>
              {/* TODO: implement password reset logic in API */}
            <Button disabled>
              비밀번호 재설정
            </Button>
            <span style={{padding: "5px"}}>
              비밀번호가 재설정 되고, 유저에게 재설정된 비밀번호가 발송됩니다.
            </span>
          </div>
          <Form.Input required
                      label='이름'
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
          />

          <Form.Select required
                       label='계정 타입'
                       name='account_type'
                       value={account_type}
                       placeholder="계정 타입을 선택하세요"
                       options={AccountOptions}
                       onChange={(e, {value}) => setAccount_type(value?.toString())}
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

export default AccountUpdateModal

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