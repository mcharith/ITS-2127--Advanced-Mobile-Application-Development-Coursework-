import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { logout } from '@/service/authService'  
import { useRouter } from 'expo-router'      
import ScreenWrapper from '@/components/ScreenWrapper'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'

const Home = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await signOut(auth)                
      router.replace('/(auth)/login') 
    } catch (e:any) {
      console.error(e)
      Alert.alert('Logout failed', e?.message ?? 'Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ScreenWrapper>
      <Text>Home</Text>
    </ScreenWrapper>
  )
}

export default Home