import { SAVE_TOKEN, REMOVE_TOKEN } from '../constants/auth'

const initialState = {
  token: null,
  loggedIn: false,
}

const authReducer = (
  state = initialState,
  action: { type: string; payload: any },
): typeof initialState => {
  switch (action.type) {
    case SAVE_TOKEN:
      return { ...state, token: action.payload, loggedIn: true }
    case REMOVE_TOKEN:
      return { ...state, token: null, loggedIn: false }
    default:
      return state
  }
}

export default authReducer
