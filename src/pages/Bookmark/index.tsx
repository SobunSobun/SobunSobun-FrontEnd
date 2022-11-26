import styles from './bookmark.module.scss'

const Bookmark = () => {
  return (
    <div className={styles.bookmark}>
      <section className={styles.headerSection}>
        <h2>관심 목록</h2>
      </section>
      <div className={styles.inner}>
        <ul className={styles.list}>
          <li>card</li>
        </ul>
      </div>
    </div>
  )
}

export default Bookmark
