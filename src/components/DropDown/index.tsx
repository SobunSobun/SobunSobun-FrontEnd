import { ChangeEvent } from 'react'
import styles from './dropDown.module.scss'

interface Props {
  list: Array<string>
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  value?: string
}

const DropDown = ({ list, onChange, value }: Props) => {
  return (
    <select className={styles.dropDown} value={value} onChange={onChange}>
      {list.map((item) => {
        return (
          <option key={item} value={item}>
            {item}
          </option>
        )
      })}
    </select>
  )
}

export default DropDown
