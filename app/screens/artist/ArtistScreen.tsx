import React, { useState, useEffect } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import FastImage from "react-native-fast-image"
import { renderShadowBox } from ".."
import { BG_GRADIENT, Header, Screen, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"
import { API_KEY } from "../../services/api/api-config"
import { AuthApiService } from "../../services/api"
import { renderAlbumSquare, renderEmptyAlbumSquare } from "./style"
import { useNavigation } from "@react-navigation/core"

const ScrollContainer: ViewStyle = {
  display: "flex",
  width: "100%",
  flexWrap: "wrap",
  flexDirection: "row",
  justifyContent: "center",
  paddingBottom: moderateScale(56),
}

const ArtistScreen = ({ route }) => {
  const { artistId } = route.params
  const [albums, setAlbums] = useState([])
  const [artist, setArtist] = useState()
  const navigate = useNavigation()

  useEffect(() => {
    AuthApiService.getAllArtistAlbums(artistId)
      .then((data) => {
        setAlbums(data?.result.albums)
      })
      .catch(() => setAlbums([]))

    AuthApiService.getArtist(artistId)
      .then((data) => {
        setArtist(data?.result)
      })
      .catch(() => setArtist(null))
    return () => {
      setArtist(null)
      setAlbums(null)
    }
  }, [])

  const handleClose = () => {
    navigate.canGoBack() ? navigate.goBack() : navigate.navigate("explore")
  }

  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type1]}
      style={BG_GRADIENT}
    >
      <Header
        headerText={"Artist"}
        titleStyle={{ textAlign: "center", fontSize: moderateScale(22) }}
        style={{
          marginTop: moderateScale(8),
          width: "100%",
          alignItems: "center",
        }}
        leftIcon={"close"}
        onLeftPress={handleClose}
      />
      <View>
        {renderShadowBox()}
        <FastImage
          style={{ position: "absolute", height: scaleByDeviceWidth(200), width: "100%" }}
          source={{ uri: artist?.cover, headers: { "x-happi-key": API_KEY } }}
        />
      </View>
      <Screen
        preset={"fixed"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: moderateScale(24), alignItems: "center" }}
      >
        <View
          style={{
            minHeight: scaleByDeviceWidth(100),
            justifyContent: "flex-end",
            marginBottom: scaleByDeviceWidth(32),
          }}
        >
          <Text
            text={artist?.artist || "THE-Album"}
            numberOfLines={3}
            style={{
              color: color.palette.white,
              fontWeight: "bold",
              fontSize: scaleByDeviceWidth(32),
            }}
          />
          <Text
            text={`${albums.length} Albums`}
            numberOfLines={1}
            style={{
              textAlign: "center",
              color: color.palette.white,
              fontWeight: "normal",
              marginTop: scaleByDeviceWidth(8),
              fontSize: scaleByDeviceWidth(16),
            }}
          />
        </View>
        <ScrollView contentContainerStyle={[ScrollContainer]} showsVerticalScrollIndicator={false}>
          {albums.map((album, key) => (
            <View key={key}>{renderAlbumSquare(album, artist?.id_artist)}</View>
          ))}
          {albums.length % 2 !== 0 && renderEmptyAlbumSquare()}
        </ScrollView>
      </Screen>
    </LinearGradient>
  )
}

export { ArtistScreen }
