import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { BG_GRADIENT, Header, Screen } from "../../components"
import { moderateScale } from "../../theme/dimensionUtils"

const ProfileScreen = () => {
  return (
    <LinearGradient colors={["#413D4D", "#353438"]} style={BG_GRADIENT}>
    <Screen preset={"scroll"} backgroundColor={"transparent"} style={{ paddingHorizontal: 24 }}>
      <Header headerText={"Profile"} titleStyle={{ left: moderateScale(-32) }} />
    </Screen>
  </LinearGradient>
  )
}

export { ProfileScreen }
