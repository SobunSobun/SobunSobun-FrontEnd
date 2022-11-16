import { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import Map from '../Map'
import styles from './mapContainer.module.scss'

declare global {
  interface Window {
    kakao: any
  }
}

const MapContainer = () => {
  const [searchInput, setSearchInput] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInput) {
      alert('검색어를 입력해주세요')
      return
    }
    setKeyword(searchInput)
  }

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className={styles.map}>
      <form action='' onSubmit={handleSubmit}>
        <input type='text' value={searchInput} onChange={handleChangeText} />
        <button type='submit'>검색</button>
      </form>
      <Map searchKeyword={keyword} />
    </div>
  )
}

export default MapContainer
