import { StyleSheet } from 'react-native'
import variables from '../../theme/variables'
import color from 'tinycolor2'

export const footerLinkColor = color(variables.colors.grayLight).darken(10).toHexString()

export default StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    justifyContent: 'center',
    backgroundColor: color(variables.colors.grayLight).lighten(10).toHexString(),
  },
  contentContainer: {
    paddingBottom: 75,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: color(variables.colors.grayLight).darken(20).toHexString(),
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  item: {
    backgroundColor: variables.colors.light,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginBottom: 2,
  },
  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
  },
  itemFooter: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemFooterLink: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: variables.colors.grayDark,
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: variables.colors.primary,
    textTransform: 'capitalize',
  },
  itemDateInfo: {
    fontSize: 13,
    fontWeight: '600',
    color: footerLinkColor,
    maxWidth: '65%',
  },
  itemLink: {
    fontSize: 14,
    fontWeight: '600',
    color: footerLinkColor,
    marginRight: 3,
  },
})
