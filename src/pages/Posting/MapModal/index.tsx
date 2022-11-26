import { useState, ChangeEvent, FormEvent } from 'react'
import { SearchIcon, MapBackIcon } from 'assets/svgs'
import ModalLayout from 'components/Modal/ModalLayout'
import { ModalPropsType } from 'types'
import Map from '../Map'

import styles from './mapModal.module.scss'

const MapModal = ({ show, close }: ModalPropsType) => {
  const [searchInput, setSearchInput] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!searchInput) {
      // alert('검색어를 입력해주세요')
      return
    }
    setKeyword(searchInput)
  }

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  return (
    <ModalLayout show={show} width='full'>
      <div className={styles.mapModal}>
        <div className={styles.search}>
          <form action='' onSubmit={handleSubmit} className={styles.searchForm}>
            <div className={styles.searchInner}>
              <button type='submit' className={styles.searchButton}>
                <SearchIcon />
              </button>
              <input
                type='search'
                className={styles.searchInput}
                value={searchInput}
                onChange={handleChangeText}
                placeholder='마트를 입력해주세요'
              />
            </div>
          </form>
          <button type='button' className={styles.closeBtn} onClick={close}>
            <MapBackIcon />
          </button>
        </div>
        <Map searchKeyword={keyword} close={close} />
      </div>
    </ModalLayout>
  )
}

export default MapModal
