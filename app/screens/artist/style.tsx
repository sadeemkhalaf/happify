import React from "react"
import { View, TouchableOpacity, ViewStyle } from "react-native"
import { ShadowEffect } from "./../album/style"
import { navigate } from "../../navigators"
import { API_KEY } from "../../services/api/api-config"
import { color } from "../../theme"
import { Text } from "../../components"
import { moderateScale, scaleByDeviceWidth, windowWidth } from "../../theme/dimensionUtils"
import FastImage from "react-native-fast-image"
import { absoluteBox } from "../album/style"

export const renderTrackSquare = (track?, isFirst?: boolean) => {
  return (
    <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
      <TouchableOpacity
        onPress={() => navigate("player", { track: track, cover: track?.cover })}
        style={[
          {
            height: moderateScale(110),
            width: moderateScale(110),
            backgroundColor: color.palette.white,
            borderRadius: moderateScale(8),
            marginBottom: moderateScale(4),
          },
          isFirst ? { marginRight: moderateScale(5) } : { marginHorizontal: moderateScale(5) },
          ShadowEffect,
        ]}
      >
        <FastImage
          style={{
            height: "100%",
            width: "100%",
            overflow: "hidden",
            borderRadius: moderateScale(8),
          }}
          resizeMode={"cover"}
          source={{ uri: track?.cover, headers: { "x-happi-key": API_KEY } }}
        />
      </TouchableOpacity>
      <Text
        style={{
          width: moderateScale(110),
          fontWeight: "500",
          fontSize: moderateScale(12),
          marginBottom: moderateScale(4),
        }}
        numberOfLines={1}
      >
        {track.track || "Undefined Track "}
      </Text>
      <Text
        style={{ width: moderateScale(110), fontWeight: "300", fontSize: moderateScale(12) }}
        numberOfLines={1}
      >
        {track.artist || "Artist Unkown"}
      </Text>
    </View>
  )
}

export const renderAlbumSquare = (album, id_artist) => {
  const albumStyle: ViewStyle = {
    height: scaleByDeviceWidth(windowWidth / 2 - 48),
    width: scaleByDeviceWidth(windowWidth / 2 - 48),
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(13),
    backgroundColor: color.palette.white,
  }

  return (
    <TouchableOpacity
      onPress={() => navigate("album", { album: album, id_artist: id_artist })}
      style={[albumStyle, { marginHorizontal: moderateScale(6) }]}
    >
      <FastImage
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          borderRadius: moderateScale(13),
        }}
        resizeMode={"cover"}
        source={{ uri: album?.cover, headers: { "x-happi-key": API_KEY } }}
      />
    </TouchableOpacity>
  )
}

export const renderEmptyAlbumSquare = () => {
  const albumStyle: ViewStyle = {
    height: moderateScale(windowWidth / 2 - 48),
    width: moderateScale(windowWidth / 2 - 48),
    marginBottom: moderateScale(16),
    borderRadius: moderateScale(13),
  }

  return <View style={[albumStyle, { marginHorizontal: moderateScale(6) }, ShadowEffect]} />
}


// export const absoluteBox: ViewStyle = { position: "relative", top: moderateScale(230), zIndex: 3 }

export const renderShadowBox = () => {
  return (
    <View style={absoluteBox}>
      <View style={[ShadowEffect]} />
    </View>
  )
}