import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { useNavigate } from 'react-router-dom'

import { Header, Button } from 'components'
import { postingTitleState, postingContentState } from 'recoil/post.atom'
import Editor from './Editor'

const New = () => {
  const navigate = useNavigate()
  const [recoileTitle, setRecoilTitle] = useRecoilState(postingTitleState)
  const [recoilContent, setRecoilContent] = useRecoilState(postingContentState)

  const [localTitle, setLocalTitle] = useState(recoileTitle)
  const [localContent, setLocalContent] = useState(recoilContent)

  const handleSaveValue = () => {
    setRecoilTitle(localTitle)
    setRecoilContent(localContent)
    navigate('/category')
  }

  return (
    <div>
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
