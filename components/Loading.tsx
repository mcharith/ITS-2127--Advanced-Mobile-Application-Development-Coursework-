import { View, ActivityIndicator, ActivityIndicatorProps, StyleSheet } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'

const Loading: React.FC<ActivityIndicatorProps> = ({
  size = "large",
  color = colors.primary,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} {...rest} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
})