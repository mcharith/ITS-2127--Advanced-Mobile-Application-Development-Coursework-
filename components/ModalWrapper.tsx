import { View, StyleSheet, ViewStyle, Platform } from 'react-native'
import React from 'react'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { ModelWrapperProps } from '@/types'

const isIos = Platform.OS == "ios"

const ModalWrapper: React.FC<ModelWrapperProps> = ({
  style,
  children,
  bg = colors.neutral300
}) => {
  return (
    <View style={[styles.container, { backgroundColor: bg }, style]}>
      {children}
    </View>
  )
}

export default ModalWrapper

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: isIos ? spacingY._15 : 50,
    paddingBottom: isIos ? spacingY._20 : spacingY._10
  }
})