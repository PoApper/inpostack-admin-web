import React, { useState } from 'react'
import DaumPostCode from 'react-daum-postcode'
import { Button, Input, Modal } from 'semantic-ui-react'

const Postcode = ({zipcode, address1, handleAddress}) => {
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
    handleAddress(data.zonecode, fullAddress)
    setOpen(false)
  }

  return(
    <div>
      <div>
        <Button onClick={() => setOpen(true)}>
          주소 찾기
        </Button>
      </div>

      <Input
        name="zipcode"
        defaultValue={zipcode}
        onClick={() => setOpen(true)}
        style={{marginBottom: 5, marginTop: 8}}
      />
      <Input
        name="address1"
        defaultValue={address1}
        onClick={() => setOpen(true)}
        style={{marginBottom: 5}}
      />

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
