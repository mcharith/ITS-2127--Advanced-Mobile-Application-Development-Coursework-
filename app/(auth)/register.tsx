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
import { register } from '@/service/authService'

const Register = () => {

    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const [name,setName] = useState<string>("")
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    const handleRegister = async ()=>{
      setIsLoading(true)
      await register(name,email,password)
      .then((res) => {
        router.navigate("/(auth)/login")
      })
      .catch((err) => {
        console.log(err)
        Alert.alert("Registration fail.","Something went wrong.")
      })
      .finally(() => {
        setIsLoading(false)
      })
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
            onChangeText={setName}
            value={name}
            icon={<UserIcon size={verticaleScale(22)}
            color={colors.neutral400}
            weight="fill"
            />}
          />

          <Input
            placeholder='Enter your email'
            onChangeText={setEmail}
            value={email}
            icon={<At size={verticaleScale(22)}
            color={colors.neutral400}
            weight="fill"
            />}
          />

          <Input
            placeholder='Enter your password'
            secureTextEntry
            onChangeText={setPassword}
            value={password}
            icon={<LockIcon size={verticaleScale(22)}
            color={colors.neutral400}
            weight="fill"
            />}
          />

          <Button loading={isLoading} onPress={handleRegister}>
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