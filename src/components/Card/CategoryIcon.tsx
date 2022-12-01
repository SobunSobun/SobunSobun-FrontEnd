/* eslint-disable */
import React from 'react'
import { IMAGE_PATH } from 'assets/images'
import { category } from 'types'
import { ICONS } from 'utils/constants'

const CategoryIcon = ({ icon, isVertical = false }: { icon: category; isVertical?: boolean }) => {
  switch (icon) {
    case '과일':
      return <img src={!isVertical ? IMAGE_PATH.fruit : ICONS['FRUIT']} />
    case '채소':
      return <img src={!isVertical ? IMAGE_PATH.vegetable : ICONS['VEGETABLE']} />
    case '계란':
      return <img src={!isVertical ? IMAGE_PATH.egg : ICONS['EGG']} />
    case '생수':
      return <img src={!isVertical ? IMAGE_PATH.water : ICONS['WATER']} />
    case '축산':
      return <img src={!isVertical ? IMAGE_PATH.meat : ICONS['MEAT']} />
    case '기타':
      return <img src={!isVertical ? IMAGE_PATH.etc : ICONS['ETC']} style={{ width: 104, height: 81 }} />
    default:
      return <img src={!isVertical ? IMAGE_PATH.egg : ICONS['EGG']} />
  }
}

export default CategoryIcon
