import React, { useState, useEffect } from "react"
import { ScrollView, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import FastImage from "react-native-fast-image"
import { renderShadowBox } from ".."
import { BG_GRADIENT, Screen, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"
import { API_KEY } from "../../services/api/api-config"
import { AuthApiService } from "../../services/api"
import { renderAlbumSquare, renderEmptyAlbumSquare } from "./style"


const ScrollContainer: ViewStyle = {
  display: "flex",
  width: "100%",
  flexWrap: 'wrap',
  flexDirection: 'row',
  justifyContent: 'center'
}

const ArtistScreen = ({ route }) => {
  const { artistId } = route.params
  const [albums, setAlbums] = useState([])
  const [artist, setArtist] = useState()

  useEffect(() => {
    AuthApiService.getAllArtistAlbums(artistId)
      .then((data) => {
        setAlbums(data?.result.albums)
      })
      .catch(() => setAlbums([]))

    AuthApiService.getArtist(artistId)
      .then((data) => {
        console.log(data?.result);

        setArtist(data?.result)
      })
      .catch(() => setArtist(null))
    return () => {
      setArtist(null)
    }
  }, [])

  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type1]}
      style={BG_GRADIENT}
    >
      <View>
        {renderShadowBox()}
        <FastImage
          style={{ position: "absolute", height: scaleByDeviceWidth(200), width: '100%' }}
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
        </View>
        <ScrollView
          contentContainerStyle={[ScrollContainer]}
        >
          {albums.map((album, key) => <View key={key}>{renderAlbumSquare(album)}</View>)}
          {albums.length % 2 !== 0 && renderEmptyAlbumSquare()}
        </ScrollView>
      </Screen>
    </LinearGradient>
  )
}

export { ArtistScreen }
