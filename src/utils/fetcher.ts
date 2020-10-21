import AsyncStorage from '@react-native-community/async-storage'
import Config from 'react-native-config'

export default class Fetcher {
  private _token: string = ''
  private _tokenType: string = 'bearer'
  private _loggedIn: boolean = false

  public headers = new Headers()

  constructor() {
    this.init()

    return this
  }

  private async init() {
    try {
      const presisted = await AsyncStorage.getItem('persist:@root')
      const { authReducer } = JSON.parse(presisted as string)
      const { token, loggedIn } = JSON.parse(authReducer)

      this._token = token
      this._loggedIn = loggedIn
    } catch (error) {
      throw new Error(error)
    }

    return this
  }

  public async isLoggedIn() {
    try {
      const presisted = await AsyncStorage.getItem('persist:@root')
      const { authReducer } = JSON.parse(presisted as string)
      const { loggedIn } = JSON.parse(authReducer)

      return Promise.resolve(loggedIn)
    } catch (error) {
      return Promise.reject(error)
    }
  }

  public oauth(path: RequestInfo, init?: RequestInit): Promise<Response> {
    if (!this._loggedIn) {
      this.headers.append('Authorization', `${this._tokenType} ${this._token}`)
    }

    return fetch(Config.API_ENDPOINT + Config.API_OAUTH + path, {
      headers: this.headers,
      ...init,
    })
  }

  public api(path: RequestInfo, init?: RequestInit): Promise<Response> {
    if (!this._loggedIn) {
      this.headers.append('Authorization', `${this._tokenType} ${this._token}`)
    }

    this.headers.append('Accept', 'application/json')

    return fetch(Config.API_ENDPOINT + Config.API_PATH + path, {
      headers: this.headers,
      ...init,
    })
  }

  get token() {
    return this._token
  }

  set token(val: string) {
    this._token = val
  }

  get tokenType() {
    return this._tokenType
  }

  set tokenType(val: string) {
    this._tokenType = val
  }
}
