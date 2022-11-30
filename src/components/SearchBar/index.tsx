import React, { ChangeEvent } from 'react'
import { SearchIcon } from 'assets/svgs'
import styles from './searchBar.module.scss'

interface Props {
  value: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  onSearch: () => void
}
const SearchBar = ({ value, onChange, onSearch }: Props) => {
  return (
    <div className={styles.wrapper}>
      <SearchIcon className={styles.searchIcon} onClick={onSearch} />
      <input type='search' value={value} onChange={onChange} placeholder='동명(읍,면)으로 검색(ex.서초동)' />
    </div>
  )
}

export default SearchBar
