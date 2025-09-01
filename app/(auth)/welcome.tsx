import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated'

const Welcome = () => {

  const router = useRouter()

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button and image */}
        <View>
          <TouchableOpacity onPress={()=> router.push('/(auth)/login')} style={styles.loginButton}>
            <Typo fontWeight={"500"} color='black'>Sign in</Typo>
          </TouchableOpacity>

          <Animated.Image
            entering={FadeIn.duration(500)}
            source = {require("../../assets/images/piggy-welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Animated.View
            entering={FadeInDown.duration(1000).springify().damping(12)} 
            style={{ alignItems: "center" }}>
            <Typo size={30} fontWeight={"800"} color={colors.neutral500}>Always take Control</Typo>
            <Typo size={30} fontWeight={"800"} color={colors.neutral500}>of your finance</Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(100).springify().damping(12)}
            style={{ alignItems: "center", gap:2 }}>
            <Typo size={17} color={colors.neutral400}>Finanace must be arranged to set a better</Typo>
            <Typo size={17} color={colors.neutral400}>lifestyle in future</Typo>
          </Animated.View>

          <Animated.View
            entering={FadeInDown.duration(1000).delay(200).springify().damping(12)}
            style={styles.buttonContainer}>
          <Button onPress={()=> router.push('/(auth)/register')}>
            <Typo size={22} fontWeight={"600"} color={colors.neutral900}>Get Started</Typo>
          </Button>
          </Animated.View>

        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Welcome

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "space-between",
    paddingTop: spacingY._7
  },
  welcomeImage:{
    width: "100%",
    height: verticaleScale(300),
    alignSelf: "center",
    marginTop: verticaleScale(100),
  },
  loginButton:{
    alignSelf: "flex-end",
    marginRight: spacingX._20
  },
  footer:{
    backgroundColor: colors.neutral100,
    alignItems: "center",
    paddingTop:verticaleScale(30),
    paddingBottom:verticaleScale(45),
    gap: spacingY._20,
    shadowColor: "black",
    shadowOffset: { width: 0, height: -10},
  },
  buttonContainer:{
    width:"100%",
    paddingHorizontal: spacingX._25
  }
})