import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { scale, verticaleScale } from '@/utils/styling'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { ImageBackground } from 'expo-image'
import Typo from './Typo'
import { ArrowDownIcon, ArrowUpIcon, DotsThreeOutlineIcon } from 'phosphor-react-native'
import { useAuth } from '@/context/AuthContext'
import useFetchData from '@/hooks/useFetchData'
import { WalletType } from '@/types'
import { orderBy, where } from 'firebase/firestore'

const HomeCard = () => {

    const {user} = useAuth()

    const {
        data:wallets, 
        error, 
        loading: walletLoading
    } = useFetchData<WalletType>("wallets",[
        where("uid", "==", user?.uid),
        orderBy("created","desc")
    ])

    const getTotal = () => {
        return wallets.reduce((totals:any, items:WalletType)=>{
            totals.balance = totals.balance + Number(items.amount);
            totals.income = totals.income + Number(items.totalIncome);
            totals.expenses = totals.expenses + Number(items.totalExpenses);
            return totals;
        },{balance:0,income:0,expenses:0})
    }

  return (
    <ImageBackground
        source={require("../assets/images/card.png")}
        contentFit="fill"
        style={styles.bgImage}
    >
        <View style={styles.container}>
            <View>
                <View style={styles.totalBalanceRow}>
                    <Typo color={colors.neutral800} size={17} fontWeight={"500"}>
                        Total Balance
                    </Typo>
                    <DotsThreeOutlineIcon 
                        size={verticaleScale(23)}
                        color={colors.black}
                        weight="fill"
                    />
                </View>
                <Typo size={30} color={colors.black} fontWeight={"bold"}>
                    LKR {walletLoading ? "---" : getTotal()?.balance.toFixed(2)}
                </Typo>
            </View>

            {/* expense and income */}
            <View style={styles.status}>
                {/* income */}
                <View style={{gap:verticaleScale(5)}}>
                    <View style={styles.incomeExpenses}>
                        <View style={styles.statusIcon}>
                            <ArrowDownIcon 
                                size={verticaleScale(14)}
                                color={colors.green}
                                weight="bold"
                            />
                        </View>
                        <Typo size={15} color={colors.black} fontWeight={"500"}>Income</Typo>
                    </View>
                    <View style={{alignSelf: "center"}}>
                        <Typo size={15} color={colors.green} fontWeight={"600"}>
                            LKR {walletLoading ? "---" :getTotal()?.income.toFixed(2)}
                        </Typo>
                    </View>
                </View>

                {/* expense */}
                <View style={{gap:verticaleScale(5)}}>
                    <View style={styles.incomeExpenses}>
                        <View style={styles.statusIcon}>
                            <ArrowUpIcon 
                                size={verticaleScale(14)}
                                color={colors.rose}
                                weight="bold"
                            />
                        </View>
                        <Typo size={15} color={colors.black} fontWeight={"500"}>Expense</Typo>
                    </View>
                    <View style={{alignSelf: "center"}}>
                        <Typo size={15} color={colors.rose} fontWeight={"600"}>
                            LKR {walletLoading ? "---" : getTotal()?.expenses.toFixed(2)}
                        </Typo>
                    </View>
                </View>
            </View>
        </View>
    </ImageBackground>
  )
}
 
export default HomeCard

const styles = StyleSheet.create({
    bgImage:{
        height: scale(210),
        width: "100%",
    },
    container:{
        padding: spacingX._20,
        paddingHorizontal: scale(23),
        height: "87%",
        width: "100%",
        justifyContent: "space-between",
        // alignItems: "center",
        marginBottom: spacingY._5
    },
    totalBalanceRow:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: spacingY._5,
    },
    status:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    statusIcon:{
       backgroundColor: colors.neutral350,
       padding: spacingY._5,
       borderRadius: 50,
    },
    incomeExpenses: {
        flexDirection: "row",
        alignItems: "center",
        gap: spacingY._7
    }
})