import React, { Dispatch, SetStateAction } from 'react'
import { category } from 'types'
import SliderWrapper from './SliderWrapper'

import styles from './slider.module.scss'

interface Props {
  data: Array<{ id: string; value: category }>
  now: category
  setNow: Dispatch<SetStateAction<category>>
}

const CategorySlider = ({ data, now, setNow }: Props) => {
  return (
    <SliderWrapper>
      {data.map((v) => (
        <li key={v.id} className={`${styles.item} ${now === v.value ? styles.active : ''}`}>
          <button type='button' onClick={() => setNow(v.value)}>
            {v.value}
          </button>
        </li>
      ))}
      <div className={styles.space} />
    </SliderWrapper>
  )
}

export default CategorySlider
