import { cx } from 'styles'
import styles from './categoryItem.module.scss'

interface Props {
  categoryId: number
  categoryImg: string
  categoryTitle: string
  onClick: (value: number) => void
  isSelected: boolean
}

const CategoryItem = ({ categoryId, categoryImg, categoryTitle, onClick, isSelected }: Props) => {
  return (
    <li className={cx(styles.categoryItem, { [styles.isActive]: isSelected })}>
      <button type='button' onClick={() => onClick(categoryId)}>
        <span className={styles.image}>
          <img src={categoryImg} alt='상품 아이콘' />
        </span>
      </button>
      <p className={styles.title}>{categoryTitle}</p>
    </li>
  )
}

export default CategoryItem
