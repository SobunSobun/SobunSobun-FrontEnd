import { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../comment.module.scss'
import ReplyComment from '../ReplyComment'

interface Props {
  comment: {
    nickname: string
    time: string
    content: string
  }
}
const SingleComment = ({ comment }: Props) => {
  const [replyValue, setReplyValue] = useState('')
  const [replyArray, setReplyArray] = useState([
    {
      nickname: 'nick',
      content: '가능합니다',
      time: '9시간 전',
    },
  ])
  const [replyShow, setReplyShow] = useState<boolean>(false)

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setReplyValue(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (replyValue === '') return
    if (replyArray) {
      setReplyArray((commentValueList) => [...commentValueList, { nickname: '', time: '', content: replyValue }])
    }
    setReplyValue('')
    // console.log(commentArray)
    // axios.post()
  }

  return (
    <div className={styles.commentSingle}>
      <div className={styles.commentBox}>
        <span className={styles.profile} />
        <span className={styles.nickname}>{comment.nickname}</span>
        <div className={styles.text}>{comment.content}</div>
      </div>
      <div className={styles.commentInfo}>
        <span>{comment.time}</span>
        <span className={styles.btn} role='presentation' onClick={() => setReplyShow(!replyShow)}>
          답글쓰기
        </span>
      </div>
      {replyArray.map((reply, index: number) => {
        // eslint-disable-next-line react/no-array-index-key
        return <ReplyComment reply={reply} key={index} />
      })}
      {replyShow && (
        <form className={`${styles.commentInput} ${styles.replyInput}`} onSubmit={onSubmit}>
          <input type='text' value={replyValue} onChange={handleInput} placeholder='답글을 입력해주세요.' />
        </form>
      )}
    </div>
  )
}

export default SingleComment
