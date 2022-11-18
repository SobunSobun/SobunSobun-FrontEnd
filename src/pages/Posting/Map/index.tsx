import React, { useState, useEffect, useRef } from 'react'
import { UseGeoLocation } from 'hooks/useGeoLocation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IMAGE_PATH } from 'assets/images'
import { Keyword, MapDataType } from 'types'
import 'swiper/swiper.min.css'
import styles from './map.module.scss'

declare global {
  interface Window {
    kakao: any
  }
}

const markerSrc = IMAGE_PATH.mapMarker
const markerSize = new window.kakao.maps.Size(14, 20)
const markerImage = new window.kakao.maps.MarkerImage(markerSrc, markerSize)

const Map = ({ searchKeyword, close }: Keyword) => {
  const { lat, lng } = UseGeoLocation()
  const container = useRef(null)
  const [keywordResult, setKeywordResult] = useState<MapDataType[]>([])
  // const navigate = useNavigate()

  useEffect(() => {
    const options = {
      center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
      level: 3, // 지도의 확대 레벨
    }

    const map = new window.kakao.maps.Map(container.current, options) // 지도 생성 및 객체 리턴
    const ps = new window.kakao.maps.services.Places(map)

    /* 카테고리 검색 성공 callback */
    const categoryCallback = (data: Array<MapDataType>, status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        data.forEach((el: MapDataType) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(el.y, el.x),
            image: markerImage,
          })
          marker.setMap(map)

          // 마커에 클릭이벤트
          window.kakao.maps.event.addListener(marker, 'click', () => {
            // 인포윈도우 생성
            // const infowindow = new window.kakao.maps.InfoWindow({
            //   content: `<div style="padding:5px;">${el.place_name}</div>`,
            // })
            // infowindow.open(map, marker)
            setKeywordResult(data)
            const moveLatLon = new window.kakao.maps.LatLng(el.y, el.x)
            map.panTo(moveLatLon)
          })
        })
      }
    }
    /* 마트 키워드로 검색한 결과 */
    const keywordCallback = (data: Array<MapDataType>, status: string) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setKeywordResult(data)
        data.forEach((el: MapDataType) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(el.y, el.x),
            image: markerImage,
          })
          marker.setMap(map)

          // 마커에 클릭이벤트를 등록합니다
          window.kakao.maps.event.addListener(marker, 'click', () => {
            // 인포윈도우 생성
            // const infowindow = new window.kakao.maps.InfoWindow({
            //   content: `<div style="padding:5px;">${el.place_name}</div>`,
            // })
            // infowindow.open(map, marker)
            const moveLatLon = new window.kakao.maps.LatLng(el.y, el.x)
            map.panTo(moveLatLon)
          })
        })

        const moveLatLon = new window.kakao.maps.LatLng(data[0].y, data[0].x)
        map.panTo(moveLatLon)
      }
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
  return (
    <div className={styles.map}>
      <div id='map' className={styles.mapArea} ref={container} />
      {keywordResult.length > 0 && (
        <div className={styles.list}>
          <Swiper grabCursor centeredSlides slidesPerView='auto'>
            {keywordResult.map((item) => {
              return (
                <SwiperSlide key={item.id} className={styles.swiperItem}>
                  <button
                    type='button'
                    className={styles.itemInner}
                    onClick={() => {
                      close()
                    }}
                  >
                    <span className={styles.market}>{item.place_name}</span>
                    <span className={styles.address}>{item.address_name}</span>
                  </button>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      )}
    </div>
  )
}

export default Map
