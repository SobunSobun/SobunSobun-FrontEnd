import React from 'react'
import { feed } from 'types'
import { LocationIcon, PeopleIcon, TimeIcon } from 'assets/svgs'
import { cx } from 'styles'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CategoryIcon from './CategoryIcon'

import styles from './card.module.scss'

import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)
interface Props {
  data: feed
  isVertical?: boolean
  isBorder?: boolean
  isComplete?: boolean
  isParticipating?: boolean
  isWrite?: boolean
}

const Card = ({
  data,
  isVertical = false,
  isBorder = false,
  isComplete = false,
  isParticipating = false,
  isWrite = false,
}: Props) => {
  return (
    <article
      className={cx(styles.card, {
        [styles.isVertical]: isVertical,
        [styles.isBorder]: isBorder,
        [styles.isComplete]: isComplete,
        [styles.isParticipating]: isParticipating,
        [styles.isWrite]: isWrite,
      })}
    >
      <span>{dayjs(data.createdAt as Date).fromNow()}</span>
      <div>{data.nickname}</div>
      <h3>{data.title}</h3>
      <section>
        <p>
          <LocationIcon />
          {data.market}
        </p>
        <p>
          <TimeIcon />
          {`${dayjs(data.meetingTime).format('YYYY. MM. DD \xa0 hh시 m분')} `}
        </p>
        <p>
          <PeopleIcon />
          {data.applyNumber}/{data.recruitNumber}
        </p>
      </section>
      <CategoryIcon type={data.category} />
    </article>
  )
}

export default Card
