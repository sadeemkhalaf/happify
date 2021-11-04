import React from "react"
import {
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
  Image,
  ImageRequireSource,
  TouchableOpacity,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BG_GRADIENT, Screen, Header, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth, windowWidth } from "../../theme/dimensionUtils"
import { PlayWhite } from "../../../assets/images/svgs"

const albumCover = require("./../../../assets/images/image-cover.png") as ImageRequireSource

const ShadowEffect: ViewStyle = {
  shadowColor: "#413D4D",
  shadowOffset: {
    width: -30,
    height: -65,
  },
  shadowOpacity: 1,
  shadowRadius: 22,
  elevation: 30,
  width: "150%",
  height: 120,
  backgroundColor: "#413D4D",
}

const absoluteBox: ViewStyle = { position: "relative", top: 230, zIndex: 3 }

export const renderShadowBox = () => {
  return (
    <View style={absoluteBox}>
      <View style={[ShadowEffect]} />
    </View>
  )
}

const renderTrackListItem = (trackTitle?, artist?, withPlayButton = true) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: scaleByDeviceWidth(16),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ width: "85%" }}>
        <Text
          text={trackTitle || "Undefined"}
          numberOfLines={1}
          style={{
            fontSize: scaleByDeviceWidth(14),
            fontWeight: "bold",
            marginBottom: scaleByDeviceWidth(4),
          }}
        />
        <Text
          text={artist || "Unknown artist"}
          numberOfLines={1}
          style={{ fontSize: scaleByDeviceWidth(14), color: color.palette.offWhite }}
        />
      </View>
      {withPlayButton && <PlayWhite width={14} height={14} />}
    </TouchableOpacity>
  )
}

const PLAYERTITLE: TextStyle = { textAlign: "center", fontSize: moderateScale(13) }
const PLAYERSUBHEADER: TextStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: moderateScale(14),
}

const AlbumScreen = () => {
  return (
    <LinearGradient colors={["#413D4D", "#413D4D"]} style={BG_GRADIENT}>
      <Header
        style={{ zIndex: 2, marginTop: 0 }}
        isPlayer
        headerText={"The-Astronaut"}
        subheader={"Released 2020"}
      />
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            width: "100%",
            height: 200,
            backgroundColor: color.palette.deepPurple,
            zIndex: -1,
          },
        ]}
      >
        {renderShadowBox()}
        <Image
          style={{ position: "absolute" }}
          source={albumCover}
          height={scaleByDeviceWidth(200)}
          width={windowWidth}
        />
      </View>
      <Screen
        unsafe
        preset={"fixed"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: 24, alignItems: "center" }}
      >
        <View
          style={{
            minHeight: scaleByDeviceWidth(100),
            justifyContent: "flex-end",
            marginBottom: scaleByDeviceWidth(32),
          }}
        >
          <Text
            text={"THE-Album"}
            numberOfLines={3}
            style={{
              color: color.palette.white,
              fontWeight: "bold",
              fontSize: scaleByDeviceWidth(32),
            }}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ display: "flex", width: "100%", marginBottom: scaleByDeviceWidth(56) }}
          contentContainerStyle={{
            alignItems: "flex-start",
            justifyContent: "flex-start",
          }}
        >
          {renderTrackListItem("Was it a dream", "Thirty Seconds to Mars")}
          {renderTrackListItem("Departer", "Katatonia")}
          {renderTrackListItem("Below", "Leprous")}
          {renderTrackListItem()}
          {renderTrackListItem()}
        </ScrollView>
      </Screen>
    </LinearGradient>
  )
}

export { AlbumScreen }
