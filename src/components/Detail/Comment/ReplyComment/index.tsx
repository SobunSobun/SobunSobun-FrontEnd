import styles from '../comment.module.scss'

interface Props {
  reply: {
    nickname: string
    time: string
    content: string
  }
}
const ReplyComment = ({ reply }: Props) => {
  return (
    <div className={styles.commentReply}>
      <div className={styles.commentBox}>
        <span className={styles.profile} />
        <span className={styles.nickname}>{reply.nickname}</span>
        <div className={styles.text}>{reply.content}</div>
      </div>
      <div className={styles.commentInfo}>
        <span>9시간 전</span>
      </div>
    </div>
  )
}

export default ReplyComment
