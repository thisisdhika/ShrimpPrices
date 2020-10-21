import { Platform } from 'react-native'
import codePush, { CodePushOptions } from 'react-native-code-push'
import Config from 'react-native-config'

export const options: CodePushOptions = {
  installMode: codePush.InstallMode.IMMEDIATE,
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  deploymentKey: Platform.OS === 'ios' ? Config.CODEPUSH_IOS : Config.CODEPUSH_ANDROID,
}

export default options
