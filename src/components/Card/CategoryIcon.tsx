import React from 'react'
import { FruitIcon } from 'assets/svgs'
import { category } from 'types'

const CategoryIcon = ({ type }: { type: Omit<category, '전체'> }) => {
  switch (type) {
    case '과일':
      return <FruitIcon />
    case '채소':
      return <FruitIcon />
    case '계란':
      return <FruitIcon />
    case '생수':
      return <FruitIcon />
    case '축산':
      return <FruitIcon />
    case '기타':
      return <FruitIcon />
    default:
      return <FruitIcon />
  }
}

export default CategoryIcon
