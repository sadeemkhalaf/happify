/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/core"
import { LinearGradient } from "expo-linear-gradient"
import { ScrollView, TouchableOpacity, View, ViewStyle } from "react-native"
import { BG_GRADIENT, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale } from "../../theme/dimensionUtils"
import { Album, AuthApiService, Track } from "../../services/api"
import { API_KEY, generateTrackUrl } from "../../services/api/api-config"
import FastImage from "react-native-fast-image"
// import { AuthApiService } from "../../services/api"

const ShadowEffect: ViewStyle = {
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
  const [album, setAlbum] = useState<Album>();
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    const url = generateTrackUrl(19155, 277113);
    AuthApiService.getRequest(`${url}/tracks`).then((album) => {
      setTracks(album.result.tracks);
      setAlbum(album.result);
    }
    )
  }, [])

  const renderAlbumSquare = (isFirst?: boolean) => {

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

  const renderTrackSquare = (title?, artist?, track?, isFirst?: boolean) => {
    return (
      <View style={{ justifyContent: "center", alignItems: "flex-start" }}>

        <TouchableOpacity
          onPress={() => navigate("player", {track: track, cover: album?.cover})}
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
          <FastImage style={{ height: '100%', width: '100%' }} source={{ uri: album?.cover, headers: { "x-happi-key": API_KEY } }} />
        </TouchableOpacity>
        <Text
          style={{ width: moderateScale(110), fontWeight: "500", fontSize: moderateScale(12), marginBottom: moderateScale(4) }}
          numberOfLines={1}
        >
          {title || "Long Track title Track "}
        </Text>
        <Text style={{ width: moderateScale(110), fontWeight: "300", fontSize: moderateScale(12) }} numberOfLines={1}>
          {artist || "Artist name"}
        </Text>
      </View>
    )
  }

  return (
    <LinearGradient colors={["#413D4D", "#353438"]} style={BG_GRADIENT}>
      <Screen preset={"scroll"} backgroundColor={"transparent"} style={{ paddingHorizontal: moderateScale(24) }}>
        <Header headerText={"Explore"} titleStyle={{ left: moderateScale(-32) }} />
        {/* {img && <Image source={{uri: img}} height={moderateScale(80)} width={moderateScale(80)} />} */}
        <View
          style={{
            height: 110,
            width: "100%",
            backgroundColor: color.palette.white,
            borderRadius: 8,
          }}
        ></View>
        <View>
          <Text style={{ fontWeight: "600", fontSize: moderateScale(18), marginTop: moderateScale(32) }}>{"Made for you"}</Text>
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
            {tracks && tracks.map((track, key) => (<View key={key}>{renderTrackSquare(track.track, album?.artist, track)}</View>))}
          </ScrollView>
          <Text style={{ fontWeight: "600", fontSize: moderateScale(18), marginTop: moderateScale(8) }}>{"Newly Added"}</Text>
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
