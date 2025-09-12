import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Typo from './Typo'
import { WalletType } from '@/types'
import { Router } from 'expo-router'
import { verticaleScale } from '@/utils/styling'
import { colors, radius, spacingX } from '@/constants/theme'
import { Image } from 'expo-image'
import { CaretRightIcon } from 'phosphor-react-native'
import Animated, { FadeInDown } from 'react-native-reanimated'

const WalletListItem = ({item, index, router}:{
    item: WalletType,
    index: number,
    router: Router
}) => {
  return (
    <Animated.View entering={FadeInDown.delay(index * 50).springify().damping(13)}>
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                style={{flex:1}}
                source={item?.image}
                contentFit="cover"
                transition={100}
            />
            </View>
            <View style={styles.nameContainer}>
                <Typo size={16}>{item?.name}</Typo>
                <Typo size={14} color={colors.neutral500}>{item?.amount}</Typo>
            </View>

            <CaretRightIcon 
                size={verticaleScale(20)}
                weight="bold"
                color={colors.black}
            />
        </TouchableOpacity>
    </Animated.View>
  )
}

export default WalletListItem

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom: verticaleScale(17)
    },
    imageContainer:{
        height: verticaleScale(45),
        width: verticaleScale(45),
        borderWidth: 1,
        borderColor: colors.neutral200,
        borderRadius: radius._12,
        borderCurve:"continuous",
        overflow:"hidden",
    },
    nameContainer:{
        flex:1,
        gap:2,
        marginLeft: spacingX._10
    }
})