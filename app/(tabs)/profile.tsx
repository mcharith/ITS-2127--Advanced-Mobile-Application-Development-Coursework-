import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import { useAuth } from '@/context/AuthContext'
import { Image } from 'expo-image'
import { getProfileImage } from '@/service/imageService'
import { accountOptionType } from '@/types'
import { CaretRightIcon, GearSixIcon, LockIcon, PowerIcon, UserIcon } from 'phosphor-react-native'
import index from '..'
import Animated, { FadeInDown } from 'react-native-reanimated'
import { signOut } from 'firebase/auth'
import { auth } from '@/firebase'
import { useRouter } from 'expo-router'

const Profile = () => {

  const {user} = useAuth()
  const router = useRouter()

  const accountOption: accountOptionType[] = [
    {
      title: "Edit Profile",
      icon:<UserIcon size={26} color={colors.white} weight='fill'/>,
      routeName: '(modals)/profileModal',
      bgColor: "#6366f1"
    },
    {
      title: "Setting",
      icon:<GearSixIcon size={26} color={colors.white} weight='fill'/>,
      // routeName= "/(modals)/profileModel",
      bgColor: "#059669"
    },
    {
      title: "Privacy Policy",
      icon:<LockIcon size={26} color={colors.white} weight='fill'/>,
      // routeName= "/(modals)/profileModel",
      bgColor: colors.neutral600
    },
    {
      title: "Logout",
      icon:<PowerIcon size={26} color={colors.white} weight='fill'/>,
      // routeName= "/(modals)/profileModel",
      bgColor: "#e11d48"
    },
  ]

  const handelLogout = async () => {
    await signOut(auth)
  }

  const showLogoutAlert = () =>{
    Alert.alert("Comfirm", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: ()=> console.log('cancel logout'),
        style: 'cancel'
      },
      {
        text: "Logout",
        onPress: ()=> handelLogout(),
        style: 'destructive'
      }
    ])
  } 

  const handelPress = (item: accountOptionType) =>{
    if(item.title == 'Logout'){
      showLogoutAlert()
    }

    if(item.routeName) router.push(item.routeName);
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title='Profile' style={{marginVertical: spacingY._10}}/>

        {/* user info */}
        <View style={styles.userInfo}>
          {/* avatar */}
          <View>
            {/* user image */}
            <Image 
              source={getProfileImage(user?.photoURL ?? undefined)}
              style={styles.avatar}
              contentFit="cover"
              transition={100}
            />
          </View>
          {/* name & email  */}
          <View style={styles.namrContainer}>
            <Typo size={24} fontWeight="600">
                {user?.displayName ?? "No name set"}
            </Typo>
            <Typo size={15} color={colors.neutral500}>
              {user?.email}
            </Typo>
          </View>
        </View>

        {/* account option */}
        <View style={styles.accountOption }>
          {accountOption.map((item, index) => {
            return (
              <Animated.View
                key={index.toString()}
                entering={FadeInDown.delay(index * 50)
                  .springify()
                  .damping(14)
                }
                style={styles.listItem}
              >
                <TouchableOpacity style={styles.flexRow} onPress={() => handelPress(item)}>
                  {/* icon */}
                  <View
                    style={[
                      styles.listIcon,
                      {
                        backgroundColor: item?.bgColor,
                      },
                    ]}
                  >
                    {item.icon && item.icon}
                  </View>
                  <Typo size={16} style={{flex: 1}} fontWeight={"500"}>
                    {item.title}
                  </Typo>
                  <CaretRightIcon 
                    size={verticaleScale(20)}
                    weight="bold"
                    color={colors.black}
                  />
                </TouchableOpacity>
              </Animated.View>
            )
          })}
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
    flex:1,
    paddingHorizontal: spacingX._20
  },
  userInfo:{
    marginTop: verticaleScale(30),
    alignItems: "center",
    gap: spacingY._15
  },
  avatarContainer:{
    position: "relative",
    alignSelf: "center"
  },
  avatar:{
    alignSelf: "center",
    backgroundColor: colors.neutral350,
    height: verticaleScale(135),
    width: verticaleScale(135),
    borderRadius: 200,
    // overflow: "hidden"
    // position: "relative"
  },
  editIcon:{
    position: "absolute",
    bottom: 5,
    right: 8,
    borderRadius: 50,
    backgroundColor: colors.neutral100,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 4,
    padding: 5
  },
  namrContainer:{
    gap: verticaleScale(4),
    alignItems: "center",
  },
  listIcon:{
    height: verticaleScale(44),
    width: verticaleScale(44),
    backgroundColor: colors.neutral500,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: radius._15,
    borderCurve: "continuous"
  },
  listItem:{
    marginBottom: verticaleScale(17),
  },
  accountOption:{
    marginTop: spacingY._35
  },
  flexRow:{
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10
  }
})