import { useState, ChangeEvent } from 'react'
import cx from 'classnames'
import styles from './checkbox.module.scss'

const MEDICINE_CHECK = [
  { id: 1, content: 'A', checked: false },
  { id: 2, content: 'B', checked: false },
  { id: 3, content: 'C', checked: false },
  { id: 4, content: 'D', checked: false },
]

const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
  console.log(e.currentTarget)
  const target = e.currentTarget.parentElement
  // if (target.dataset.num === MEDICINE_CHECK.length) {
  //   console.log('마지막')
  // }
}

const Checkbox = () => {
  const [isAllChecked, setIsAllChecked] = useState(false)
  const [checkedItems, setCheckedItems] = useState([...MEDICINE_CHECK])
  return (
    <ul className={styles.checkbox}>
      {MEDICINE_CHECK.map((item) => {
        return (
          <li className={styles.item} key={`check-item-${item.id}`} data-num={item.id}>
            <input
              type='checkbox'
              id={`check-item-${item.id}`}
              name='check01'
              onChange={handleChecked}
              checked={item.checked}
            />
            <label htmlFor={`check-item-${item.id}`}>{item.content}</label>
          </li>
        )
      })}
    </ul>
  )
}

export default Checkbox
