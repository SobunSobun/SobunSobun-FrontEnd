import Card from 'components/Card'
import MyPostHeader from 'components/MyPostHeader'
import NoResult from 'components/NoResult'
import Spinner from 'components/Spinner'
import useMyInfo from 'hooks/useMyInfo'
import useMyPost from 'hooks/useMyPost'
import { useRecoilValue } from 'recoil'
import { postStateAtom } from 'recoil/myPost.atom'

import styles from './myPost.module.scss'

const MyPost = () => {
  const { userId } = useMyInfo()
  const postState = useRecoilValue(postStateAtom)
  const { data, isLoading } = useMyPost({ userId: userId!, postState })
  return (
    <div className={styles.myPost}>
      <div className={styles.headerSection}>
        <h2>게시물</h2>
        <MyPostHeader />
      </div>
      <div className={styles.inner}>
        <section>
          <h3>진행 중인 소분</h3>
          {isLoading ? (
            <Spinner />
          ) : (
            <ul style={data && data[0] && data[0].length !== 0 ? { minHeight: 0 } : {}}>
              {data && data[0] && data[0].length !== 0 ? (
                data[0].map((v) => (
                  <Card
                    key={v.postId}
                    data={v}
                    isBorder
                    isWrite={postState === 'myPost'}
                    isParticipating={postState === 'participatedPost'}
                  />
                ))
              ) : (
                <NoResult message='진행 중인 소분이 없습니다.' />
              )}
            </ul>
          )}
        </section>
        <section>
          <h3>완료 된 소분</h3>
          {isLoading ? (
            <Spinner />
          ) : (
            <ul style={data && data[1] && data[1].length !== 0 ? { minHeight: 0 } : {}}>
              {data && data[1] && data[1].length !== 0 ? (
                data[1].map((v) => <Card key={v.postId} data={v} isComplete />)
              ) : (
                <NoResult message='완료된 소분이 없습니다.' />
              )}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default MyPost
