import React, { useCallback, useState } from 'react'
import styles from './region.module.scss'

interface Props {
  data: Array<string>
  setRegion: (v: string) => void
}
const RegionList = ({ data, setRegion }: Props) => {
  const [selected, setSelected] = useState<null | string>(null)

  const onSelectRegion = useCallback(
    (v: string) => {
      setSelected(v)
      const strArr = v.split(' ')
      setRegion(`${strArr[strArr.length - 2]} ${strArr[strArr.length - 1]}`)
    },
    [setRegion]
  )

  return (
    <ul className={styles.wrapper}>
      {data.map((v) => (
        <li key={v} className={selected === v ? styles.active : ''}>
          <button type='button' onClick={() => onSelectRegion(v)}>
            {v}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default RegionList
