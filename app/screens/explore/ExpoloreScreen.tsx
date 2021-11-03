import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import { View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { BG_GRADIENT, Header, Screen, Text } from "../../components"
import { color } from "../../theme"

const ExpoloreScreen = () => {
  const renderAlbumSquare = (isFirst?: boolean) => (
    <View
      style={[
        {
          height: 167,
          width: 167,
          backgroundColor: color.palette.white,
          borderRadius: 13,
        },
        isFirst ? { marginRight: 6 } : { marginHorizontal: 6 },
      ]}
    />
  )
  const renderTrackSquare = (isFirst?: boolean) => (
    <View style={{ justifyContent: "center", alignItems: "flex-start" }}>
      <View
        style={[
          {
            height: 110,
            width: 110,
            backgroundColor: color.palette.white,
            borderRadius: 8,
            marginBottom: 4,
          },
          isFirst ? { marginRight: 5 } : { marginHorizontal: 5 },
        ]}
      />
      <Text
        style={{ width: 110, fontWeight: "500", fontSize: 12, marginBottom: 4 }}
        numberOfLines={1}
      >
        {"Long Track title Track "}
      </Text>
      <Text style={{ width: 110, fontWeight: "300", fontSize: 12 }} numberOfLines={1}>
        {"Artist name"}
      </Text>
    </View>
  )

  return (
    <LinearGradient colors={["#413D4D", "#353438"]} style={BG_GRADIENT}>
      <Screen preset={"scroll"} backgroundColor={"#ffffff00"} style={{ paddingHorizontal: 24 }}>
        <Header headerText={"Explore"} titleStyle={{ left: -24 }} />
        <View
          style={{
            height: 110,
            width: "100%",
            backgroundColor: color.palette.white,
            borderRadius: 8,
          }}
        ></View>
        <View>
          <Text style={{ fontWeight: "600", fontSize: 18, marginTop: 32 }}>{"Made for you"}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ display: "flex", width: "120%" }}
            contentContainerStyle={{
              paddingRight: 65,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {renderTrackSquare()}
            {renderTrackSquare()}
            {renderTrackSquare()}
            {renderTrackSquare()}
          </ScrollView>
          <Text style={{ fontWeight: "600", fontSize: 18, marginTop: 8 }}>{"Newly Added"}</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ display: "flex", width: "120%" }}
            contentContainerStyle={{
              paddingRight: 65,
              paddingVertical: 16,
              alignItems: "center",
              justifyContent: "center",
            }}
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
