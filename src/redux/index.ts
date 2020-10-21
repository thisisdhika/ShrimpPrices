import AsyncStorage from '@react-native-community/async-storage'
import { createStore, applyMiddleware, Store, Dispatch } from 'redux'
import { createLogger } from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'

import rootReducer from './reducers'

const persistConfig = {
  key: '@root',
  storage: AsyncStorage,
  whitelist: ['authReducer'],
  blacklist: ['locationReducer'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store: Store<any, any> & {
  dispatch: Dispatch
} = createStore(persistedReducer, applyMiddleware(createLogger()))

export const persistor = persistStore(store)

export default store
