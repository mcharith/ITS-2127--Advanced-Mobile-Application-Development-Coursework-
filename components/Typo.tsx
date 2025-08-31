import { View, Text, TextStyle } from 'react-native'
import React from 'react'
import { colors } from '@/constants/theme'
import { TypoProps } from '@/types'
import { verticaleScale } from '@/utils/styling'

const Typo = ({
    size,
    color = colors.text,
    fontWeight = "400",
    children,
    style,
    textProps = {},
}:TypoProps) => {

    const textStyle: TextStyle = {
        fontSize: size? verticaleScale(size): verticaleScale(18),
        color,
        fontWeight
    }

  return (
    <Text style={[textStyle,style]} {...textProps}>
        {children}
    </Text>
  )
}

export default Typo