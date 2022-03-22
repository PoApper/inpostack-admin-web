import { Button, Icon, Image } from 'semantic-ui-react'
import styled from 'styled-components'
import StoreLogoAddModal from './StoreLogoAddModal'
import StoreImageAddModal from './StoreImageAddModal'
import StoreUpdateModal from './StoreUpdateModal'

const StoreIndexHeader = ({ storeWithAll, store_name }) => {
  return (
    <StoreHeadWrapper>
      <div style={{ marginRight: 40, marginBottom: 16 }}>
        <Image
          src={storeWithAll.image_url ??
            'https://via.placeholder.com/160'}
          alt={'store_logo'}
          width={200}
        />
        <StoreLogoAddModal
          store_uuid={storeWithAll.uuid}
          trigger={
            <Button compact style={{width: 200}}>
              로고 변경 <Icon name={'redo'} style={{marginLeft: 4}}/>
            </Button>
          }
        />
      </div>

      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 32 }}>
            {store_name}
          </h2>

          <div style={{minWidth: 160}}>
            <Button basic>
              <Icon fitted color={'orange'}
                    name={'star'}/>
              <span style={{ marginLeft: 4 }}>
                            {Number(storeWithAll.favorite_count).
                              toLocaleString()}
                          </span>
            </Button>
            <Button basic>
              <Icon fitted color={'orange'}
                    name={'eye'}/>
              <span style={{ marginLeft: 4 }}>
                            {Number(storeWithAll.visit_count).toLocaleString()}
                          </span>
            </Button>
          </div>
        </div>

        <div>
          <Button.Group style={{ marginBottom: '9px' }}>
            <StoreImageAddModal store_uuid={storeWithAll.uuid}/>
            <StoreUpdateModal storeInfo={storeWithAll} trigger={
              <Button>
                정보 수정
              </Button>
            }/>
          </Button.Group>
        </div>

        <div>
          <p>
            가게 로고, 가게 이미지는 AWS CloudFront에 캐싱되기 때문에 사진 변경 후 몇 분 뒤에 반영됩니다!
            <br/>
            가게 로고는 새 이미지를 업로드하면 덮어씌워 집니다.
          </p>
          <p>
            가게 이미지는 <b>정확히</b> 4개만 업로드 합니다. (관리자 페이지에서 가게 이미지 삭제 기능은 추후 개발)
            <br/>
            <b>저작권</b>에 저촉되지 않기 위해, (1) 가게에서 공식적으로 제공하는 사진이거나 (2) 본인이 직접 찍은 사진만 업로드 해주세요.
            <br/>
            업로드 하면 안 되는 사진: 개인 블로그, 인스타 등에 게시된 사진
          </p>
        </div>
      </div>
    </StoreHeadWrapper>
  )
}

export default StoreIndexHeader

const StoreHeadWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    flex-direction: column;
  }
`