import Card from 'components/Card'
import MyPostHeader from 'components/MyPostHeader'
import useMyInfo from 'hooks/useMyInfo'
import useMyPost from 'hooks/useMyPost'
import { useRecoilValue } from 'recoil'
import { postStateAtom } from 'recoil/myPost.atom'

import styles from './myPost.module.scss'

const MyPost = () => {
  const { userId } = useMyInfo()
  const postState = useRecoilValue(postStateAtom)
  const { data, isLoading } = useMyPost({ userId: userId!, postState })
  if (isLoading && !data) return <div>Loading ...</div>
  return (
    <div className={styles.myPost}>
      <div className={styles.headerSection}>
        <h2>게시물</h2>
        <MyPostHeader />
      </div>
      <div className={styles.inner}>
        <section>
          <h3>진행 중인 소분</h3>
          <ul>
            {data &&
              data[0] &&
              data[0].map((v) => (
                <Card
                  key={v.postId}
                  data={v}
                  isBorder
                  isWrite={postState === 'myPost'}
                  isParticipating={postState === 'participatedPost'}
                />
              ))}
          </ul>
        </section>
        <section>
          <h3>완료 된 소분</h3>
          <ul>{data && data[0] && data[0].map((v) => <Card key={v.postId} data={v} isComplete />)}</ul>
        </section>
      </div>
    </div>
  )
}

export default MyPost
