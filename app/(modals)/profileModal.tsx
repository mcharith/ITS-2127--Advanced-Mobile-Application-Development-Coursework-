import BackButton from '@/components/BackButton'
import Header from '@/components/Header'
import ModalWrapper from '@/components/ModalWrapper'
import Typo from '@/components/Typo'
import { colors, spacingX, spacingY } from '@/constants/theme'
import { getProfileImage } from '@/service/imageService'
import { scale, verticaleScale } from '@/utils/styling'
import { Image } from 'expo-image'
import { PencilIcon } from 'phosphor-react-native'
import Input from '@/components/Inputs'
import React, { useEffect, useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { UserDataType } from '@/types'
import Button from '@/components/Button'
import { useAuth } from '@/context/AuthContext'
import * as ImagePicker from 'expo-image-picker';
import { updateUser } from '@/service/userService'
import { updateProfile } from 'firebase/auth'
import { useRouter } from 'expo-router'

const ProfileModal = () => {

  const router = useRouter()

  const {user} = useAuth()
  
  const[userData, setUserData] = useState<UserDataType>({
    name: "",
    image: null,
  })

  const [loading,setLoading] = useState(false)

  useEffect(() => {
  setUserData({
    name: user?.displayName || "",
    image: user?.photoURL || null,
  })
}, [user])

  const onPickImage = async () => {
     let result = await ImagePicker.launchImageLibraryAsync({
           mediaTypes: ImagePicker.MediaTypeOptions.Images,
           allowsEditing: true,
           aspect: [4, 3],
           quality: 0.5,
         });

    console.log(result);

    if (!result.canceled) {
      setUserData({...userData, image:result.assets[0].uri});
    }
  }

  const onSubmit = async () => {
  let { name, image } = userData;
  if (!name.trim()) {
    Alert.alert("Error", "Please fill all the fields.");
    console.log("error")
    
    return;
  }
  try {
    setLoading(true);
    if (!user) {
      Alert.alert("Error", "User not found.");
      return;
    }
    const res = await updateUser(user.uid, { name, image });
    if (!res.success) {
      Alert.alert("Error", res.msg || "Failed to update profile.");
      return;
    }
    await updateProfile(user, {
      displayName: name,
      photoURL: typeof image === "string" ? image : null,
    });
    Alert.alert("Success", "Profile updated successfully", [
      { text: "OK", onPress: () => router.back() },
    ]);
  } catch (err: any) {
    console.log("Profile update error: ", err);
    Alert.alert("Error", err.message || "Something went wrong.");
  } finally {
    setLoading(false);
  }
};

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title='Update Profile' leftIcon={<BackButton/>} style={{marginBottom: spacingY._10}}/>

        {/* form  */}
        <ScrollView contentContainerStyle={styles.form}>
          <View style={styles.avatarContainer}>
            <Image 
              style={styles.avatar}
              source={getProfileImage(userData.image)}
              contentFit="cover"
              transition={100}
            />

            <TouchableOpacity onPress={onPickImage} style={styles.editIcon}>
              <PencilIcon 
                size={verticaleScale(20)}
                color={colors.neutral700}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Typo color={colors.neutral800}>Name</Typo>
            <Input 
              placeholder='Name'
              value={userData.name}
              onChangeText={(value) => {setUserData({...userData,name: value})}}
            />
          </View>
        </ScrollView>
      </View>

    {/* footer  */}
    <View style={styles.footer}>
      <Button onPress={onSubmit} loading={loading} style={{flex:1}}>
        <Typo color={colors.white} fontWeight={"700"}>Update</Typo>
      </Button>
    </View>

    </ModalWrapper>
  )
}

export default ProfileModal

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