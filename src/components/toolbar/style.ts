import { Dimensions, Platform, StyleSheet } from 'react-native'
import variables from '../../theme/variables'

export const screen = Dimensions.get('window')
export const toolbarItemHeight = 65 + (Platform.OS === 'ios' ? variables.headerGap : 0)
export const toolbarItemFilterHeightExpanded = 240
export const toolbarItemSortHeightExpanded = 260

const zIndex = {} as Record<string, any>

for (let i = 0; i < 10; i++) {
  zIndex[`z${i}`] = { zIndex: i * 100 }
}

export default StyleSheet.create({
  toolbar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: screen.width,
    backgroundColor: variables.colors.primary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  toolbarItem: {
    justifyContent: 'flex-start',
    paddingBottom: variables.headerGap,
  },
  toolbarItemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  toolbarItemPrimary: {
    backgroundColor: variables.colors.primary,
  },
  toolbarItemPrimaryDarken: {
    backgroundColor: variables.colors.primaryDarken,
  },
  toolbarText: {
    color: variables.colors.light,
    fontSize: 16,
    fontWeight: '600',
  },
  toolbarSubText: {
    color: variables.colors.light,
    fontSize: 10,
    fontWeight: '400',
  },
  closeText: {
    color: variables.colors.light,
    fontSize: 16,
    fontWeight: '600',
  },
  toolbarTextWrapper: {
    marginLeft: 6,
    flex: 1,
  },
  toolbarItemContent: {
    paddingBottom: 15,
    paddingHorizontal: 20,
    borderTopColor: variables.colors.grayLight,
    borderTopWidth: 1,
  },
  formItem: {},
  formItemLabel: {
    color: variables.colors.light,
    fontSize: 14,
    marginBottom: 4,
    marginTop: 15,
  },
  formOptionWrapper: {
    marginTop: 15,
  },
  formOptionItem: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formOptionItemBordered: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.5)',
  },
  formOptionItemText: {
    color: variables.colors.light,
    fontSize: 14,
  },
  formAction: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  formActionButton: {
    backgroundColor: variables.colors.light,
    padding: 15,
    flexBasis: `${100 / 2.05}%`,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: variables.colors.light,
  },
  formActionButtonFull: {
    flexBasis: '100%',
  },
  formActionButtonDisabled: {
    opacity: 0.5,
  },
  formActionButtonOutlined: {
    backgroundColor: 'transparent',
  },
  formActionButtonText: {
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 14,
    color: variables.colors.primary,
  },
  formActionButtonOutlinedText: {
    color: variables.colors.light,
  },
  ...zIndex,
})
