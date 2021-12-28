import styled from 'styled-components'
import { Button } from 'semantic-ui-react'
import MenuContainer from './menuContainer'
import { CategoryCreateModal } from './categoryModals'

const MenuGrid = (props) => {
  const categoriesWithMenu = props.categoriesWithMenu
  const store_uuid = props.store_uuid

  return (
    <MenuWrapper>
      <NewCategoryCard>
        <p style={{ flex: 1 }}>
          <b>카테고리</b>를 추가해보세요! 인포스택에는 총 <b>200</b>개의 카테고리들이 있으며 음식점들은
          평균 <b>4.2</b>개의
          카테고리를 가지고 있습니다!
        </p>
        <CategoryCreateModal
          store_uuid={store_uuid}
          trigger={
            <Button className={'modal_button create_button'}>
              카테고리 생성
            </Button>
          }
        />
      </NewCategoryCard>
      <MenuArea>
        {
          categoriesWithMenu && categoriesWithMenu.map(category => {
            return (
              <MenuContainer
                key={category.uuid}
                categoryWithMenu={category}
                store_uuid={store_uuid}/>
            )
          })
        }
      </MenuArea>
    </MenuWrapper>
  )
}

export default MenuGrid

const MenuWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 1rem;
`

const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 30px;
  gap: 1rem;
`

const NewCategoryCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  background-color: white;

  border-radius: 10px;
`
