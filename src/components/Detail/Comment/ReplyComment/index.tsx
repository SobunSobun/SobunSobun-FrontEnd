import { ReplyCommentType } from 'types'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import styles from '../comment.module.scss'
import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)
interface Props {
  reply: ReplyCommentType
}

const ReplyComment = ({ reply }: Props) => {
  const days = dayjs(
    `${reply.createdAt[0]}-${reply.createdAt[1]}-${reply.createdAt[2]} ${reply.createdAt[3]}:${reply.createdAt[4]}:${reply.createdAt[5]}`
  ).fromNow()
  return (
    <div className={styles.commentReply}>
      <div className={styles.commentBox}>
        <span className={styles.profile}>{reply.profileUrl}</span>
        <span className={styles.nickname}>{reply.nickname}</span>
        <div className={styles.text}>{reply.content}</div>
      </div>
      <div className={styles.commentInfo}>
        <span>{days}</span>
      </div>
    </div>
  )
}

export default ReplyComment
