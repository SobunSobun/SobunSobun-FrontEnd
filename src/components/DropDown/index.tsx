import { ChangeEvent } from 'react'
import styles from './dropDown.module.scss'

interface Props {
  list: Array<string>
  value: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const DropDown = ({ list, value, onChange }: Props) => {
  // const [selected, setSelected] = useState('')
  // const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setSelected(e.target.value)
  // }
  return (
    <select name='' id='' className={styles.dropDown} value={value} onChange={onChange}>
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
