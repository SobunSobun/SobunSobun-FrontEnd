import { useNavigate } from 'react-router-dom'

import { ErrorIcon } from 'assets/svgs'
import { Button } from 'components'

import styles from './notFound.module.scss'

const NotFound = () => {
  const navigate = useNavigate()

  const handleChangePage = () => {
    const hasToken = localStorage.getItem('sobunsobun')
    if (hasToken) {
      navigate('/home')
    } else {
      navigate('/intro')
    }
  }
  return (
    <div className={styles.notFound}>
      <div className={styles.inner}>
        <ErrorIcon />
        <strong>존재하지 않는 페이지입니다.</strong>
        <p className={styles.desc}>
          이용에 불편을 드려 죄송합니다. <br />
          주소를 다시 한 번 확인해주세요.
        </p>
        <div className={styles.buttonWrap}>
          <Button type='primary' text='홈으로 이동' onClick={handleChangePage} />
        </div>
      </div>
    </div>
  )
}

export default NotFound
