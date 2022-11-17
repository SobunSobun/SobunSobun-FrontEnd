import { useState, useEffect } from 'react'

interface CoordsType {
  latitude: number
  longitude: number
}

interface ErrorType {
  code: number
  message: string
}

interface LocationType {
  loaded: boolean
  coords?: CoordsType
  error?: ErrorType
}

interface SuccessInfoType {
  coords: CoordsType
}

export const UseGeoLocation = () => {
  const [location, setLocation] = useState<LocationType>({
    loaded: false,
    coords: { latitude: 0, longitude: 0 },
  })

  const onSuccess = (resLocation: SuccessInfoType) => {
    setLocation({
      loaded: true,
      coords: {
        latitude: resLocation.coords.latitude,
        longitude: resLocation.coords.longitude,
      },
    })
  }

  const onError = (error: ErrorType) => {
    setLocation({
      loaded: true,
      error,
    })
  }

  useEffect(() => {
    // navigator 객체 안에 geolocation이 없다면
    // 위치 정보가 없는 것.
    if (!('geolocation' in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      })
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }, [])

  return { loading: location.loaded, lng: location.coords?.longitude, lat: location.coords?.latitude }
}
