import MyPostHeader from 'components/MyPostHeader'
import { useRecoilValue } from 'recoil'
import { postStateAtom } from 'recoil/myPost.atom'

import styles from './myPost.module.scss'

const MyPost = () => {
  const postState = useRecoilValue(postStateAtom)
  return (
    <div className={styles.myPost}>
      <div className={styles.headerSection}>
        <h2>게시물</h2>
        <MyPostHeader />
      </div>
      <div className={styles.inner}>
        <section>
          <h3>진행 중인 소분1111111</h3>
          <ul>
            <li>진행 중 포스트 리스트</li>
          </ul>
        </section>
        <section>
          <h3>완료 된 소분</h3>
          <ul>
            <li>완료 포스트 리스트</li>
          </ul>
        </section>
      </div>
    </div>
  )
}

export default MyPost
