/* eslint-disable */
import React from 'react'
import { category } from 'types'
import { ICONS } from 'utils/constants'

const CategoryIcon = ({ icon }: { icon: category }) => {
  switch (icon) {
    case '과일':
      return <img src={ICONS['FRUIT']} />
    case '채소':
      return <img src={ICONS['VEGETABLE']} />
    case '계란':
      return <img src={ICONS['EGG']} />
    case '생수':
      return <img src={ICONS['WATER']} />
    case '축산':
      return <img src={ICONS['MEAT']} />
    case '기타':
      return <img src={ICONS['ETC']} style={{ width: 104, height: 81 }} />
    default:
      return <img src={ICONS['EGG']} />
  }
}

export default CategoryIcon
