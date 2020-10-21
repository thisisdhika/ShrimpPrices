import { StyleSheet } from 'react-native'
import variables from '../../theme/variables'

export default StyleSheet.create({
  wrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    marginTop: 20,
    color: variables.colors.grayDark,
  },
})
