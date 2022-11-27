type Param = {
  targetLocation: {
    lat: number
    lng: number
  }
  myLocation: {
    lat: number
    lng: number
  }
}
export const getDistance = ({ targetLocation, myLocation }: Param) => {
  const lat1 = targetLocation.lat
  const lng1 = targetLocation.lng
  const lat2 = myLocation.lat
  const lng2 = myLocation.lng
  function deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }
  const r = 6371.009 // 지구의 반지름(km)
  const dLat = deg2rad(lat2 - lat1)
  const dLon = deg2rad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = r * c // Distance in km
  return Math.round(d)
}
