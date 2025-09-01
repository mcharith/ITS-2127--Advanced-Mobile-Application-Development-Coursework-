import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import Input from '@/components/Inputs'
import { At, LockIcon, UserIcon } from 'phosphor-react-native'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'

const Register = () => {

    const emailRef = useRef("");
    const passwordRef = useRef("")
    const nameRef = useRef("")
    const [isLoading,setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async ()=>{
      if(!emailRef.current || !passwordRef.current || !nameRef.current){
        Alert.alert("Sing up","Please fill all the fields.")
        return
      }
      console.log("email:", emailRef.current)
      console.log("name:", nameRef.current)
      console.log("password:",passwordRef.current)
      console.log("Good to go.")
    }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28}/>

        <View style={{gap:5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"} color={colors.black}>
            Let's
          </Typo>
          <Typo size={30} fontWeight={"800"} color={colors.black}>
            Get Started
          </Typo>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.neutral500}>
            Create an account track your expenses
          </Typo>

          {/* input */}
          <Input
            placeholder='Enter your name'
            onChangeText={(value) => (nameRef.current = value)}
            icon={<UserIcon size={verticaleScale(22)}
            color={colors.neutral400}
            weight="fill"
            />}
          />

          <Input
            placeholder='Enter your email'
            onChangeText={(value) => (emailRef.current = value)}
            icon={<At size={verticaleScale(22)}
            color={colors.neutral400}
            weight="fill"
            />}
          />

          <Input
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={(value) => (passwordRef.current = value)}
            icon={<LockIcon size={verticaleScale(22)}
            color={colors.neutral400}
            weight="fill"
            />}
          />

          <Button loading={isLoading} onPress={handleSubmit}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>Sign Up</Typo>
          </Button>

        </View>



        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15} color={colors.black}>Already have an account? </Typo>
          <Pressable onPress={()=> router.navigate('/(auth)/login')}>
            <Typo size={15} color={colors.primaryLight} fontWeight={"700"}>Login</Typo>
          </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Register

const styles = StyleSheet.create({
  container:{
    flex:1,
    gap: spacingY._30,
    paddingHorizontal: spacingX._20
  },
  welcomeText:{
    fontSize: verticaleScale(20),
    fontWeight:"bold",
    color: colors.text
  },
  form:{
    gap: spacingY._20
  },
  forgotPassword:{
    textAlign: "right",
    fontWeight: "500",
    color: colors.black
  },
  footer: {
    flexDirection: "row",
    fontSize: verticaleScale(15),
    alignSelf:"center"
  },
})