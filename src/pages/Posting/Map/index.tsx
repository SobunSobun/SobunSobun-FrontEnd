import React, { useEffect } from 'react'
import { UseGeoLocation } from 'hooks/useGeoLocation'
import { Swiper, SwiperSlide } from 'swiper/react'
import { IMAGE_PATH } from 'assets/images'
import { Keyword, MapDataType, PlaceType } from 'types'
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

const Map = ({ searchKeyword }: Keyword) => {
  // const markers: any[] = []
  // const { lat, lng } = UseGeoLocation()
  // useEffect(() => {
  //   const container = document.getElementById('map')
  //   const options = {
  //     center: new window.kakao.maps.LatLng(lat, lng), // 지도의 중심좌표
  //     level: 3, // 지도의 확대 레벨
  //   }

  //   const map = new window.kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
  //   const ps = new window.kakao.maps.services.Places(map)

  //   /* 카테고리 검색 성공 callback */
  //   const categoryCallback = (data: Array<MapDataType>, status: string) => {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       data.forEach((el: MapDataType) => {
  //         const marker = new window.kakao.maps.Marker({
  //           position: new window.kakao.maps.LatLng(el.y, el.x),
  //           image: markerImage,
  //         })
  //         marker.setMap(map)
  //       })
  //     }
  //   }
  //   /* 마트 키워드로 검색한 결과 */
  //   const keywordCallback = (data: Array<MapDataType>, status: string) => {
  //     if (status === window.kakao.maps.services.Status.OK) {
  //       data.forEach((el: MapDataType) => {
  //         const marker = new window.kakao.maps.Marker({
  //           position: new window.kakao.maps.LatLng(el.y, el.x),
  //           image: markerImage,
  //         })
  //         marker.setMap(map)
  //       })

  //       const moveLatLon = new window.kakao.maps.LatLng(data[0].y, data[0].x)
  //       map.panTo(moveLatLon)
  //     }
  //   }

  //   if (searchKeyword) {
  //     ps.categorySearch('MT1', categoryCallback, {
  //       location: map.getCenter(),
  //     })
  //     ps.keywordSearch(searchKeyword, keywordCallback, {
  //       location: map.getCenter(),
  //     })
  //   }
  // }, [lat, lng, searchKeyword])
  return (
    <div className={styles.map}>
      <div id='map' className={styles.mapArea} />
      <div className={styles.searchResult}>
        <div className={styles.wrapper}>
          <Swiper
            spaceBetween={12}
            slidesPerView={1}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <button
                type='button'
                className={styles.searchItem}
                onClick={() => {
                  console.log('클릭')
                }}
              >
                <span className={styles.marketName}>서초구 할인마트</span>
                <span className={styles.marketAddress}>서울 서초구 매헌로 16 (양재동)</span>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type='button'
                className={styles.searchItem}
                onClick={() => {
                  console.log('클릭')
                }}
              >
                <span className={styles.marketName}>서초구 할인마트</span>
                <span className={styles.marketAddress}>서울 서초구 매헌로 16 (양재동)</span>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type='button'
                className={styles.searchItem}
                onClick={() => {
                  console.log('클릭')
                }}
              >
                <span className={styles.marketName}>서초구 할인마트</span>
                <span className={styles.marketAddress}>서울 서초구 매헌로 16 (양재동)</span>
              </button>
            </SwiperSlide>
            <SwiperSlide>
              <button
                type='button'
                className={styles.searchItem}
                onClick={() => {
                  console.log('클릭')
                }}
              >
                <span className={styles.marketName}>서초구 할인마트</span>
                <span className={styles.marketAddress}>서울 서초구 매헌로 16 (양재동)</span>
              </button>
            </SwiperSlide>
          </Swiper>
          {/* <ul className={styles.list}>
            <li />
          </ul> */}
        </div>
      </div>
    </div>
  )
}

export default Map
