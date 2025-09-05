import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import Button from '@/components/Button'
import Typo from '@/components/Typo'
import { logout } from '@/service/authService'   // ✅ use the service
import { useRouter } from 'expo-router'          // ✅ navigate after logout

const Home = () => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    try {
      setLoading(true)
      await logout()                // calls signOut(auth) under the hood
      router.replace('/(auth)/login') // redirect to login
    } catch (e:any) {
      console.error(e)
      Alert.alert('Logout failed', e?.message ?? 'Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View>
      <Text>Home</Text>
      <Button onPress={handleLogout} loading={loading}>
        <Typo>Logout</Typo>
      </Button>
    </View>
  )
}

export default Home