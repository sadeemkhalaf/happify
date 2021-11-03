import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { BG_GRADIENT, Header, Screen } from "../../components"

const ProfileScreen = () => {
  return (
    <LinearGradient colors={["#413D4D", "#353438"]} style={BG_GRADIENT}>
    <Screen preset={"scroll"} backgroundColor={"#ffffff00"} style={{ paddingHorizontal: 24 }}>
      <Header headerText={"Profile"} titleStyle={{ left: -24 }} />
    </Screen>
  </LinearGradient>
  )
}

export { ProfileScreen }
