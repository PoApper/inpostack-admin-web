import MenuUpdateModal from './menuUpdateModal'
import { Button } from 'semantic-ui-react'
import styled from 'styled-components'

const MenuCard = ({ menu, categoryInfo }) => {
  return (
    <CardDiv key={menu.uuid}>
      <InfoColumn>
        <MenuText>{menu.name}</MenuText>
        <DescriptionText>
          {menu.description}
        </DescriptionText>
        <PriceText>
          {menu.price.toLocaleString()}원
        </PriceText>
        <div>
          <MenuUpdateModal
            menuInfo={menu}
            categoryUUID={categoryInfo.uuid}
            categoryName={categoryInfo.name}
            trigger={<Button className={'modal_button'}>
              메뉴 수정
            </Button>}
          />
        </div>
      </InfoColumn>
      <ImageColumn>
        <img src={menu.image_url ?? 'https://via.placeholder.com/100'}
             alt={`${menu.name}_photo`}
             width={100} height={100}
             style={{ marginBottom: '0.6rem' }}/>
      </ImageColumn>
    </CardDiv>
  )
}

export default MenuCard

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  background-color: white;

  border-radius: 10px;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 6%);
  transition: all 0.25s;

  &:hover {
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 12%);
  }
`

const MenuText = styled.h4`
  font-size: 20px;
  margin: 0 0 5px 0;
`

const PriceText = styled.p`
  font-weight: 700;
  font-size: 14px;
  margin: 0;
`

const DescriptionText = styled.p`
  margin: 0;
  color: grey;
`

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageColumn = styled.div`
  margin-left: auto;
`
