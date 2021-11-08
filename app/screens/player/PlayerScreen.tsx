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
import { IconButton } from "../../components/IconButton"

const tracker: ViewStyle = {
  width: "100%",
  borderRadius: moderateScale(100),
  marginTop: moderateScale(32),
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
    navigate.canGoBack()
      ? navigate.goBack()
      : navigate.navigate("artist", { artistId: track.id_artist })
  }

  const handleNavToArtist = () => {
    navigate.navigate("artist", { artistId: track.id_artist })
  }

  const handleNavToSearch = () => {
    navigate.navigate("search")
  }

  const handleNavToAlbum = () => {
    navigate.navigate("album", {
      id_artist: track.id_artist,
      album: {
        id_album: track?.id_album,
        album: track?.album,
        cover: track?.cover,
        id_artist: track.id_artist,
      },
    })
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
        rightIcon={'search'}
        onRightPress={handleNavToSearch}
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
              maxWidth: "75%",
            }}
            text={track.track}
            txOptions={{ defaultValue: "track undefined" }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: moderateScale(32),
              }}
            >
              {IconButton("album")}
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: moderateScale(14),
                  marginRight: moderateScale(16),
                  color: color.palette.grey.type3,
                }}
                text={"Album"}
              />
            </View>
            <Text
              style={{
                fontWeight: "normal",
                fontSize: moderateScale(18),
                color: color.palette.grey.type3,
                maxWidth: "75%",
              }}
              text={track.album}
              onPress={handleNavToAlbum}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {IconButton("artist")}
              <Text
                style={{
                  fontWeight: "normal",
                  fontSize: moderateScale(14),
                  color: color.palette.grey.type3,
                }}
                text={"Artist"}
                onPress={handleNavToArtist}
              />
            </View>
            <Text
              style={{
                fontWeight: "normal",
                fontSize: moderateScale(18),
                color: color.palette.grey.type3,
              }}
              text={track.artist}
              onPress={handleNavToArtist}
            />
          </View>
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
