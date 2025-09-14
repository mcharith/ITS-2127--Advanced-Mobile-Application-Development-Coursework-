import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { TransactionItemProps, TransactionListType, TransactionType } from '@/types'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import Typo from './Typo'
import { FlashList } from "@shopify/flash-list";
import Loading from './Loading'
import { expenseCategories, incomeCategory } from '@/constants/data'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { Timestamp } from 'firebase/firestore'
import { useRouter } from 'expo-router'

const TransactionList = ({
    data,
    title,
    loading,
    emptyListMessage
}: TransactionListType) => {

    const router = useRouter()

    const handleClick = (item:TransactionType) => {
        router.push({
            pathname: "/(modals)/transactionModal",
            params:{
                id: item?.id,
                type: item?.type,
                amount: item?.amount,
                category: item?.category,
                date: (item.date as Timestamp)?.toDate()?.toISOString(),
                description: item?.description,
                image: item?.image,
                uid: item?.uid,
                walletId: item.walletId
            }
        })
    }

  return (
    <View style={styles.container}>
        {title && (
            <Typo size={20} fontWeight={"500"}>{title}</Typo>
        )}

        <View style={styles.list}>
            <FlashList
                data={data}
                renderItem={({ item, index }) => (
                    <TransactionItem item ={item} index={index} handleClick={handleClick}/>
                )}
                estimatedItemSize={60}
             />
        </View>
        {!loading && data.length == 0 && (
            <Typo
                size={15}
                color={colors.neutral400}
                style={{textAlign: "center", marginTop: spacingY._15}}
            >{emptyListMessage}</Typo>
        )}

        {loading && (
            <View style={{top: verticaleScale(100)}}>
                <Loading/>
            </View>
        )}
    </View>
  )
}

const TransactionItem = ({
    item,index,handleClick
}:TransactionItemProps) => {
    let category = 
        item?.type == "income" ? incomeCategory : expenseCategories[item.category!]
    const IconComponent = category.icon;

    const date = (item?.date as Timestamp)?.toDate()?.toLocaleDateString("en-GB",{
        day: "numeric",
        month: "short"
    })

    return (
        <Animated.View entering={FadeInDown.delay(index * 70).springify().damping(14)}>
            <TouchableOpacity style={styles.row} onPress={() => handleClick(item)}>
                <View style={[styles.icon, {backgroundColor:category.bgColor}]}>
                    {IconComponent && (
                        <IconComponent 
                            size={verticaleScale(25)}
                            weight="fill"
                            color={colors.white}
                        />
                    )}
                </View>

                <View style={styles.categoryDes}>
                    <Typo size={17}>{category.label}</Typo>
                    <Typo size={12} color={colors.neutral500} textProps={{numberOfLines: 1}}>{item?.description}</Typo>
                </View>

                <View style={styles.amountDate}>
                    <Typo size={15} fontWeight={"500"} 
                    color={item?.type == "income" ? colors.green : colors.rose}> 
                        {`${item?.type == "income" ? "+ LKR" : "- LKR"}${item?.amount}`}
                    </Typo>
                    <Typo size={13} color={colors.neutral500}>{date}</Typo>
                </View>

            </TouchableOpacity>
        </Animated.View>
    )
}

export default TransactionList

const styles = StyleSheet.create({
    container:{
        gap: spacingY._15,

    },
    list: {
        minHeight: 3,
    },
    row:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems:"center",
        gap: spacingX._12,
        marginBottom: spacingY._12,

        // list with Background
        backgroundColor: colors.neutral200,
        padding: spacingY._10,
        paddingHorizontal: spacingY._10,
        borderRadius: radius._17
    },
    icon:{
        height:verticaleScale(44),
        aspectRatio:1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: radius._12,
        borderCurve: "continuous",
    },
    categoryDes: {
        flex: 1,
        gap: 2.5,
    },
    amountDate:{
        alignItems: "flex-end",
        gap: 3,
    }
})