import { useEffect, useState } from 'react'
import axios from 'axios'
import { Comment, Header } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'

const ReviewList = ({ store_uuid }) => {
  const [reviewList, setReviewList] = useState([])

  useEffect(() => {
    if (!store_uuid) return
    axios.get(`${process.env.NEXT_PUBLIC_API}/review/store/${store_uuid}`).
      then(res => setReviewList(res.data)).
      catch(() => alert(`리뷰 목록을 불러오는데 실패했습니다.`))
  }, [store_uuid])

  return (
    <CommentDiv>
      <Header>리뷰</Header>
      {
        reviewList.map(review => {
          return (
            <Comment key={review.uuid} style={{ marginTop: 8 }}>
              <Comment.Content>
                <Comment.Text>
                  {review.content}
                </Comment.Text>
                <Comment.Metadata>
                  <div>{moment(review.created_at).
                    format('YYYY-MM-DD hh:mm')}</div>
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          )
        })
      }
    </CommentDiv>
  )
}

export default ReviewList

const CommentDiv = styled.div`
  width: 100%;
  margin: 3rem 0;
`