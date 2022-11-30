import { category } from 'types'
import fruitSVG from 'assets/svgs/fruitIcon.svg'
import waterSVG from 'assets/svgs/waterIcon.svg'
import etcSVG from 'assets/svgs/etcIcon.svg'
import meatSVG from 'assets/svgs/meatIcon.svg'
import vegetableSVG from 'assets/svgs/vegetableIcon.svg'
import eggSVG from 'assets/svgs/eggIcon.svg'

export const CATEGORIES: Array<{ id: string; value: category }> = [
  { id: 'all', value: '전체' },
  { id: 'fruit', value: '과일' },
  { id: 'vegetable', value: '채소' },
  { id: 'egg', value: '계란' },
  { id: 'meat', value: '축산' },
  { id: 'water', value: '생수' },
  { id: 'etc', value: '기타' },
]

export const ICONS = {
  FRUIT: fruitSVG,
  VEGETABLE: vegetableSVG,
  EGG: eggSVG,
  MEAT: meatSVG,
  WATER: waterSVG,
  ETC: etcSVG,
}
