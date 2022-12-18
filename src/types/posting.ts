export interface Time {
  slot: string
  hour: string
  minutes: string
}

export interface Keyword {
  searchKeyword: string
  close: () => void
}

export interface MapDataType {
  address_name: string
  category_group_code: string
  category_group_name: string
  category_name: string
  distance: string
  id: string
  phone: string
  place_name: string
  place_url: string
  road_address_name: string
  x: string
  y: string
}
