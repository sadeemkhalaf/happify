import React from "react"
import { View, TouchableOpacity, ViewStyle } from "react-native"
import { ShadowEffect } from ".."
import { navigate } from "../../navigators"
import { API_KEY } from "../../services/api/api-config"
import { color } from "../../theme"
import { Text } from "./../../components"
import { moderateScale } from "../../theme/dimensionUtils"
import FastImage from "react-native-fast-image"

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


export const renderAlbumSquare = (isFirst?: boolean) => {
  const albumStyle: ViewStyle = {
    height: moderateScale(167),
    width: moderateScale(167),
    backgroundColor: color.palette.white,
    borderRadius: moderateScale(13),
  }

  return (
    <TouchableOpacity
      onPress={() => navigate("album")}
      style={[
        albumStyle,
        isFirst ? { marginRight: moderateScale(6) } : { marginHorizontal: moderateScale(6) },
        ShadowEffect,
      ]}
    />
  )
}