import { Button, Icon, Image } from 'semantic-ui-react'
import StoreLogoAddModal from './StoreLogoAddModal'
import StoreImageAddModal from './StoreImageAddModal'
import Link from 'next/link'

const StoreIndexHeader = ({ storeWithAll, store_name }) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', marginBottom: 20}}>
      <div style={{ marginRight: 40 }}>
        <Image
          src={storeWithAll.image_url ??
            'https://via.placeholder.com/160'}
          alt={'store_logo'}
          width={200}
        />
        <StoreLogoAddModal store_uuid={storeWithAll.uuid}/>
      </div>

      <div style={{ width: '100%' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <h2 style={{ fontSize: 32 }}>
            {store_name}
          </h2>

          <div>
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
            <Link href={`/store/${store_name}/information`} passHref>
              <Button>정보 수정</Button>
            </Link>
          </Button.Group>
        </div>

        <div>
          가게 로고, 가게 이미지는 AWS CloudFront에 캐싱되기 때문에 사진 변경 후 몇 분 뒤에 반영됩니다!
          <br/>
          가게 로고는 새 이미지를 업로드하면 덮어씌워 집니다.
          <br/>
          가게 이미지는 <b>정확히</b> 4개만 업로드 합니다. (관리자 페이지에서 가게 이미지 삭제 기능은 추후 개발)
        </div>
      </div>
    </div>
  )
}

export default StoreIndexHeader