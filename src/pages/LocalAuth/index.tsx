import React, { ChangeEvent, useCallback, useState } from 'react'
import Header from 'components/Header'
import Button from 'components/Button'
import SearchBar from 'components/SearchBar'
import RegionList from 'components/RegionList'
import { getRegions } from 'apis/region'
import { useNavigate } from 'react-router-dom'
import useModal from 'hooks/useModal'
import { TwoButtonModal } from 'components/Modal'
import { region } from 'types'
import styles from './localAuth.module.scss'

const LocalAuth = () => {
  const [regions, setRegions] = useState<Array<region>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [myRegion, setMyRegion] = useState<region | null>(null)

  const { isOpen, onClose, setIsOpen } = useModal()

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
    (v: region) => {
      setMyRegion(v)
    },
    [setMyRegion]
  )
  return (
    <>
      <Header headText='내 동네 설정하기' leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />} />
      <div className={styles.wrapper}>
        <SearchBar value={searchValue} onChange={onChangeSearchValue} onSearch={onSearch} />
      </div>
      {regions && <RegionList data={regions} setRegion={onSetMyRegion} />}
      <div className={styles.nextButton}>
        <Button
          type={myRegion ? 'primary' : 'negative'}
          text='다음'
          onClick={() => {
            navigate('/signup', { state: { myRegion } })
          }}
          isDisabled={myRegion === null}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='회원가입을 종료하시겠습니까?'
        yesCallBack={() => {
          navigate('/')
        }}
      />
    </>
  )
}

export default LocalAuth
