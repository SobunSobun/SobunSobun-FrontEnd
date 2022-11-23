import { ChangeEvent, FormEvent, useState } from 'react'
import styles from './comment.module.scss'
import SingleComment from './SingleComment'

const Comment = () => {
  const [commentValue, setCommentValue] = useState('')
  const [commentArray, setCommentArray] = useState([
    {
      id: 1,
      nickname: 'Joo',
      content: '혹시 5시 30분도 가능하나요?',
      time: '9시간 전',
    },
  ])

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCommentValue(e.target.value)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (commentValue === '') return
    if (commentArray) {
      setCommentArray((commentValueList) => [
        ...commentValueList,
        { id: 1, nickname: '', time: '', content: commentValue },
      ])
    }
    setCommentValue('')

    // console.log(commentArray)
    // axios.post()
  }

  return (
    <div className={styles.comment}>
      <div className={styles.commentList}>
        {commentArray ? (
          <div className={styles.commentListBlock}>
            {commentArray.map((comment) => {
              return <SingleComment comment={comment} key={comment.id} />
            })}
          </div>
        ) : (
          <div className={styles.commentListNone}>아직 댓글이 없어요!</div>
        )}
      </div>
      <form className={styles.commentInput} onSubmit={onSubmit}>
        <input type='text' value={commentValue} onChange={handleInput} placeholder='댓글을 입력해주세요.' />
      </form>
    </div>
  )
}

export default Comment
