import React from 'react'
import { EggIcon, EtcIcon, FruitIcon, MeatIcon, VegetableIcon, WaterIcon } from 'assets/svgs'
import { category } from 'types'

const CategoryIcon = ({ type }: { type: Omit<category, '전체'> }) => {
  switch (type) {
    case '과일':
      return <FruitIcon />
    case '채소':
      return <VegetableIcon />
    case '계란':
      return <EggIcon />
    case '생수':
      return <WaterIcon />
    case '축산':
      return <MeatIcon />
    case '기타':
      return <EtcIcon style={{ width: 104, height: 81 }} />
    default:
      return <FruitIcon />
  }
}

export default CategoryIcon
