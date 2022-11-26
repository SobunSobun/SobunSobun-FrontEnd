import { ChangeEvent, FormEvent, useState } from 'react'
import { authInstance } from 'apis/client'
import { useQuery } from 'react-query'
import { CommentType } from 'types'
import useComment from 'hooks/useComment'
import useReplyComment from 'hooks/useCommentReply'
import styles from './comment.module.scss'
import SingleComment from './SingleComment'

interface Props {
  postId: string
}

const getCommentAPI = (postId: string | undefined) => authInstance.get(`parentComment/${postId}`)

const Comment = ({ postId }: Props) => {
  const { data } = useQuery(['getCommentAPI', postId], () => getCommentAPI(postId).then((res) => res.data))
  const { mutate: postCommentAPI } = useComment()
  const { mutate: postReplyCommentAPI } = useReplyComment()

  const [commentValue, setCommentValue] = useState('')
  const [parentCommentIdValue, setParentCommentIdValue] = useState(0)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  const postComment = (formData: FormData) => {
    postCommentAPI({ postId, formData })
  }

  const postReplyComment = (parentCommentId: number, formData: FormData) => {
    postReplyCommentAPI({ postId, parentCommentId, formData })
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (commentValue === '') return
    const formData = new FormData()
    formData.append('content', commentValue)
    parentCommentIdValue ? postReplyComment(parentCommentIdValue, formData) : postComment(formData)
    setCommentValue('')
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentList}>
        {data?.length ? (
          <div className={styles.commentListBlock}>
            {data.map((comment: CommentType) => {
              return (
                <SingleComment
                  comment={comment}
                  postId={postId}
                  key={comment.parentCommentId}
                  setParentCommentIdValue={setParentCommentIdValue}
                />
              )
            })}
          </div>
        ) : (
          <div className={styles.commentListNone}>아직 댓글이 없어요!</div>
        )}
      </div>
      <form className={styles.commentInput} onSubmit={onSubmit}>
        <input
          type='text'
          value={commentValue}
          onChange={handleInput}
          placeholder={parentCommentIdValue ? '답글쓰기' : '댓글을 입력해주세요.'}
        />
      </form>
    </div>
  )
}

export default Comment
