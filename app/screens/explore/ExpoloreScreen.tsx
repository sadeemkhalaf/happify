/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import { LinearGradient } from "expo-linear-gradient"
import { ScrollView, View, ViewStyle } from "react-native"
import { BG_GRADIENT, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale } from "../../theme/dimensionUtils"
import { AuthApiService, Track } from "../../services/api"
import { renderTrackSquare, renderAlbumSquare } from "./style"

export const ShadowEffect: ViewStyle = {
  shadowColor: "#2f2730",
  shadowOffset: {
    width: moderateScale(10),
    height: moderateScale(10),
  },
  shadowOpacity: 0.27,
  shadowRadius: 4.65,
  elevation: 6,
}

const scrollViewStyle: ViewStyle = {
  paddingRight: moderateScale(65),
  paddingVertical: moderateScale(16),
  alignItems: "center",
  justifyContent: "center",
}

const ExpoloreScreen = () => {
  const { navigate } = useNavigation()
  const [tracks, setTracks] = useState<Track[]>([])

  useEffect(() => {
    AuthApiService.getSmartPlaylist(81946)
      .then((data) => {
        setTracks(data.result)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type2]}
      style={BG_GRADIENT}
    >
      <Screen
        preset={"scroll"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: moderateScale(24) }}
      >
        <Header headerText={"Explore"} titleStyle={{ left: moderateScale(-32) }} />
        <View
          style={{
            height: 110,
            width: "100%",
            backgroundColor: color.palette.white,
            borderRadius: 8,
          }}
        ></View>
        <View>
          <Text
            style={{ fontWeight: "600", fontSize: moderateScale(18), marginTop: moderateScale(32) }}
          >
            {"Made for you"}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ display: "flex", width: "120%" }}
            contentContainerStyle={{
              paddingRight: moderateScale(65),
              paddingVertical: moderateScale(16),
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {tracks &&
              tracks.map((track, key) => <View key={key}>{renderTrackSquare(track)}</View>)}
          </ScrollView>
          <Text
            style={{ fontWeight: "600", fontSize: moderateScale(18), marginTop: moderateScale(8) }}
          >
            {"Newly Added"}
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ display: "flex", width: "120%" }}
            contentContainerStyle={scrollViewStyle}
          >
            {renderAlbumSquare(true)}
            {renderAlbumSquare()}
            {renderAlbumSquare()}
          </ScrollView>
        </View>
      </Screen>
    </LinearGradient>
  )
}

export { ExpoloreScreen }
