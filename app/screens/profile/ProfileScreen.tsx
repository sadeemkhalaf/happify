import React, { useEffect, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { ImageRequireSource, TextStyle, View, ViewStyle } from "react-native"
import FastImage from "react-native-fast-image"
import { BG_GRADIENT, Button, Header, Screen, Text } from "../../components"
import { moderateScale } from "../../theme/dimensionUtils"
import { color } from "../../theme"
import { signinWithGoogleAccount } from "../../services/auth/auth-apis"
import { GoogleSignin } from "@react-native-google-signin/google-signin"

const albumCover = require("./../../../assets/images/astro.jpg") as ImageRequireSource

const btnTextStyle: TextStyle = {
  color: color.palette.grey.type2,
  fontSize: moderateScale(14),
  fontWeight: "700",
}
const coverPhotoImageStyle: ViewStyle = {
  borderRadius: moderateScale(90),
  height: "100%",
  width: "100%",
}

const UpgradeButton = () => (
  <Button
    text={"Go Premium"}
    style={{
      backgroundColor: color.palette.white,
      borderRadius: moderateScale(20),
      marginBottom: moderateScale(32),
      paddingVertical: moderateScale(12),
      paddingHorizontal: moderateScale(24),
    }}
    textStyle={btnTextStyle}
  />
)

const ProfilePhoto = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(false)

  const getCurrentUser = async () => {
    const current = await GoogleSignin.getCurrentUser()
    setCurrentUser(current)
  }

  useEffect(() => {
    getCurrentUser()
  }, [currentUser, loading])

  const handleLoginWithGoogle = async () => {
    setLoading(true)
    await signinWithGoogleAccount()
    setLoading(false)
  }

  const handleSignout = async () => {
    setLoading(true)
    await GoogleSignin.signOut()
    setLoading(false)
  }

  return (
    <>
      <View
        style={{
          height: moderateScale(150),
          width: moderateScale(150),
          borderRadius: moderateScale(90),
        }}
      >
        <FastImage source={currentUser ? {uri: currentUser.user.photo} : albumCover} style={coverPhotoImageStyle} resizeMode={"cover"} />
      </View>
      <Text
        text={currentUser ? currentUser.user.name : "Guest User"}
        style={{ fontWeight: "500", fontSize: moderateScale(18), marginVertical: moderateScale(8) }}
      />
      <Button
        onPress={currentUser ? handleSignout : handleLoginWithGoogle}
        text={currentUser ? "Sign out" : "Login"}
        style={{
          backgroundColor: "transparent",
          borderColor: color.palette.white,
          borderWidth: moderateScale(1),
          borderRadius: moderateScale(20),
          marginBottom: moderateScale(32),
        }}
        textStyle={[btnTextStyle, { color: color.palette.white }]}
      />
    </>
  )
}

const ProfileScreen = () => {
  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type2]}
      style={BG_GRADIENT}
    >
      <Screen
        preset={"scroll"}
        backgroundColor={"transparent"}
        style={{ alignItems: "center", paddingHorizontal: moderateScale(24) }}
      >
        <Header headerText={"Profile"} titleStyle={{ left: moderateScale(-32) }} />
        <Text
          text={"Free Account"}
          style={{
            fontWeight: "500",
            fontSize: moderateScale(18),
            marginBottom: moderateScale(16),
          }}
        />
        <UpgradeButton />
        <ProfilePhoto />
      </Screen>
    </LinearGradient>
  )
}

export { ProfileScreen }
