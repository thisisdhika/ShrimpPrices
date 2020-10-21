/**
 * App.tsx
 *
 * @author  Dhika Putra Ardana <dhikaardana87@gmail.com>
 * @since   Oct, 2020
 */

import * as React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { PermissionsAndroid, Platform, StatusBar } from 'react-native'
import Config from 'react-native-config'
import SplashScreen from 'react-native-splash-screen'
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation'
import CodePush from 'react-native-code-push'

import { store, persistor } from './redux'

import { options } from './utils/codepush'

import RouterScreens from './routes'
import Fetcher from './utils/fetcher'
import { saveToken } from './redux/actions/auth'
import Loader from './components/loader'
import { setLocation } from './redux/actions/location'
import autobind from 'autobind-decorator'
import { Host } from 'react-native-portalize'

enableScreens()

@CodePush(options)
class App extends React.Component {
  static fetcher = new Fetcher()

  public state = {
    ready: false,
  }

  async componentDidMount() {
    SplashScreen.hide()

    try {
      const isLoggedIn = await App.fetcher.isLoggedIn()
      const token = await store.getState().authReducer.token

      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
      }

      if (!isLoggedIn && !token) {
        const { access_token, token_type } = await this.retrieveToken()

        App.fetcher.token = access_token
        App.fetcher.tokenType = token_type

        console.info('[ShrimpPrice] Saving Token.')

        store.dispatch(saveToken(access_token))
      }

      persistor.persist()
    } catch (e) {
      throw new Error(e)
    } finally {
      Geolocation.getCurrentPosition((response) =>
        this.getGeocodedRegency(response).then((result) => {
          store.dispatch(setLocation(result))
          this.setState({ ready: true })
        }),
      )
    }
  }

  @autobind
  public async getGeocodedRegency(response: GeolocationResponse) {
    const geoAPIEndpoint =
      // 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=-7.8032076&longitude=110.3573354&localityLanguage=id'
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${response.coords.latitude}&longitude=${response.coords.longitude}&localityLanguage=id`

    const resp = await fetch(geoAPIEndpoint)
    const geocoded = await resp.json()

    try {
      const res = await App.fetcher.api(`/regions?search=${geocoded.city}&sort=&scope=regency`, {
        method: 'GET',
      })
      const { data: regions } = await res.json()

      return Promise.resolve({ ...response, regions, geocoded })
    } catch (error) {
      return Promise.reject(error)
    }
  }

  @autobind
  public async retrieveToken() {
    const body = new FormData()
    body.append('grant_type', 'client_credentials')
    body.append('client_id', Config.API_CLIENT_ID)
    body.append('client_secret', Config.API_CLIENT_SECRET)
    body.append('scope', '*')

    try {
      const response = await App.fetcher.oauth('/token', {
        method: 'POST',
        body,
      })

      const result = await response.json()

      return Promise.resolve(result)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  render() {
    const { ready } = this.state

    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StatusBar backgroundColor={'transparent'} barStyle={'dark-content'} translucent={true} />
          {ready ? (
            <SafeAreaProvider>
              <RouterScreens />
            </SafeAreaProvider>
          ) : (
            <Loader />
          )}
        </PersistGate>
      </Provider>
    )
  }
}

export declare const global: { HermesInternal: null | {} }
export default App
