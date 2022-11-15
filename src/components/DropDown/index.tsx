import styles from './dropDown.module.scss'

interface Props {
  list: Array<string>
}

const DropDown = ({ list }: Props) => {
  return (
    <div className={styles.dropDown}>
      <select name='' id=''>
        {list.map((item) => {
          return (
            <option key={item} value={item}>
              {item}
            </option>
          )
        })}
        {/* <option value='01'>01</option>
        <option value='02'>02</option>
        <option value='03'>03</option>
        <option value='04'>04</option>
        <option value='05'>05</option>
        <option value='06'>06</option> */}
      </select>
    </div>
  )
}

export default DropDown
