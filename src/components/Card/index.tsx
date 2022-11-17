import React from 'react'
import { feed } from 'types'
import { LocationIcon, PeopleIcon, TimeIcon } from 'assets/svgs'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import CategoryIcon from './CategoryIcon'

import styles from './card.module.scss'

import 'dayjs/locale/ko'

dayjs.locale('ko')
dayjs.extend(relativeTime)
interface Props {
  data: feed
}

const Card = ({ data }: Props) => {
  return (
    <article className={styles.card}>
      <span>{dayjs(data.createdAt).fromNow()}</span>
      <div>{data.nickname}</div>
      <h3>{data.title}</h3>
      <section>
        <p>
          <LocationIcon />
          {data.market}
        </p>
        <p>
          <TimeIcon />
          {data.meetingTime}
        </p>
        <p>
          <PeopleIcon />
          {data.recruitmentNumber}/4
        </p>
      </section>
      <CategoryIcon type={data.category} />
    </article>
  )
}

export default Card
