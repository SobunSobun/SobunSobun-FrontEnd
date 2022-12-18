import { IMAGE_PATH } from 'assets/images'
import { category } from 'types'
import { ICONS } from 'utils/constants'

const CategoryIcon = ({ icon, isVertical = false }: { icon: category; isVertical?: boolean }) => {
  switch (icon) {
    case '과일':
      return <img src={!isVertical ? IMAGE_PATH.fruit : ICONS.FRUIT} alt='과일' />
    case '채소':
      return <img src={!isVertical ? IMAGE_PATH.vegetable : ICONS.VEGETABLE} alt='채소' />
    case '계란':
      return <img src={!isVertical ? IMAGE_PATH.egg : ICONS.EGG} alt='계란' />
    case '생수':
      return <img src={!isVertical ? IMAGE_PATH.water : ICONS.WATER} alt='생수' />
    case '축산':
      return <img src={!isVertical ? IMAGE_PATH.meat : ICONS.MEAT} alt='축산' />
    default:
      return <img src={!isVertical ? IMAGE_PATH.etc : ICONS.ETC} style={{ width: 104, height: 81 }} alt='기타' />
  }
}

export default CategoryIcon
