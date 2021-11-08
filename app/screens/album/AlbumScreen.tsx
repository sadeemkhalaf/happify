import React, { useEffect, useState, useCallback } from "react"
import { ScrollView, View, ViewStyle, TouchableOpacity, Platform } from "react-native"
import FastImage from "react-native-fast-image"
import { LinearGradient } from "expo-linear-gradient"
import { BG_GRADIENT, Screen, Header, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth, windowWidth } from "../../theme/dimensionUtils"
import { useNavigation } from "@react-navigation/native"
import { AuthApiService } from "../../services/api"
import { API_KEY } from "../../services/api/api-config"
import { renderShadowBox } from "./style"

const renderTrackListItem = (track?, artist?, id_album?, withPlayButton = true) => {
  const navigate = useNavigation()

  const handleNavToPlayer = () => {
    const trackWithArtist = {
      ...track,
      id_album: id_album,
      artist: artist.artist,
      id_artist: artist.id_artist,
      album: artist.album,
      cover: artist?.cover,
    }
    navigate.navigate("player", { track: trackWithArtist, cover: artist?.cover })
  }

  return (
    <TouchableOpacity
      style={{
        paddingVertical: scaleByDeviceWidth(16),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      onPress={handleNavToPlayer}
    >
      <View style={{ width: "85%" }}>
        <Text
          text={track?.track || "Undefined"}
          numberOfLines={1}
          style={{
            fontSize: scaleByDeviceWidth(14),
            fontWeight: "bold",
            marginBottom: scaleByDeviceWidth(4),
          }}
        />
        <Text
          text={artist?.artist || "Unknown artist"}
          numberOfLines={1}
          style={{ fontSize: scaleByDeviceWidth(14), color: color.palette.offWhite }}
        />
      </View>
    </TouchableOpacity>
  )
}

const AlbumScreen = ({ route }) => {
  const navigate = useNavigation()
  const { album, id_artist } = route.params
  const [albumTracks, setTracks] = useState([])
  const [artist, setArtist] = useState(null)

  const callAlbumTracks = useCallback(() => {
    AuthApiService.getAllArtistAlbumTracks(id_artist, album?.id_album).then((data) => {
      setTracks(data.result.tracks)
      setArtist(data.result)
    })
  }, [])
  useEffect(() => {
    callAlbumTracks()
  }, [])

  const handleClose = () => {
    navigate.canGoBack() ? navigate.goBack() : navigate.navigate("search")
  }

  const handleNavToSearch = () => {
    navigate.navigate("search")
  }

  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type1]}
      style={BG_GRADIENT}
    >
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
        <FastImage
          style={{ position: "absolute", height: scaleByDeviceWidth(200), width: "100%" }}
          source={{ uri: album?.cover, headers: { "x-happi-key": API_KEY } }}
        />
      </View>
      <Screen
        preset={"fixed"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: moderateScale(24), alignItems: "center" }}
      >
        <Header
          style={{
            zIndex: 1,
            marginTop: Platform.OS !== "ios" ? 0 : moderateScale(-32),
            width: windowWidth,
          }}
          isPlayer
          headerText={artist?.artist || "The-Astronaut"}
          subheader={artist?.label || ""}
          leftIcon={"back"}
          onLeftPress={handleClose}
          rightIcon={'search'}
          onRightPress={handleNavToSearch}
        />
        <View
          style={{
            minHeight: scaleByDeviceWidth(100),
            justifyContent: "flex-end",
            marginBottom: scaleByDeviceWidth(32),
          }}
        >
          <Text
            text={album?.album || "THE-Album"}
            numberOfLines={3}
            style={{
              textAlign: "center",
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
          {albumTracks &&
            albumTracks.map((track, key) => (
              <View key={key}>{renderTrackListItem(track, artist, album?.id_album)}</View>
            ))}
        </ScrollView>
      </Screen>
    </LinearGradient>
  )
}

export { AlbumScreen }
