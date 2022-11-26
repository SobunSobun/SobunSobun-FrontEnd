import { Dispatch, SetStateAction } from 'react'
import { CommentType, ReplyCommentType } from 'types'
import styles from '../comment.module.scss'
import ReplyComment from '../ReplyComment'

interface Props {
  comment: CommentType
  postId: string
  setParentCommentIdValue: Dispatch<SetStateAction<number>>
}
const SingleComment = ({ comment, postId, setParentCommentIdValue }: Props) => {
  // const [replyValue, setReplyValue] = useState('')
  // const [replyShow, setReplyShow] = useState(false)

  // const { mutate: postReplyCommentAPI } = useReplyComment()

  // const postReplyComment = (parentCommentId: number, formData: FormData) => {
  //   postReplyCommentAPI({ postId, parentCommentId, formData })
  // }

  // const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
  //   setReplyValue(e.target.value)
  // }

  // const onSubmit = (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   if (replyValue === '') return

  //   const formData = new FormData()
  //   formData.append('content', replyValue)
  //   postReplyComment(comment.parentCommentId, formData)
  //   setReplyValue('')
  // }

  return (
    <div className={styles.commentSingle}>
      <div className={styles.commentBox}>
        <span className={styles.profile}>{comment.profileUrl}</span>
        <span className={styles.nickname}>{comment.nickname}</span>
        <div className={styles.text}>{comment.content}</div>
      </div>
      <div className={styles.commentInfo}>
        <span>{comment.createdAt}</span>
        {/* <span className={styles.btn} role='presentation' onClick={() => setReplyShow(!replyShow)}> */}
        <span
          className={styles.btn}
          role='presentation'
          onClick={() => {
            setParentCommentIdValue(comment.parentCommentId)
          }}
        >
          답글쓰기
        </span>
      </div>
      {comment.childComments?.map((reply: ReplyCommentType) => {
        return <ReplyComment reply={reply} key={reply.childCommentId} />
      })}
      {/* {replyShow && (
        <form className={`${styles.commentInput} ${styles.replyInput}`} onSubmit={onSubmit}>
          <input type='text' value={replyValue} onChange={handleInput} placeholder='답글을 입력해주세요.' />
        </form>
      )} */}
    </div>
  )
}

export default SingleComment
