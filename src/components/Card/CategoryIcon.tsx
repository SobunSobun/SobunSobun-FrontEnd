/* eslint-disable */
import React from 'react'
import { IMAGE_PATH } from 'assets/images'
import { category } from 'types'

const CategoryIcon = ({ icon }: { icon: category }) => {
  switch (icon) {
    case '과일':
      return <img src={IMAGE_PATH.fruit} />
    case '채소':
      return <img src={IMAGE_PATH.vegetable} />
    case '계란':
      return <img src={IMAGE_PATH.egg} />
    case '생수':
      return <img src={IMAGE_PATH.water} />
    case '축산':
      return <img src={IMAGE_PATH.meat} />
    case '기타':
      return <img src={IMAGE_PATH.etc} style={{ width: 104, height: 81 }} />
    default:
      return <img src={IMAGE_PATH.egg} />
  }
}

export default CategoryIcon
