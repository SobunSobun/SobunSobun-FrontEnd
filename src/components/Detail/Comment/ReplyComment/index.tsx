import { ReplyCommentType } from 'types'
import styles from '../comment.module.scss'

interface Props {
  reply: ReplyCommentType
}
const ReplyComment = ({ reply }: Props) => {
  return (
    <div className={styles.commentReply}>
      <div className={styles.commentBox}>
        <span className={styles.profile}>{reply.profileUrl}</span>
        <span className={styles.nickname}>{reply.nickname}</span>
        <div className={styles.text}>{reply.content}</div>
      </div>
      <div className={styles.commentInfo}>
        <span>{reply.createdAt}</span>
      </div>
    </div>
  )
}

export default ReplyComment
