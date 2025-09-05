import { View, Text, StyleSheet, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import Input from '@/components/Inputs'
import { At, LockIcon } from 'phosphor-react-native'
import Button from '@/components/Button'
import { useRouter } from 'expo-router'
import { login } from '@/service/authService'

const Login = () => {

    const router = useRouter()
    const [isLoading,setIsLoading] = useState(false)
    const [email,setEmail] = useState<string>("")
    const [password,setPassword] = useState<string>("")

    const handleLogin = async ()=>{
      if(!email || !password){
        Alert.alert("Error","Please enter both email and password.")
        return
      }
      setIsLoading(true)
      try{
        const res = await login(email,password)
        router.push('/(auth)/welcome')
      }catch(err){
        console.log("Login error:",err)
        Alert.alert("Login Failed","Invalid credintials or server error.")
      }finally{
        setIsLoading(false)
      }
    }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <BackButton iconSize={28}/>

        <View style={{gap:5, marginTop: spacingY._20}}>
          <Typo size={30} fontWeight={"800"} color={colors.black}>
            Hello
          </Typo>
          <Typo size={30} fontWeight={"800"} color={colors.black}>
            Welcome Back
          </Typo>
        </View>

        {/* form */}
        <View style={styles.form}>
          <Typo size={16} color={colors.neutral500}>
            Login now to track all your expenses
          </Typo>

          {/* input */}
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

          <Typo size={14} color={colors.neutral400} style={{alignSelf: "flex-start"}}>
            Forgot Password?
          </Typo>

          <Button loading={isLoading} onPress={handleLogin}>
            <Typo fontWeight={"700"} color={colors.black} size={21}>Login</Typo>
          </Button>

        </View>



        {/* footer */}
        <View style={styles.footer}>
          <Typo size={15} color={colors.black}>Don't have an account? </Typo>
          <Pressable onPress={()=> router.navigate('/(auth)/register')}>
            <Typo size={15} color={colors.primaryLight} fontWeight={"700"}>Sign up</Typo>
          </Pressable>
        </View>

      </View>
    </ScreenWrapper>
  )
}

export default Login

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