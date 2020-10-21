import { StyleSheet } from 'react-native'
import variables from '../../theme/variables'
import color from 'tinycolor2'

export const expandedContentHeight = 250
export default StyleSheet.create({
  wrapper: {
    //
  },
  toucher: {
    borderColor: variables.colors.light,
    borderWidth: 1,
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: { color: variables.colors.light },
  textPlaceholder: {
    color: variables.colors.grayLight,
  },
  content: {
    paddingVertical: 15,
  },
  contentWrapper: {
    backgroundColor: 'white',
    marginTop: 5,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    overflow: 'hidden',
  },
  inputWrapper: {
    backgroundColor: color(variables.colors.grayLight).lighten(12).toHexString(),
    borderRadius: 4,
    height: 36,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    fontSize: 14,
    flex: 1,
    color: variables.colors.grayDark,
    height: 40,
  },
  list: {
    height: expandedContentHeight - 68,
    borderTopColor: color(variables.colors.grayLight).lighten(12).toHexString(),
    borderTopWidth: 2,
    marginTop: 15,
    paddingTop: 5,
  },
  listContainer: {},
  listItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
})
