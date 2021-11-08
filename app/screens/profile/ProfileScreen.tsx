import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { BG_GRADIENT, Header, Screen } from "../../components"
import { color } from "../../theme"
import { moderateScale } from "../../theme/dimensionUtils"

const ProfileScreen = () => {
  return (
    <LinearGradient colors={[color.palette.grey.type1, color.palette.grey.type2]} style={BG_GRADIENT}>
    <Screen preset={"scroll"} backgroundColor={"transparent"} style={{ paddingHorizontal: 24 }}>
      <Header headerText={"Profile"} titleStyle={{ left: moderateScale(-32) }} />
    </Screen>
  </LinearGradient>
  )
}

export { ProfileScreen }
