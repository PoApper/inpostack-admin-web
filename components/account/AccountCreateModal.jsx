import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'
import {Form, Modal, Icon} from 'semantic-ui-react'

const AccountCreateModal = (props) => {
  const [open, setOpen] = useState(false)
  const [sendMail, setSendMail] = useState(false)
  const [email, setEmail] = useState('')
  const [id, setId] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [account_type, setAccount_type] = useState('')


  const AccountOptions = Object.entries(props.accountType)
    .map((type) => {
      const [key, value] = type;
      return {key: key, text: value, value: value}
    });

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register?sendMail=${sendMail}`, {
        email: email,
        id: id,
        name: name,
        password: password,
        account_type: account_type
      }, {withCredentials: true});
      window.location.reload();
    } catch (err) {
      throw err;
    }
  }

  return(
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<CreateButton>Account <Icon name='add circle'/></CreateButton>}
    >
      <Modal.Header>계정 생성</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Input required
                      label='email'
                      name='email'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Checkbox
            label='인증 메일 보내기'
            name="sendMail"
            checked={sendMail}
            onChange={(e) => setSendMail(true)}
          />
          <Form.Input required
                      label='ID'
                      name='id'
                      value={id}
                      onChange={(e) => setId(e.target.value)}
          />
          <Form.Input required
                      label='password'
                      name='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
          />
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
          <FormButton onClick={handleSubmit}>Create <Icon name='add circle'/></FormButton>
        </Form>
      </Modal.Content>
    </Modal>
  )

}

export default AccountCreateModal

const CreateButton = styled.button`
  cursor: pointer;
  width: 110px;
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