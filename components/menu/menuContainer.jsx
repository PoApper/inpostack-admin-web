import { useState } from 'react'
import styled from 'styled-components'
import { Accordion, Button, Icon } from 'semantic-ui-react'

import MenuCreateModal from './menuCreateModal'
import MenuCard from './menuCard'
import { CategoryUpdateModal } from '../category/categoryUpdateModal'

const MenuContainer = ({ storeUuid, categoryWithMenu }) => {
  const categoryName = categoryWithMenu.name
  const menus = categoryWithMenu.menu

  const [isActive, setActive] = useState(true)

  return (
    <MenuWrapper>
      <Accordion>
        <Accordion.Title
          active={isActive}
          onClick={() => setActive(!isActive)}
        >
          <CategoryTitle>
            <Icon name="dropdown"/>
            {
              `${categoryName} (${menus.length})`
            }
            <CategoryUpdateModal
              categoryInfo={categoryWithMenu}
              trigger={
                <Button className={'modal_button margin_left_8px'}
                        style={{ marginLeft: '10px' }}
                >
                  카테고리 수정
                </Button>
              }
            />
            <MenuCreateModal
              store_uuid={storeUuid}
              categoryUUID={categoryWithMenu.uuid}
              categoryName={categoryWithMenu.name}
              trigger={
                <Button
                  className={'modal_button margin_left_8px create_button'}>
                  메뉴 추가
                </Button>
              }
            />
          </CategoryTitle>
        </Accordion.Title>
        <Accordion.Content
          active={isActive}
        >
          <MenuGrid>
            {
              menus.map((menu) => {
                return (
                  <MenuCard
                    key={menu.uuid}
                    menu={menu}
                    categoryInfo={categoryWithMenu}/>
                )
              })
            }
          </MenuGrid>
        </Accordion.Content>
      </Accordion>

    </MenuWrapper>
  )
}

export default MenuContainer

const MenuWrapper = styled.div`
  background-color: white;
  padding-bottom: 10px;
`

const CategoryTitle = styled.h3`
  display: flex;
  padding-top: 10px;
  padding-left: 1rem;
  justify-items: center;
`

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 10px 1rem 20px;
  grid-gap: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }
`