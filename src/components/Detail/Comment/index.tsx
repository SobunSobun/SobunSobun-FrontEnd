import { ChangeEvent, FormEvent, useRef, useState } from 'react'
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

  const postComment = (formData: FormData) => {
    postCommentAPI({ postId, formData })
  }

  const postReplyComment = (parentCommentId: number, formData: FormData) => {
    postReplyCommentAPI({ postId, parentCommentId, formData })
  }

  const inputRef = useRef<HTMLInputElement>(null)
  const [isActive, setIsActive] = useState(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  const handleFocus = () => {
    inputRef.current?.focus()
    setIsActive(true)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (commentValue === '') return
    const formData = new FormData()
    formData.append('content', commentValue)
    parentCommentIdValue ? postReplyComment(parentCommentIdValue, formData) : postComment(formData)
    setCommentValue('')
    inputRef.current?.blur()
    setIsActive(false)
    setParentCommentIdValue(0)
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentList}>
        {data?.length ? (
          <div className={styles.commentListBlock}>
            {data.map((comment: CommentType) => {
              return (
                <SingleComment
                  handleFocus={handleFocus}
                  comment={comment}
                  key={comment.parentCommentId}
                  setParentCommentIdValue={setParentCommentIdValue}
                  parentCommentIdValue={parentCommentIdValue}
                  isActive={isActive}
                />
              )
            })}
          </div>
        ) : (
          <div className={styles.commentListNone}>아직 댓글이 없어요!</div>
        )}
      </div>
      <div className={styles.commentInput}>
        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            type='text'
            value={commentValue}
            onChange={handleInput}
            onBlur={() => {
              if (!commentValue) {
                setIsActive(false)
                setParentCommentIdValue(0)
              }
            }}
            placeholder={parentCommentIdValue && isActive ? '대댓글을 입력하세요.' : '댓글을 입력해주세요.'}
          />
        </form>
      </div>
    </div>
  )
}

export default Comment
