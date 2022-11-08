import React, { ChangeEvent, useCallback, useState } from 'react'
import Header from 'components/Header'
import Button from 'components/Button'
import SearchBar from 'components/SearchBar'
import RegionList from 'components/RegionList'
import { getRegions } from 'apis/region'
import { useNavigate } from 'react-router-dom'
import styles from './localAuth.module.scss'

const LocalAuth = () => {
  const [regions, setRegions] = useState<Array<string>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [myRegion, setMyRegion] = useState<string>('')

  const navigate = useNavigate()

  const onChangeSearchValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value)
    },
    [setSearchValue]
  )

  const onSearch = async () => {
    try {
      const res = await getRegions({ data: searchValue })
      setRegions([...res])
      setSearchValue('')
    } catch (e) {
      console.log(e)
    }
  }

  const onSetMyRegion = useCallback(
    (v: string) => {
      setMyRegion(v)
    },
    [setMyRegion]
  )
  return (
    <>
      <div className={styles.wrapper}>
        <Header leftChild={<Button type='back' />} />
        <h1 style={{ paddingBottom: 16 }}>내 동네 설정하기</h1>
        <SearchBar value={searchValue} onChange={onChangeSearchValue} onSearch={onSearch} />
      </div>
      {regions && <RegionList data={regions} setRegion={onSetMyRegion} />}
      <div className={styles.nextButton}>
        <Button
          basic
          type={myRegion ? 'primary' : 'negative'}
          text='다음'
          onClick={() => {
            navigate('/signup', { state: { myRegion } })
          }}
          isDisabled={myRegion === ''}
        />
      </div>
    </>
  )
}

export default LocalAuth
