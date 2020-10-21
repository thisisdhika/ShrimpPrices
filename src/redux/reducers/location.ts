import { SET_LOCATION, SET_REGIONS } from '../constants/location'

const initialState = {
  location: {},
  regions: {
    provinces: [],
    cities: [],
    districts: [],
    villages: [],
  },
}

const locationReducer = (state = initialState, action: { type: string; payload: any }) => {
  switch (action.type) {
    case SET_LOCATION: {
      return {
        ...state,
        location: action.payload,
      }
    }
    case SET_REGIONS: {
      return {
        ...state,
        regions: action.payload,
      }
    }
    default: {
      return state
    }
  }
}

export default locationReducer
