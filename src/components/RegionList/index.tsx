import React, { useCallback, useState } from 'react'
import { region } from 'types'
import styles from './region.module.scss'

interface Props {
  data: Array<region>
  setRegion: (v: region) => void
}
const RegionList = ({ data, setRegion }: Props) => {
  const [selected, setSelected] = useState<null | string>(null)

  const onSelectRegion = useCallback(
    (v: region) => {
      setSelected(v.address_name)
      const strArr = v.address_name.split(' ')
      setRegion({
        address_name: `${strArr[strArr.length - 2]} ${strArr[strArr.length - 1]}`,
        location: { lat: v.location.lat, lon: v.location.lon },
      })
    },
    [setRegion]
  )

  return (
    <ul className={styles.wrapper}>
      {data.map((v) => (
        <li key={v.address_name} className={selected === v.address_name ? styles.active : ''}>
          <button type='button' onClick={() => onSelectRegion(v)}>
            {v.address_name}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default RegionList
