import * as React from 'react'
import {
  Text,
  View,
  ViewStyle,
  TextInput,
  FlatList,
  TouchableOpacity,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fetcher from '../../utils/fetcher'
import style, { expandedContentHeight } from './style'

export type ItemsType = {
  value: string
  label: string
}

export interface DropdownProps {
  style?: ViewStyle
  visibility: boolean
  onToggle(value: boolean): void
  onChange(value: ItemsType): void
  endpoint: string
  placeholder: string
  value: ItemsType
}

export default function Dropdown({
  endpoint,
  placeholder,
  style: propStyle,
  visibility,
  onToggle,
  onChange,
  value,
}: React.PropsWithChildren<DropdownProps>) {
  let searchTimeout: number | NodeJS.Timeout | undefined
  const fetcher = new Fetcher()
  const iconRotation = useSharedValue(0)
  const iconAnimated = useAnimatedStyle(() => ({
    transform: [
      {
        rotateZ: `${iconRotation.value}deg`,
      },
    ],
  }))

  const contentHeight = useSharedValue(0)
  const contentAnimated = useAnimatedStyle(() => ({
    height: withTiming(contentHeight.value),
  }))

  const [items, setItems] = React.useState<Array<ItemsType>>([])
  const [selectedItem, setSelectedItem] = React.useState<ItemsType | null>(value || null)

  const find = (keyword = '') => async () => {
    try {
      const res = await fetcher.api(
        endpoint.replace(/search=/gi, 'search='.concat(keyword.toLowerCase())),
        { method: 'GET' },
      )

      const { data } = await res.json()

      const dataItems = data.map((el) => ({ value: el.id, label: el.name }))

      if (dataItems.length) {
        setItems(dataItems)
      }

      return dataItems
    } catch (error) {
      throw new Error(error)
    }
  }

  const handleOnChange = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const {
      nativeEvent: { text },
    } = e

    if (searchTimeout !== undefined) {
      clearTimeout(searchTimeout as number)
    }

    searchTimeout = setTimeout(find(text), 500)
  }

  const toggleOpen = () => onToggle(!visibility)

  React.useEffect(() => {
    iconRotation.value = withSpring(visibility ? -180 : 0)
    contentHeight.value = visibility ? expandedContentHeight : 0
  }, [contentHeight, iconRotation, visibility])

  React.useEffect(() => {
    find()()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderItem = ({ item }: ListRenderItemInfo<any>) => (
    <TouchableOpacity
      style={style.listItem}
      onPress={() => {
        setSelectedItem(item)
        onChange(item)
      }}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  )

  return (
    <Animated.View style={[style.wrapper, propStyle]}>
      <TouchableOpacity onPress={toggleOpen} style={style.toucher}>
        <>
          {(selectedItem && <Text style={style.text}>{selectedItem?.label}</Text>) || (
            <Text style={style.textPlaceholder}>Pilih {placeholder}</Text>
          )}
          <Animated.View style={iconAnimated}>
            <Ionicons name="chevron-down-outline" size={20} color={style.text.color} />
          </Animated.View>
        </>
      </TouchableOpacity>
      <Animated.View style={[style.contentWrapper, contentAnimated]}>
        <View style={style.content}>
          <View style={style.inputWrapper}>
            <TextInput
              style={style.input}
              onChange={handleOnChange}
              placeholder={`Cari ${placeholder} ...`}
              underlineColorAndroid={undefined}
            />
            <Ionicons name="search" size={style.input.fontSize} color={style.input.color} />
          </View>
          <FlatList
            style={style.list}
            contentContainerStyle={style.listContainer}
            data={items}
            keyExtractor={(item, index) => item.value.concat(index.toString())}
            renderItem={renderItem}
          />
        </View>
      </Animated.View>
    </Animated.View>
  )
}
