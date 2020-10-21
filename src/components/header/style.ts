import { StyleSheet } from 'react-native'
import variables from '../../theme/variables'
import color from 'tinycolor2'

export const shareLinkColor = color(variables.colors.grayLight).darken(10).toHexString()
export default StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
  },
  title: {
  },
  subtitle: {
  },
  shareLink: {},
})
