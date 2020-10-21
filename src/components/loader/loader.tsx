import * as React from 'react'
import { View, ActivityIndicator, Text } from 'react-native'
import variables from '../../theme/variables'
import style from './style'

export default function () {
  return (
    <View style={style.wrapper}>
      <ActivityIndicator size="large" color={variables.colors.primary} />
      <Text style={style.message}>Mempersiapkan ...</Text>
    </View>
  )
}
