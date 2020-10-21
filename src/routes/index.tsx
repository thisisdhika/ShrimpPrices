/* eslint-disable react-native/no-inline-styles */
import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  StackNavigationOptions,
} from '@react-navigation/stack'

import Home from '../screens/home'
import Detail from '../screens/detail'
import variables from '../theme/variables'
import Icon from 'react-native-vector-icons/AntDesign'
import color from 'tinycolor2'
import { Platform } from 'react-native'

const Stack = createStackNavigator()

const screenOptions: StackNavigationOptions = {
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  headerStyleInterpolator: HeaderStyleInterpolators.forFade,
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
      overlayStyle: {
        opacity: current.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 0.5],
        }),
      },
    }
  },
  cardOverlayEnabled: true,
  headerStyle: {
    height: Platform.OS === 'ios' ? 100 : 85,
    backgroundColor: variables.colors.light,
  },
  headerRightContainerStyle: {
    marginRight: 20,
  },
  headerLeftContainerStyle: {
    marginLeft: 10,
  },
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: variables.colors.grayDark,
  },
  headerBackTitleVisible: false,
  headerBackImage: () => (
    <Icon
      name="left"
      size={22}
      color={color(variables.colors.grayLight).darken(10).toHexString()}
    />
  ),
  headerRight: () => (
    <Icon
      name="sharealt"
      size={22}
      color={color(variables.colors.grayLight).darken(10).toHexString()}
    />
  ),
}

export default () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home" {...{ screenOptions }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Detail" component={Detail} options={{ title: 'Detail Harga Udang' }} />
    </Stack.Navigator>
  </NavigationContainer>
)
