import styled from 'styled-components'
import { Button, Image } from 'semantic-ui-react'
import MenuUpdateModal from './menuUpdateModal'

const MenuCard = ({ menu, categoryInfo }) => {
  return (
    <MenuInfo key={menu.uuid}>
      <ImageColumn>
        <Image src={menu.image_url ??
          'https://via.placeholder.com/200?text=InPoStack'}
               alt={`${menu.name}_photo`}
               width={240} height={240}
               rounded
               style={{ marginBottom: 10, minWidth: '160' }}/>
      </ImageColumn>

      <div>
        <h3 style={{ marginBottom: 0 }}>
          {menu.name}
          <br/>
        </h3>
        <PriceText>
          {menu.price.toLocaleString()}원
        </PriceText>

        <MenuUpdateModal
          menuInfo={menu}
          categoryUUID={categoryInfo.uuid}
          categoryName={categoryInfo.name}
          trigger={
            <Button className={'modal_button'}>
              메뉴 수정
            </Button>
          }
        />
      </div>
    </MenuInfo>
  )
}

export default MenuCard

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  align-content: center;
  justify-content: center;
`

const PriceText = styled.p`
  font-size: 16px;
`

const ImageColumn = styled.div`
  margin-bottom: 12px;
  width: 100%;
`
