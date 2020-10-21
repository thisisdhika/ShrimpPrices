import { GeolocationResponse } from '@react-native-community/geolocation'
import { SET_LOCATION, SET_REGIONS } from '../constants/location'

export type Location = GeolocationResponse & { regions: any[]; geocoded: Record<string, any> }
export const setLocation = (payload: Location) => ({
  type: SET_LOCATION,
  payload,
})

export const setRegions = (payload: Record<string, any>) => ({
  type: SET_REGIONS,
  payload,
})
