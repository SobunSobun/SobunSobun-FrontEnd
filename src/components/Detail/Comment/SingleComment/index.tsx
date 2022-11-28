import { Dispatch, SetStateAction } from 'react'
import { CommentType, ReplyCommentType } from 'types'
import cx from 'classnames'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from '../comment.module.scss'
import ReplyComment from '../ReplyComment'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)

interface Props {
  comment: CommentType
  handleFocus: () => void
  setParentCommentIdValue: Dispatch<SetStateAction<number>>
  parentCommentIdValue: number
  isActive: boolean
}
const SingleComment = ({ comment, setParentCommentIdValue, parentCommentIdValue, handleFocus, isActive }: Props) => {
  const days = dayjs(
    `${comment.createdAt[0]}-${comment.createdAt[1]}-${comment.createdAt[2]} ${comment.createdAt[3]}:${comment.createdAt[4]}:${comment.createdAt[5]}`
  ).fromNow()

  return (
    <div className={styles.commentSingle}>
      <div
        className={cx(styles.commentWrapper, {
          [styles.active]: isActive && parentCommentIdValue === comment.parentCommentId,
        })}
      >
        <div className={styles.commentBox}>
          <span className={styles.profile}>
            <img src={comment.profileUrl} alt='' />
          </span>
          <span className={styles.nickname}>{comment.nickname}</span>
          <div className={styles.text}>{comment.content}</div>
        </div>
        <div className={styles.commentInfo}>
          <span>{days}</span>
          <span
            className={styles.btn}
            role='presentation'
            onClick={() => {
              handleFocus()
              setParentCommentIdValue(comment.parentCommentId)
            }}
          >
            답글쓰기
          </span>
        </div>
      </div>
      {comment.childComments?.map((reply: ReplyCommentType) => {
        return <ReplyComment reply={reply} key={reply.childCommentId} />
      })}
    </div>
  )
}

export default SingleComment
