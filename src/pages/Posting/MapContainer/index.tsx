import { useState, ChangeEvent, FormEvent } from 'react'
import { SearchIcon } from 'assets/svgs'
import Map from '../Map'
import styles from './mapContainer.module.scss'

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
    <div className={styles.mapContainer}>
      <div className={styles.search}>
        <form action='' onSubmit={handleSubmit} className={styles.searchForm}>
          <div className={styles.searchInner}>
            <button type='submit' className={styles.searcButton}>
              <SearchIcon />
            </button>
            <input type='text' className={styles.searchInput} value={searchInput} onChange={handleChangeText} />
          </div>
        </form>
      </div>
      <Map searchKeyword={keyword} />
    </div>
  )
}

export default MapContainer
