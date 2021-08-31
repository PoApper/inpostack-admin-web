import React, { useState } from 'react'
import DaumPostCode from 'react-daum-postcode'
import { Button, Input, Modal } from 'semantic-ui-react'
import styled from 'styled-components'

const Postcode = (props) => {
  const [open, setOpen] = useState(false)

  const handleComplete = (data) => {
    let fullAddress = data.address
    let extraAddress = ''
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== ''
          ? `, ${data.buildingName}`
          : data.buildingName)
      }
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '')
    }
    props.handleAddress(fullAddress, data.zonecode)
    setOpen(false)
  }

  return(
    <div>
      <Button onClick={()=>setOpen(true)}>주소 찾기</Button>
      <AddressInput name="zipcode" id="zipcode"
                    defaultValue={props.zipcode}/>
      <Modal open={open}
             onClose={()=> setOpen(false)}
             onOpen={()=> setOpen(true)}
      >
        <Modal.Header>가게 주소 찾기</Modal.Header>
        <Modal.Content>
          <DaumPostCode onComplete={handleComplete}
                        className="post-code"/>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default Postcode

const AddressInput = styled(Input)`
  margin: 0.5rem 0;
`