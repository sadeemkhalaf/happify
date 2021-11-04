import React, { useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { TextInput, View, ViewStyle } from "react-native"
import { BG_GRADIENT, Screen, Header, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("")

  const renderFilterChip = (title?: string) => {
    const [selected, setSelected] = useState(false)
    const SELECTED: ViewStyle = {
      backgroundColor: "#B87BF2",
      borderColor: "#B87BF2",
    }
    const UNSELECTED: ViewStyle = {}

    return (
      <View
        style={[
          {
            paddingVertical: moderateScale(8),
            paddingHorizontal: moderateScale(16),
            borderWidth: moderateScale(1),
            display: "flex",
            marginRight: moderateScale(8),
            marginTop: moderateScale(16),
            borderRadius: moderateScale(20),
            borderColor: "#707070",
          },
          selected ? SELECTED : UNSELECTED,
        ]}
      >
        <Text onPress={() => setSelected(!selected)}>{title}</Text>
      </View>
    )
  }

  return (
    <LinearGradient colors={["#413D4D", "#353438"]} style={BG_GRADIENT}>
      <Screen
        unsafe
        preset={"fixed"}
        backgroundColor={"transparent"}
        style={{ paddingHorizontal: scaleByDeviceWidth(24), alignItems: "center" }}
      >
        <Header headerText={"Search"} titleStyle={{ left: moderateScale(-32) }} />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              height: scaleByDeviceWidth(56),
              borderRadius: scaleByDeviceWidth(13),
              paddingHorizontal: scaleByDeviceWidth(24),
              backgroundColor: color.palette.white,
              width: "90%",
            }}
            placeholder={"Search Keyword"}
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode={"while-editing"}
            autoFocus
            placeholderTextColor={"#938BAC"}
            multiline={false}
            maxLength={50}
          />
          <Text
            style={{ fontWeight: "600", marginLeft: scaleByDeviceWidth(16), color: "#B87BF2" }}
            onPress={() => {}}
          >
            {"Go!"}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {renderFilterChip("Artist")}
          {renderFilterChip("Track")}
        </View>
        <View style={{ flex: 0.6, justifyContent: "center" }}>
          <Text
            style={{
              fontWeight: "900",
              color: color.palette.white,
              textAlign: "center",
              fontSize: scaleByDeviceWidth(16),
              marginBottom: scaleByDeviceWidth(8),
            }}
            onPress={() => {}}
          >
            {"Play what you like"}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: scaleByDeviceWidth(12),
              color: color.palette.offWhite,
              textAlign: "center",
            }}
            onPress={() => {}}
          >
            {"Search for atists, songs and more"}
          </Text>
        </View>
      </Screen>
    </LinearGradient>
  )
}

export { SearchScreen }
