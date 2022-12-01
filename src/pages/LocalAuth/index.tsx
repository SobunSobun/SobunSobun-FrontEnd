import React, { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import Header from 'components/Header'
import Button from 'components/Button'
import SearchBar from 'components/SearchBar'
import RegionList from 'components/RegionList'
import { getRegions } from 'apis/region'
import { useNavigate } from 'react-router-dom'
import useModal from 'hooks/useModal'
import { TwoButtonModal } from 'components/Modal'
import { region } from 'types'
// import { UseGeoLocation } from 'hooks/useGeoLocation'
// import { getDistance } from 'utils/getDistance'
import styles from './localAuth.module.scss'

const LocalAuth = () => {
  const [regions, setRegions] = useState<Array<region>>([])
  const [searchValue, setSearchValue] = useState<string>('')
  const [myRegion, setMyRegion] = useState<region | null>(null)

  // const { lat, lng } = UseGeoLocation()
  const { isOpen, onClose, setIsOpen } = useModal()
  // const { isOpen: alertOpen, onClose: alertClose, setIsOpen: setAlert } = useModal()

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
      navigate('/error')
    }
  }

  const onSetMyRegion = useCallback(
    (v: region) => {
      setMyRegion(v)
    },
    [setMyRegion]
  )

  const nextButtonHandler = useCallback(() => {
    navigate('/signup', { state: { myRegion } })
  }, [myRegion, navigate])

  return (
    <div className={styles.localAuth}>
      <Header
        largeText
        headText='내 동네 설정하기'
        leftChild={<Button type='customBack' onClick={() => setIsOpen(true)} />}
      />
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault()
          onSearch()
        }}
        className={styles.wrapper}
      >
        <SearchBar value={searchValue} onChange={onChangeSearchValue} onSearch={onSearch} />
      </form>
      {regions && <RegionList data={regions} setRegion={onSetMyRegion} />}
      <div className={styles.localBtn}>
        <Button
          type={myRegion ? 'primary' : 'negative'}
          text='다음'
          onClick={nextButtonHandler}
          isDisabled={myRegion === null}
        />
      </div>
      <TwoButtonModal
        show={isOpen}
        close={onClose}
        message='회원가입을 종료하시겠습니까?'
        yesCallBack={() => {
          navigate('/intro')
        }}
      />
      {/* <TwoButtonModal
        show={alertOpen}
        close={alertClose}
        message={`현재 위치에서 6km 이상 떨어져 있습니다\n회원가입을 진행하시겠습니까?`}
        yesCallBack={() => {
          navigate('/signup', { state: { myRegion } })
        }}
      /> */}
    </div>
  )
}

export default LocalAuth
