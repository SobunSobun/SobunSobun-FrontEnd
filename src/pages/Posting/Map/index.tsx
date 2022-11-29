import { useState, useEffect, useRef } from 'react'
import { useSetRecoilState } from 'recoil'
import cx from 'classnames'

import { UseGeoLocation } from 'hooks/useGeoLocation'
import { postingPlaceState } from 'recoil/post.atom'
import { Keyword, MapDataType } from 'types'

import { IMAGE_PATH } from 'assets/images'
import { MapInfoIcon } from 'assets/svgs'
import styles from './map.module.scss'

declare global {
  interface Window {
    kakao: any
  }
}

const markerSize = new window.kakao.maps.Size(22, 31)
const activeMarkerSize = new window.kakao.maps.Size(35, 50)

const Map = ({ searchKeyword, close }: Keyword) => {
  const { lat, lng } = UseGeoLocation()
  const container = useRef(null)
  const setMarket = useSetRecoilState(postingPlaceState)
  const [itemActive, setItemActive] = useState(false)
  const [itemInfo, setItemInfo] = useState({ market: '', address: '' })

  useEffect(() => {
    let markers: any[] = []
    let selectedMarker: any = null // 클릭한 마커를 담을 변수
    // 지도 생성 및 객체 리턴
    const options = {
      // center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      center: new window.kakao.maps.LatLng(37.48764, 126.72736), // 지도의 중심좌표
      level: 3,
    }
    const map = new window.kakao.maps.Map(container.current, options)
    const ps = new window.kakao.maps.services.Places(map)

    /* 카테고리 검색 성공 callback */
    const categoryCallback = (data: Array<MapDataType>, status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        addMarker(data)
      }
    }
    /* 마트 키워드로 검색한 결과 */
    const keywordCallback = (data: Array<MapDataType>, status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        removeMarker()
        setItemInfo({ market: '', address: '' })
        addMarker(data)

        const moveLatLon = new window.kakao.maps.LatLng(data[0].y, data[0].x)
        map.panTo(moveLatLon)
      }
    }
    /* 마커 추가하기 */
    const addMarker = (data: Array<MapDataType>) => {
      const normalImage = createMarkerImage(IMAGE_PATH.mapMarker, markerSize)
      const clickImage = createMarkerImage(IMAGE_PATH.mapMarker, activeMarkerSize)
      data.forEach((el: MapDataType) => {
        const position = new window.kakao.maps.LatLng(el.y, el.x)
        const marker = new window.kakao.maps.Marker({
          position,
          image: normalImage,
          clickable: true,
        })
        marker.setMap(map)
        markers.push(marker) // 배열에 생성된 마커를 추가
        marker.normalImage = normalImage

        // 마커에 클릭이벤트
        window.kakao.maps.event.addListener(marker, 'click', () => {
          const moveLatLon = position
          map.panTo(moveLatLon)

          const place = data.filter((item) => item.id === el.id)
          setItemInfo({ market: place[0].place_name, address: place[0].address_name })

          setItemActive(false)

          // 클릭된 마커가 없고, click 마커가 클릭된 마커가 아니면 마커의 이미지를 클릭 이미지로 변경
          if (!selectedMarker || selectedMarker !== marker) {
            // 클릭된 마커 객체가 null이 아니면 클릭된 마커의 이미지를 기본 이미지로 변경
            !!selectedMarker && selectedMarker.setImage(selectedMarker.normalImage)

            // 현재 클릭된 마커의 이미지는 클릭 이미지로 변경
            marker.setImage(clickImage)
          }

          // 클릭된 마커를 현재 클릭된 마커 객체로 설정
          selectedMarker = marker
        })
      })
    }

    /* 마커 제거하기 */
    const removeMarker = () => {
      markers.forEach((marker) => {
        marker.setMap(null)
      })
      markers = []
    }

    // markerImage 객체를 생성하여 반환하는 함수
    const createMarkerImage = (markerUrl: string, _markerSize: { height: number; width: number }) => {
      const markerImg = new window.kakao.maps.MarkerImage(markerUrl, _markerSize)

      return markerImg
    }

    // 처음 지도 진입시 마트 키워드로 검색된 결과가 마커로 나타남
    ps.categorySearch('MT1', categoryCallback, {
      location: map.getCenter(),
    })

    if (searchKeyword) {
      ps.keywordSearch(searchKeyword, keywordCallback, {
        location: map.getCenter(),
      })
    }
  }, [lat, lng, searchKeyword])

  const handleSetMarket = () => {
    setItemActive(true)
    setMarket({ place: itemInfo.market, address: itemInfo.address })
    setTimeout(() => {
      close()
    }, 300)
  }

  return (
    <div className={styles.map}>
      <div id='map' className={styles.mapArea} ref={container} />
      {itemInfo.market && (
        <div className={styles.item}>
          <button
            type='button'
            className={cx(styles.itemInner, { [styles.active]: itemActive })}
            onClick={handleSetMarket}
          >
            <span className={styles.image}>
              <MapInfoIcon />
            </span>
            <dl className={styles.desc}>
              <dt className={styles.market}>{itemInfo.market}</dt>
              <dd className={styles.address}>{itemInfo.address}</dd>
            </dl>
          </button>
        </div>
      )}
    </div>
  )
}

export default Map
