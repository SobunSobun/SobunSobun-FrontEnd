import { cx } from 'styles'
import styles from './categoryItem.module.scss'

interface Props {
  categoryImg: string
  categoryTitle: string
  onClick: (value: string) => void
  isSelected: boolean
}

const CategoryItem = ({ categoryImg, categoryTitle, onClick, isSelected }: Props) => {
  return (
    <li className={cx(styles.categoryItem, { [styles.isActive]: isSelected })}>
      <button type='button' onClick={() => onClick(categoryTitle)}>
        <span className={styles.image}>
          <img src={categoryImg} alt='상품 아이콘' />
        </span>
      </button>
      <p className={styles.title}>{categoryTitle}</p>
    </li>
  )
}

export default CategoryItem
