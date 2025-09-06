import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ScreenWrapper from '@/components/ScreenWrapper'
import { colors, radius, spacingX, spacingY } from '@/constants/theme'
import { verticaleScale } from '@/utils/styling'
import Header from '@/components/Header'
import BackButton from '@/components/BackButton'
import Typo from '@/components/Typo'
import { useAuth } from '@/context/AuthContext'
import { Image } from 'expo-image'

const Profile = () => {

  const {user} = useAuth()

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
              source={user?.photoURL ? { uri: user.photoURL } : require("../../assets/images/defaultAvatar.png")}
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