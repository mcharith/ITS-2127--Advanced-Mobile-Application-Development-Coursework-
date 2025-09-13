import { View, Text, Alert, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { logout } from '@/service/authService'  
import { useRouter } from 'expo-router'      
import ScreenWrapper from '@/components/ScreenWrapper'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useAuth } from '@/context/AuthContext'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import { MagnifyingGlassIcon } from 'phosphor-react-native'
import HomeCard from '@/components/HomeCard'
import TransactionList from '@/components/TransactionList'

const Home = () => {
  const router = useRouter()
  const { user } = useAuth()

  return (
    <ScreenWrapper style={{backgroundColor:colors.neutral350}}>
      <View style={styles.container}>
        {/* header */}
        <View style={styles.header}>
          <View style={{gap:1}}>
            <Typo size={16} color={colors.neutral400}>Hello,</Typo>
            <Typo size={20} fontWeight={"600"}>{user?.displayName}</Typo>
          </View>
          <TouchableOpacity style={styles.searchIcon}>
            <MagnifyingGlassIcon 
              size={verticaleScale(22)}
              color={colors.white}
              weight="bold"
            />
          </TouchableOpacity>
        </View>

        <ScrollView 
          contentContainerStyle={styles.scrollViewStyle}
          showsVerticalScrollIndicator={false}
        >
          {/* card */}
          <View>
            <HomeCard/>
          </View>

          <TransactionList 
            data={[1,2,3]} 
            loading={false}
            emptyListMessage="No Transaction added yet!"
            title="Recent Transactions" 
          />

        </ScrollView>

      </View>
    </ScreenWrapper>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: spacingX._20,
    marginTop: verticaleScale(8),
  },
  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacingY._10,
  },
  searchIcon: {
    backgroundColor: colors.neutral350,
    padding: spacingX._10,
    borderRadius: 50,
  },
  floatingButton: {
    height: verticaleScale(50),
    width: verticaleScale(50),
    borderRadius: 100,
    position: "absolute",
    bottom: verticaleScale(30),
    right: verticaleScale(30)
  },
  scrollViewStyle: {
    marginTop: spacingY._10,
    paddingBottom: verticaleScale(100),
    gap: spacingY._25
  },
})