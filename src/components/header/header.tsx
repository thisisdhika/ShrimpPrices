import * as React from 'react'
import { View, Text } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/AntDesign'
import style, { shareLinkColor } from './style'

export default function () {
  return (
    <View style={style.header}>
      <Icon name="left" size={22} color={'transparent'} />
      <View style={style.wrapper}>
        <Text style={style.title}>Harga Udang</Text>
        <Text style={style.subtitle}>Ukuran 100</Text>
      </View>
      <TouchableOpacity style={style.shareLink} onPress={() => console.log('share')}>
        
      </TouchableOpacity>
    </View>
  )
}
