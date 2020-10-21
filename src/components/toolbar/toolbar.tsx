/* eslint-disable max-statements */
import * as React from 'react'
import { Platform, Text, TouchableOpacity, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import style, {
  screen,
  toolbarItemHeight as itemHeight,
  toolbarItemFilterHeightExpanded,
  toolbarItemSortHeightExpanded,
} from './style'
import Dropdown from '../dropdown'
import { Keyboard } from 'react-native'
import { Portal } from 'react-native-portalize'
import { expandedContentHeight } from '../dropdown/style'

const sortItems = [
  {
    label: 'Termurah',
    value: 'asc',
  },
  {
    label: 'Termahal',
    value: 'desc',
  },
]

export default function (props: React.ComponentProps<any>) {
  const [hasKeyboardOpen, setHasKeyboardOpen] = React.useState(false)
  const [isSomeBarOpen, setIsSomeBarOpen] = React.useState(false)
  const [filterBar, setFilterBar] = React.useState(false)
  const [sortBar, setSortBar] = React.useState(false)
  const [locationDropdown, setLocationDropdown] = React.useState(false)

  const [dataValue, setDataValue] = React.useState({
    filter: null,
    sort: null,
    ...props.initialValues,
  })

  const [applies, setApplies] = React.useState({
    filter: false,
    sort: true,
  })

  const toolbarFilterWidth = useSharedValue(screen.width / 2)
  const toolbarSorterWidth = useSharedValue(screen.width / 2)
  const toolbarFilterOpacity = useSharedValue(1)
  const toolbarSorterOpacity = useSharedValue(1)
  const toolbarItemHeight = useSharedValue(itemHeight)
  const keyboardHeight = useSharedValue(0)

  const animatedFilterBar = useAnimatedStyle(
    () => ({
      opacity: withTiming(toolbarFilterOpacity.value),
      width: withTiming(toolbarFilterWidth.value),
      height:
        filterBar || sortBar
          ? withSpring(toolbarItemHeight.value)
          : withTiming(toolbarItemHeight.value),
    }),
    [filterBar, sortBar],
  )
  const animatedSorterBar = useAnimatedStyle(
    () => ({
      opacity: withTiming(toolbarSorterOpacity.value),
      width: withTiming(toolbarSorterWidth.value),
      height:
        filterBar || sortBar
          ? withSpring(toolbarItemHeight.value)
          : withTiming(toolbarItemHeight.value),
    }),
    [filterBar, sortBar],
  )
  const animatedToolbar = useAnimatedStyle(() => ({
    bottom: withTiming(hasKeyboardOpen ? keyboardHeight.value : 0),
  }))

  const toolbarContentOpacity = useSharedValue(0)
  const animatedBarContent = useAnimatedStyle(() => ({
    opacity: withTiming(toolbarContentOpacity.value, undefined, () => {
      setIsSomeBarOpen(!!toolbarContentOpacity.value)
    }),
    // height: toolbarItemHeightExpanded - itemHeight,
  }))

  const openBar = React.useCallback(
    (bool: boolean) => {
      if (bool) {
        toolbarContentOpacity.value = 1
      } else {
        toolbarContentOpacity.value = 0
      }
    },
    [toolbarContentOpacity.value],
  )

  React.useEffect(() => {
    if (filterBar && !sortBar) {
      toolbarFilterOpacity.value = 1
      toolbarSorterOpacity.value = 0

      setTimeout(() => {
        toolbarFilterWidth.value = screen.width
        toolbarSorterWidth.value = 0

        setTimeout(() => {
          toolbarItemHeight.value = toolbarItemFilterHeightExpanded

          openBar(true)
        }, 250)
      }, 200)
    } else if (!filterBar && sortBar) {
      toolbarFilterOpacity.value = 0
      toolbarSorterOpacity.value = 1

      setTimeout(() => {
        toolbarFilterWidth.value = 0
        toolbarSorterWidth.value = screen.width

        setTimeout(() => {
          toolbarItemHeight.value = toolbarItemSortHeightExpanded

          openBar(true)
        }, 250)
      }, 200)
    } else {
      setLocationDropdown(false)

      toolbarItemHeight.value = itemHeight

      openBar(false)

      setTimeout(() => {
        toolbarFilterWidth.value = screen.width / 2
        toolbarSorterWidth.value = screen.width / 2

        setTimeout(() => {
          toolbarFilterOpacity.value = 1
          toolbarSorterOpacity.value = 1
        }, 200)
      }, 250)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterBar,
    sortBar,
    toolbarItemHeight,
    toolbarFilterOpacity,
    toolbarFilterWidth,
    toolbarSorterOpacity,
    toolbarSorterWidth,
    openBar,
  ])

  const toggleDropdowns = (val: boolean) => {
    const height = sortBar ? toolbarItemSortHeightExpanded : toolbarItemFilterHeightExpanded
    setLocationDropdown(val)

    if (val) {
      toolbarItemHeight.value = height + expandedContentHeight
    } else {
      Keyboard.dismiss()
      toolbarItemHeight.value = height
    }
  }

  React.useEffect(() => {
    Keyboard.addListener('keyboardDidShow', keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', keyboardDidHide)

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', keyboardDidShow)
      Keyboard.removeListener('keyboardDidHide', keyboardDidHide)
    }
  }, [])

  const keyboardDidShow = ({ endCoordinates: { height } }) => {
    keyboardHeight.value = Platform.OS === 'ios' ? height : 0
    setHasKeyboardOpen(true)
  }
  const keyboardDidHide = () => setHasKeyboardOpen(false)

  const apply = (payload: typeof applies) => {
    if (filterBar) {
      setFilterBar(false)
    }

    if (sortBar) {
      setSortBar(false)
    }

    props.onApplied(dataValue, () => {
      setApplies(payload)
    })
  }

  return (
    <Portal>
      <Animated.View style={[style.toolbar, animatedToolbar]}>
        <Animated.View
          style={[style.toolbarItem, style.toolbarItemPrimaryDarken, animatedFilterBar]}>
          <TouchableOpacity
            onPress={() => setFilterBar(!filterBar)}
            disabled={isSomeBarOpen && filterBar}>
            <View>
              <View style={style.toolbarItemWrapper}>
                <Ionicons name="filter" color={style.toolbarText.color} size={26} />
                <View style={style.toolbarTextWrapper}>
                  <Text style={style.toolbarText}>Filter Lokasi</Text>
                  {!isSomeBarOpen && dataValue.filter && applies.filter && (
                    <Text style={style.toolbarSubText}>{dataValue.filter.label}</Text>
                  )}
                </View>
                {isSomeBarOpen && filterBar && (
                  <Text onPress={() => setFilterBar(false)} style={style.closeText}>
                    Batal
                  </Text>
                )}
              </View>
              {isSomeBarOpen && filterBar && (
                <Animated.View style={[style.toolbarItemContent, animatedBarContent]}>
                  <View style={[style.formItem]}>
                    <Text style={style.formItemLabel}>Lokasi</Text>
                    <Dropdown
                      placeholder="Lokasi"
                      endpoint="/regions?search="
                      value={dataValue.filter}
                      visibility={locationDropdown}
                      onChange={(val) => setDataValue({ ...dataValue, filter: val })}
                      onToggle={(val) => toggleDropdowns(val)}
                    />
                  </View>
                  <View style={style.formAction}>
                    {applies.filter && (
                      <TouchableOpacity
                        style={[style.formActionButton, style.formActionButtonOutlined]}
                        onPress={() => apply({ ...applies, filter: false })}>
                        <Text
                          style={[style.formActionButtonText, style.formActionButtonOutlinedText]}>
                          Reset Filter
                        </Text>
                      </TouchableOpacity>
                    )}
                    <TouchableOpacity
                      style={[
                        style.formActionButton,
                        !applies.filter ? style.formActionButtonFull : null,
                        !dataValue.filter ? style.formActionButtonDisabled : null,
                      ]}
                      disabled={!dataValue.filter}
                      onPress={() => apply({ ...applies, filter: true })}>
                      <Text style={style.formActionButtonText}>Terapkan</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              )}
            </View>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[style.toolbarItem, style.toolbarItemPrimary, animatedSorterBar]}>
          <TouchableOpacity
            onPress={() => setSortBar(!sortBar)}
            disabled={isSomeBarOpen && sortBar}>
            <>
              <View style={style.toolbarItemWrapper}>
                <MCIcon name="sort" color={style.toolbarText.color} size={26} />
                <View style={style.toolbarTextWrapper}>
                  <Text style={style.toolbarText}>Urutkan</Text>
                  {!isSomeBarOpen && dataValue.sort && applies.sort && (
                    <Text style={style.toolbarSubText}>
                      {sortItems.find((el) => el.value === dataValue.sort)?.label}
                    </Text>
                  )}
                </View>
                {isSomeBarOpen && sortBar && (
                  <Text onPress={() => setSortBar(false)} style={style.closeText}>
                    Batal
                  </Text>
                )}
              </View>
              {isSomeBarOpen && sortBar && (
                <Animated.ScrollView style={[style.toolbarItemContent, animatedBarContent]}>
                  <View style={style.formOptionWrapper}>
                    {sortItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <TouchableOpacity
                          key={`${index}item`}
                          style={[style.formOptionItem]}
                          onPress={() => setDataValue({ ...dataValue, sort: item.value })}>
                          <Text style={style.formOptionItemText}>{item.label}</Text>
                          {item.value === dataValue.sort && (
                            <MCIcon
                              name="check"
                              size={style.formOptionItemText.fontSize}
                              color={style.formOptionItemText.color}
                            />
                          )}
                        </TouchableOpacity>
                        {index + 1 !== sortItems.length && (
                          <View key={`${index}border`} style={style.formOptionItemBordered} />
                        )}
                      </React.Fragment>
                    ))}
                  </View>
                  <View style={style.formAction}>
                    <TouchableOpacity
                      style={[
                        style.formActionButton,
                        style.formActionButtonFull,
                        !dataValue.sort ? style.formActionButtonDisabled : null,
                      ]}
                      disabled={!dataValue.sort}
                      onPress={() => apply({ ...applies, sort: true })}>
                      <Text style={style.formActionButtonText}>Terapkan</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.ScrollView>
              )}
            </>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    </Portal>
  )
}
