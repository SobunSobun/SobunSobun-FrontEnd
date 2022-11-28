import { ChangeEvent } from 'react'
import styles from './dropDown.module.scss'

interface Props {
  list: Array<string>
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
  defaultValue?: string
}

const DropDown = ({ list, onChange, defaultValue, value }: Props) => {
  return (
    <select className={styles.dropDown} defaultValue={defaultValue} onChange={onChange}>
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
