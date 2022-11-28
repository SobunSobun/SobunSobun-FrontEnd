import { useState } from 'react'
import { useRecoilState } from 'recoil'
import Header from 'components/Header'
import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'
import { postingTitleState, postingContentState } from 'recoil/post.atom'
import Editor from './Editor'
import styles from './posting.module.scss'

const New = () => {
  const navigate = useNavigate()
  const [recoileTitle, setRecoilTitle] = useRecoilState(postingTitleState)
  const [recoilContent, setRecoilContent] = useRecoilState(postingContentState)

  const [localTitle, setLocalTitle] = useState(recoileTitle)
  const [localContent, setLocalContent] = useState(recoilContent)

  const handleSaveValue = () => {
    setRecoilTitle(localTitle)
    setRecoilContent(localContent)
    navigate(-1)
  }

  return (
    <div className={styles.new}>
      <Header leftChild={<Button type='customBack' onClick={handleSaveValue} />} headText='게시글 작성' />
      <div className='contentsInner'>
        <Editor
          isEdit={false}
          localTitle={localTitle}
          setLocalTitle={setLocalTitle}
          localContent={localContent}
          setLocalContent={setLocalContent}
        />
      </div>
    </div>
  )
}

export default New
