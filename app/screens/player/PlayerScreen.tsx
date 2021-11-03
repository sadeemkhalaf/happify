import React, { useState } from "react"
import { View, ViewStyle } from "react-native"
import Slider from "@react-native-community/slider"
import { LinearGradient } from "expo-linear-gradient"

import { BG_GRADIENT, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"
import millisToMin from "../../utils/millisToMin"

const tracker: ViewStyle = {
  width: "100%",
  borderRadius: 100,
  marginTop: 32,
}

const PlayerScreen = () => {
  const MAX = 323333
  const MIN = 0
  const [current, setCurrent] = useState(MIN)

  const updateCurrent = (change) => setCurrent(change)

  return (
    <LinearGradient colors={["#413D4D", "#353438"]} style={BG_GRADIENT}>
      <Screen
        preset={"scroll"}
        backgroundColor={"#ffffff00"}
        style={{ paddingHorizontal: 24, alignItems: "center" }}
      >
        <Header isPlayer headerText={"Playing from Artist"} subheader={"THE-Album"} />
        <View
          style={{
            width: scaleByDeviceWidth(342),
            height: scaleByDeviceWidth(342),
            backgroundColor: color.palette.offWhite,
            borderRadius: scaleByDeviceWidth(13),
          }}
        />
        <View
          style={{ alignItems: "flex-start", width: "100%", marginTop: scaleByDeviceWidth(32) }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: moderateScale(18),
              marginBottom: moderateScale(8),
            }}
            text={"Track Name"}
            txOptions={{ defaultValue: "track undefined" }}
          />
          <Text
            style={{
              fontWeight: "normal",
              fontSize: moderateScale(16),
              color: color.palette.offWhite,
            }}
            text={"Artist Name"}
            txOptions={{ defaultValue: "artist undefined" }}
          />
        </View>
        <View style={tracker}>
          <Slider
            minimumValue={MIN}
            maximumValue={MAX}
            minimumTrackTintColor="#B87BF2"
            thumbTintColor="#B87BF2"
            maximumTrackTintColor={color.palette.white}
            value={current}
            onValueChange={updateCurrent}
            tapToSeek
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text text={millisToMin(current)} />
            <Text text={millisToMin(MAX)} />
          </View>
        </View>
        
      </Screen>
    </LinearGradient>
  )
}

export { PlayerScreen }
