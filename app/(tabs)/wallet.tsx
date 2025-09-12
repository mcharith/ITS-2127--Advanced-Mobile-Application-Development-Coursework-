import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { verticaleScale } from '@/utils/styling'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import Typo from '@/components/Typo'
import { PlusCircleIcon } from 'phosphor-react-native'

const Wallet = () => {

  const getTotalBalance = () => {
    return 5000;
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* balance view */}
        <View style={styles.balenceViwe}>
          <View style={{alignItems: "center"}}>
            <Typo size={45} fontWeight={"500"}>LKR {getTotalBalance()?.toFixed(2)}</Typo>
            <Typo size={16} color={colors.neutral400}>Total Balance</Typo>
          </View>
        </View>

        {/* wallet  */}
        <View style={styles.wallets}>
          {/* header  */}
          <View style={styles.flexRow}>
            <Typo size={20} fontWeight={"500"}>My Wallets</Typo>
            <TouchableOpacity>
              <PlusCircleIcon 
                weight='fill'
                color={colors.primaryLight}
                size={verticaleScale(33)}
              />
            </TouchableOpacity>
          </View>

          {/* todo wallet list */}
          
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Wallet

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent: "space-between"
  },
  balenceViwe: {
    height: verticaleScale(160),
    // backgroundColor: 
    justifyContent: "center",
    alignItems: "center",
  },
  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral200,
    borderTopRightRadius: radius._30,
    borderTopLeftRadius: radius._30,
    padding: spacingX._20,
    paddingTop: spacingX._25,
  },
  listStyle: {
    paddingVertical: spacingY._25,
    paddingTop: spacingY._15
  }
})