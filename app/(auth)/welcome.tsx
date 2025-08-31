import { StyleSheet, TouchableOpacity, View, Image } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import Button from '@/components/Button'

const Welcome = () => {
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        {/* login button and image */}
        <View>
          <TouchableOpacity style={styles.loginButton}>
            <Typo fontWeight={"500"} color='black'>Sign in</Typo>
          </TouchableOpacity>

          <Image
            source = {require("../../assets/images/piggy-welcome.png")}
            style={styles.welcomeImage}
            resizeMode="contain"
          />
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <View style={{ alignItems: "center" }}>
            <Typo size={30} fontWeight={"800"} color={colors.neutral500}>Always take Control</Typo>
            <Typo size={30} fontWeight={"800"} color={colors.neutral500}>of your finance</Typo>
          </View>

          <View style={{ alignItems: "center", gap:2 }}>
            <Typo size={17} color={colors.neutral400}>Finanace must be arranged to set a better</Typo>
            <Typo size={17} color={colors.neutral400}>lifestyle in future</Typo>
          </View>

          <View style={styles.buttonContainer}>
          <Button>
            <Typo size={22} fontWeight={"600"} color={colors.neutral900}>Get Started</Typo>
          </Button>
        </View>

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