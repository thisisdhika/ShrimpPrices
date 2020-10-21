import { SAVE_TOKEN, REMOVE_TOKEN } from '../constants/auth'

export const saveToken = (payload: string) => ({
  type: SAVE_TOKEN,
  payload,
})

export const removeToken = () => ({
  type: REMOVE_TOKEN,
})
