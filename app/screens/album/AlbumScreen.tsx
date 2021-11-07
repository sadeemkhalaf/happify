import React from "react"
import {
  ScrollView,
  TextStyle,
  View,
  ViewStyle,
  Image,
  ImageRequireSource,
  TouchableOpacity,
  Platform,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BG_GRADIENT, Screen, Header, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth, windowWidth } from "../../theme/dimensionUtils"
import { PlayWhite } from "../../../assets/images/svgs"
import { useNavigation } from "@react-navigation/native"

const albumCover = require("./../../../assets/images/image-cover.png") as ImageRequireSource

const ShadowEffect: ViewStyle = {
  shadowColor: color.palette.grey.type1,
  shadowOffset: {
    width: moderateScale(-30),
    height: moderateScale(-65),
  },
  shadowOpacity: 1,
  shadowRadius: moderateScale(22),
  elevation: moderateScale(30),
  width: "150%",
  height: moderateScale(120),
  backgroundColor: color.palette.grey.type1,
}

const absoluteBox: ViewStyle = { position: "relative", top: moderateScale(230), zIndex: 3 }

export const renderShadowBox = () => {
  return (
    <View style={absoluteBox}>
      <View style={[ShadowEffect]} />
    </View>
  )
}

const renderTrackListItem = (trackTitle?, artist?, withPlayButton = true) => {
  const { navigate } = useNavigation()

  return (
    <TouchableOpacity
      style={{
        paddingVertical: scaleByDeviceWidth(16),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={() => navigate("player")}
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
  const navigate = useNavigation()
  const handleClose = () => {
    console.log("close")

    navigate.canGoBack() ? navigate.goBack() : navigate.navigate("explore")
  }

  return (
    <LinearGradient colors={[color.palette.grey.type1, color.palette.grey.type1]} style={BG_GRADIENT}>
      <View
        style={[
          {
            position: "absolute",
            top: 0,
            width: "100%",
            height: moderateScale(200),
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
        preset={"fixed"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: moderateScale(24), alignItems: "center" }}
      >
        <Header
          style={{ zIndex: 1, marginTop: Platform.OS !== "ios" ? 0 : moderateScale(-32), width: windowWidth }}
          isPlayer
          headerText={"The-Astronaut"}
          subheader={"Released 2020"}
          leftIcon={"close"}
          onLeftPress={handleClose}
        />
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
