import React from 'react'
import { Segment } from 'semantic-ui-react'
import { Mobile, PC, Tablet } from '../MediaQuery'
import { isBlurry } from '../../utils/blurry-check'

const StoreInformation = ({ storeInfo }) => {

  return (
    <>
      <PC>
        <Segment.Group>
          <Segment.Group horizontal>
            <Segment style={{ flex: 1 }}>
              <h5>상호명</h5>
              <span>{storeInfo.name}</span>
            </Segment>
            <Segment style={{ flex: 1 }}>
              <h5>전화번호</h5>
              {
                isBlurry(storeInfo.phone) ? (
                  <span className={'blurry-text'}>정보 수집중</span>
                ) : (
                  <span>{storeInfo.phone}</span>
                )
              }
            </Segment>
          </Segment.Group>
          <Segment>
            <h5>가게 주소</h5>
            {
              isBlurry(storeInfo.address1) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                storeInfo.naver_map_url ? (
                  <a href={storeInfo.naver_map_url} target={'_blank'}
                     rel={'noreferrer'}>
                    {storeInfo.address1} {storeInfo.address2}
                  </a>
                ) : (
                  <span>
                    {storeInfo.address1} {storeInfo.address2}
                  </span>
                )
              )
            }
            <br/>
            <span style={{color: 'gray'}}>
              (우) {storeInfo.zipcode}
            </span>
          </Segment>
          <Segment>
            <h5>운영 시간</h5>
            {
              isBlurry(storeInfo.open_time) || isBlurry(storeInfo.close_time) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                <span>{storeInfo.open_time} ~ {storeInfo.close_time}</span>
              )
            }
          </Segment>
          <Segment>
            <h5>가게 소개</h5>
            {
              isBlurry(storeInfo.description) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                <span>{storeInfo.description}</span>
              )
            }
          </Segment>
          <Segment>
            <h5>가게 타입</h5>
            {storeInfo.store_type}
          </Segment>
        </Segment.Group>
      </PC>

      <Tablet>
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '20px',
          }}>
            <Segment.Group>
              <Segment.Group horizontal>
                <Segment style={{ flex: 1 }}>
                  <h5>상호명</h5>
                  {storeInfo.name}
                </Segment>
                <Segment style={{ flex: 1 }}>
                  <h5>전화번호</h5>
                  {
                    isBlurry(storeInfo.phone) ? (
                      <span className={'blurry-text'}>정보 수집중</span>
                    ) : (
                      <span>{storeInfo.phone}</span>
                    )
                  }
                </Segment>
              </Segment.Group>
              <Segment>
                <h5>가게 주소</h5>
                {
                  isBlurry(storeInfo.address1) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    storeInfo.naver_map_url ? (
                      <a href={storeInfo.naver_map_url} target={'_blank'}
                        rel={'noreferrer'}>
                        {storeInfo.address1} {storeInfo.address2}
                      </a>
                    ) : (
                      <span>
                        {storeInfo.address1} {storeInfo.address2}
                      </span>
                    )
                  )
                }
                <br/>
                <span style={{color: 'gray'}}>
                  (우) {storeInfo.zipcode}
                </span>
              </Segment>
              <Segment.Group horizontal>
                <Segment>
                  <h5>여는 시간</h5>
                  {
                  isBlurry(storeInfo.open_time) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.open_time}</span>
                  )
                  }
                </Segment>
                <Segment>
                  <h5>닫는 시간</h5>
                  {
                  isBlurry(storeInfo.close_time) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.close_time}</span>
                  )
                  }
                </Segment>
              </Segment.Group>
              <Segment>
                <h5>가게 소개</h5>
                {
                  isBlurry(storeInfo.description) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.description}</span>
                  )
                }
              </Segment>
              <Segment>
                <h5>가게 타입</h5>
                {storeInfo.store_type}
              </Segment>
            </Segment.Group>
          </div>
      </Tablet>
      <Mobile>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <Segment.Group>
            <Segment.Group horizontal>
              <Segment style={{ flex: 1 }}>
                <h5>상호명</h5>
                {storeInfo.name}
              </Segment>
              <Segment style={{ flex: 1 }}>
                <h5>전화번호</h5>
                {
                  isBlurry(storeInfo.phone) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.phone}</span>
                  )
                }
              </Segment>
            </Segment.Group>
            <Segment>
              <h5>가게 주소</h5>
              {
                isBlurry(storeInfo.address1) ? (
                  <span className={'blurry-text'}>정보 수집중</span>
                ) : (
                  storeInfo.naver_map_url ? (
                    <a href={storeInfo.naver_map_url} target={'_blank'}
                      rel={'noreferrer'}>
                      {storeInfo.address1} {storeInfo.address2}
                    </a>
                  ) : (
                    <span>
                      {storeInfo.address1} {storeInfo.address2}
                    </span>
                  )
                )
              }
              <br/>
              <span style={{color: 'gray'}}>
                (우) {storeInfo.zipcode}
              </span>
            </Segment>
            <Segment.Group horizontal>
              <Segment>
                <h5>여는 시간</h5>
                {
                  isBlurry(storeInfo.open_time) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.open_time}</span>
                  )
                  }
              </Segment>
              <Segment>
                <h5>닫는 시간</h5>
                {
                  isBlurry(storeInfo.close_time) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.close_time}</span>
                  )
                  }
              </Segment>
            </Segment.Group>
            <Segment>
              <h5>가게 소개</h5>
              {
                  isBlurry(storeInfo.description) ? (
                    <span className={'blurry-text'}>정보 수집중</span>
                  ) : (
                    <span>{storeInfo.description}</span>
                  )
                }
            </Segment>
            <Segment>
              <h5>가게 타입</h5>
              {storeInfo.store_type}
            </Segment>
          </Segment.Group>
        </div>
      </Mobile>
    </>
  )
}

export default StoreInformation
