import { Platform } from 'react-native'

export default {
  headerGap: Platform.OS === 'ios' ? 35 : 25,

  colors: {
    primary: '#1b77df',
    primaryDarken: '#0050ac',
    gray: '#959eb1',
    grayLight: '#c2cbe0',
    grayDark: '#4e555f',
    light: '#fff',
  },
}
