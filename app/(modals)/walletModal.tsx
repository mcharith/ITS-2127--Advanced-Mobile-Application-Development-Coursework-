import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { scale, verticaleScale } from '@/utils/styling'
import Input from '@/components/Inputs'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { WalletType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import { useRouter } from 'expo-router'
import ImageUpload from '@/components/ImageUpload'
import { createOrUpdateWallet } from '@/service/walletService'

const WalletModal = () => {

  const router = useRouter()

  const {user} = useAuth()
  
  const[wallet, setWallet] = useState<WalletType>({
    name: "",
    image: null,
  })

  const [loading,setLoading] = useState(false)

  const onSubmit = async () => {
  let { name, image } = wallet;

  if (!name.trim()) {
    Alert.alert("Wallet", "Please fill all the fields.");
    return;
  }

  if (!user?.uid) {
    Alert.alert("Wallet", "User not found.");
    return;
  }

  const data: WalletType = {
    name,
    image,
    uid: user.uid,
  };

  setLoading(true);
  const res = await createOrUpdateWallet(data);
  setLoading(false);

  if (res.success) {
    router.back();
  } else {
    Alert.alert("Wallet", res.msg);
  }
};

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title='New Wallet' leftIcon={<BackButton/>} style={{marginBottom: spacingY._10}}/>

        {/* form  */}
        <ScrollView contentContainerStyle={styles.form}>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800}>Wallet Name</Typo>
            <Input 
              placeholder='Salary'
              value={wallet.name}
              onChangeText={(value) => {setWallet({...wallet,name: value})}}
            />
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800}>Wallet Icon</Typo>
            <ImageUpload
              file={wallet.image}
              onClear={() => setWallet({...wallet, image:null})}
              onSelect={(file) => setWallet({...wallet, image:file})}
              placeholder="Upload Image"
            />
          </View>

        </ScrollView>
      </View>

    {/* footer  */}
    <View style={styles.footer}>
      <Button onPress={onSubmit} loading={loading} style={{flex:1}}>
        <Typo color={colors.white} fontWeight={"700"}>Add Wallet</Typo>
      </Button>
    </View>

    </ModalWrapper>
  )
}

export default WalletModal

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: spacingX._20,
    // paddingVertical: spacingY._30,
  },
  footer:{
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: spacingX._20,
    gap: scale(12),
    paddingTop: spacingX._20,
    borderTopColor: colors.neutral700,
    marginBottom: spacingY._5,
    borderTopWidth: 1
  },
  form:{
    gap: spacingY._30,
    marginTop: spacingY._15
  },
  avatarContainer:{
    position: "relative",
    alignSelf: "center"
  },
  avatar: {
    alignSelf: "center",
    backgroundColor: colors.neutral300,
    height: verticaleScale(135),
    width: verticaleScale(135),
    borderRadius: 200,
    borderWidth: 1,
    borderColor: colors.neutral500,
    // overflow: "hidden",
    // position: "relative"
  },
  editIcon: {
    position: "absolute",
    bottom: spacingY._5,
    right: spacingY._7,
    borderRadius: 100,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: { width:0, height:0 },
    shadowOpacity: 0.25,
    elevation: 4,
    padding: spacingY._7
  },
  inputContainer: {
    gap: spacingY._10
  }
})