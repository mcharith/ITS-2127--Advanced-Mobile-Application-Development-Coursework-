import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { InputProps } from '@/types'
import { colors, radius, spacingX } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'

const input = (props:InputProps) => {
  return (
    <View style={[styles.container, props.containerStyle && props.containerStyle]}>
        {
            props.icon && props.icon
        }
        <TextInput 
            style={[styles.input, props.inputStyle]}
            placeholderTextColor={colors.neutral400}
            ref={props.inputRef && props.inputRef}
            {...props
            }
        />
    </View>
  )
}

export default input

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        height: verticaleScale(54),
        alignItems: "center",
        justifyContent: "center",
        borderWidth:1,
        borderColor:colors.neutral900,
        borderRadius: radius._17,
        borderCurve:"continuous",
        paddingHorizontal: spacingX._15,
        gap: spacingX._10
    },
    input:{
        flex: 1,
        color: colors.black,
        fontSize: verticaleScale(14),
    },
})