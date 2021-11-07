import React, { useState, useEffect } from "react"
import { View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"

import { BG_GRADIENT, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"
import { useNavigation } from "@react-navigation/core"
import FastImage from "react-native-fast-image"
import { API_KEY, generateTrackUrl } from "../../services/api/api-config"
import { AuthApiService } from "./../../services/api"

const tracker: ViewStyle = {
  width: "100%",
  borderRadius: 100,
  marginTop: 32,
}

const PlayerScreen = ({ route, navigation }) => {
  const [trackLyrics, setLyrics] = useState()
  const navigate = useNavigation()
  const { track, cover } = route.params

  useEffect(() => {
    const path = generateTrackUrl(track.id_artist, track.id_album)
    {
      track.haslyrics &&
        AuthApiService.getRequest(`${path}/tracks/${track.id_track}/lyrics`).then((data) => {
          setLyrics(data.result)
        })
    }
  }, [])
  const handleClose = () => {
    navigate.canGoBack() ? navigate.goBack() : navigate.navigate("album")
  }

  const handleNavToArtist = () => {
    console.log(track.id_artist);
    
    navigate.navigate("artist", {artistId: track.id_artist})
  }

  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type2]}
      style={BG_GRADIENT}
    >
      <Header
        isPlayer
        headerText={`Playing from ${track.artist || "Unknown Artist"}`}
        subheader={track.album || "Undefined Album"}
        leftIcon={"close"}
        onLeftPress={handleClose}
      />
      <Screen
        unsafe
        preset={"scroll"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: 24, alignItems: "center" }}
      >
        <View
          style={{
            width: scaleByDeviceWidth(342),
            height: scaleByDeviceWidth(342),
            backgroundColor: color.palette.offWhite,
            borderRadius: scaleByDeviceWidth(13),
          }}
        >
          {cover && (
            <FastImage
              style={{ height: "100%", width: "100%" }}
              source={{ uri: cover, headers: { "x-happi-key": API_KEY } }}
            />
          )}
        </View>
        <View
          style={{ alignItems: "flex-start", width: "100%", marginTop: scaleByDeviceWidth(32) }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: moderateScale(18),
              marginBottom: moderateScale(8),
            }}
            text={track.track}
            txOptions={{ defaultValue: "track undefined" }}
          />
          <Text
            style={{
              fontWeight: "normal",
              fontSize: moderateScale(16),
              color: color.palette.grey.type3,
            }}
            text={track.artist}
            onPress={handleNavToArtist}
          />
        </View>

        {/* {trackLyrics && ( */}
          <View style={{ marginTop: moderateScale(16), marginBottom: moderateScale(32) }}>
            <Text
              style={{
                fontWeight: "normal",
                fontSize: moderateScale(18),
                color: color.palette.white,
                lineHeight: moderateScale(26),
              }}
              text={trackLyrics?.lyrics || "track has no lyrics!"}
              txOptions={{ defaultValue: "track has no lyrics!" }}
            />
          </View>
        {/* )} */}

        {/* TODO: integration of sound player with another API */}
        {/* <View style={tracker}>
          <Slider
            minimumValue={MIN}
            maximumValue={MAX}
            minimumTrackTintColor={color.palette.purple.type1}
            thumbTintColor={color.palette.purple.type1}
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
        </View> */}
        <View style={tracker}></View>
      </Screen>
    </LinearGradient>
  )
}

export { PlayerScreen }
