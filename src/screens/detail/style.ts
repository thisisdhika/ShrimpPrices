import { StyleSheet } from 'react-native'
import variables from '../../theme/variables'
import color from 'tinycolor2'

export const chartConfig = {
  backgroundColor: variables.colors.light,
  backgroundGradientFrom: variables.colors.light,
  backgroundGradientTo: variables.colors.light,
  color: (opacity = 1) => color(variables.colors.primary).setAlpha(opacity).toHexString(),
  labelColor: (opacity = 1) =>
    color(variables.colors.primaryDarken).setAlpha(opacity).toHexString(),
  strokeWidth: 4,
}

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: color(variables.colors.grayLight).lighten(10).toHexString(),
  },
  card: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: variables.colors.light,
  },
  pricesItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: color(variables.colors.grayLight).darken(10).toHexString(),
  },
  pricesItemLast: {
    borderBottomWidth: 0,
  },
  chart: {
    marginVertical: 10,
  },
  title: {
    marginTop: 6,
    marginBottom: 12,
  },
  subtitle: {
    color: color(variables.colors.grayLight).darken(25).toHexString(),
    fontSize: 13,
    marginBottom: 2,
  },
  textBase: {
    textTransform: 'capitalize',
    color: variables.colors.grayDark,
  },
  textPrimary: {
    color: variables.colors.primary,
  },
  textBold: {
    fontWeight: '600',
  },
  textLg: {
    fontSize: 17,
    fontWeight: '600',
  },
  gapBottom: {
    marginBottom: 15,
  },
})
