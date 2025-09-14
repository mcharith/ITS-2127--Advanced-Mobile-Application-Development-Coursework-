import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticaleScale } from '@/utils/styling'
import Input from '@/components/Inputs'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TransactionType, WalletType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import { useLocalSearchParams, useRouter } from 'expo-router'
import ImageUpload from '@/components/ImageUpload'
import { createOrUpdateWallet, deleteWallet } from '@/service/walletService'
import { TrashIcon } from 'phosphor-react-native'
import { limit, orderBy, where } from 'firebase/firestore'
import useFetchData from '@/hooks/useFetchData'
import TransactionList from '@/components/TransactionList'

const SearchModal = () => {

    const router = useRouter() 
    const {user} = useAuth()
    const [loading,setLoading] = useState(false)
    const [search, setSearch] = useState("")

    const constraints = [
        where("uid", "==", user?.uid),
        orderBy("date","desc"),
        limit(30)
    ]

    const {
            data:allTransactions, 
            error, 
            loading: transactionsLoading
        } = useFetchData<TransactionType>("transactions", constraints)

    const filteredTransactions = allTransactions.filter((item) => {
        if(search.length > 1){
            if(
                item.category?.toLowerCase()?.includes(search?.toLowerCase()) ||
                item.type?.toLowerCase()?.includes(search?.toLowerCase()) ||
                item.description?.toLowerCase()?.includes(search?.toLowerCase())
            ){
                return true;
            }
            return false;
        }
        return false;
    })


  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header 
          title={"Search"}
          leftIcon={<BackButton/>} 
          style={{marginBottom: spacingY._10}}
        />

        {/* form  */}
        <ScrollView contentContainerStyle={styles.form}>

          <View style={styles.inputContainer}>
            <Input 
              placeholder='shoes...'
              value={search}
              placeholderTextColor={colors.neutral700}
              containerStyle={{backgroundColor: colors.neutral200}}
              onChangeText={(value) => setSearch(value)}
            />
          </View>

          <View>
            <TransactionList 
                loading={transactionsLoading}
                data={filteredTransactions}
                emptyListMessage='No transactions match your search keyword.'
            />
          </View>

        </ScrollView>
      </View>

    </ModalWrapper>
  )
}

export default SearchModal

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
  },
  
  form:{
    gap: spacingY._30,
    marginTop: spacingY._15
  },
  avatarContainer:{
    position: "relative",
    alignSelf: "center"
  },
  inputContainer: {
    gap: spacingY._10
  }
})