import styles from './comment.module.scss'

const Comment = () => {
  return (
    <div className={styles.comment}>
      <div className={styles.commentList}>
        <div className={styles.commentSingle}>
          <div className={styles.commentBox}>
            <span className={styles.profile}>이미지</span>
            <span className={styles.nickname}>닉네임</span>
            <div className={styles.text}>혹시 5시 30분도 가능하나요?</div>
          </div>
          <div className={styles.commentInfo}>
            <span>9시간전</span>
            <span>답글쓰기</span>
          </div>
        </div>
        <div className={styles.commentReply}>
          <div className={styles.commentBox}>
            <span className={styles.profile}>이미지</span>
            <span className={styles.nickname}>ZEONE</span>
            <div className={styles.text}>가능합니다~</div>
          </div>
          <div className={styles.commentInfo}>
            <span>9시간전</span>
          </div>
        </div>
      </div>
      <div className={styles.commentInput}>
        <input type='text' placeholder='댓글을 입력해주세요.' />
      </div>
    </div>
  )
}

export default Comment
