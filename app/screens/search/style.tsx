import React from "react"
import { TouchableOpacity, View } from "react-native"
import FastImage from 'react-native-fast-image'
import { Text } from "../../components"
import { useNavigation } from "@react-navigation/core"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"
import { API_KEY } from "../../services/api/api-config"

export const renderTrackListItemSearchResults = (track, cover?) => {
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
      onPress={() => navigate("player", {track: track, cover: track.cover})}
    >
       <FastImage
              style={{ height: moderateScale(40), width: moderateScale(40) }}
              source={{ uri: track?.cover, headers: { "x-happi-key": API_KEY } }}
            />
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
          text={track?.artist || "Unknown artist"}
          numberOfLines={1}
          style={{ fontSize: scaleByDeviceWidth(14), color: color.palette.offWhite }}
        />
      </View>
    </TouchableOpacity>
  )
}

/*
{"album": "Hello Today",
"api_album": "https://api.happi.dev/v1/music/artists/39938/albums/1559707",
"api_albums": "https://api.happi.dev/v1/music/artists/39938/albums",
"api_artist": "https://api.happi.dev/v1/music/artists/39938",
"api_lyrics": "https://api.happi.dev/v1/music/artists/39938/albums/1559707/tracks/14513888/lyrics",
"api_track": "https://api.happi.dev/v1/music/artists/39938/albums/1559707/tracks/14513888",
"api_tracks": "https://api.happi.dev/v1/music/artists/39938/albums/1559707/tracks",
"artist": "Black Honey", "bpm": 102,
"cover": "https://api.happi.dev/v1/music/cover/1559707",
"haslyrics": true, "id_album": 1559707, "id_artist": 39938, 
"id_track": 14513888, "lang": "??", "track": "Hello Today"}
*/
