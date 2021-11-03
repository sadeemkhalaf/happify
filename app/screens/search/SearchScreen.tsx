import { LinearGradient } from "expo-linear-gradient"
import React, { useState } from "react"
import { TextInput, View, ViewStyle } from "react-native"

import { BG_GRADIENT, Screen, Header, Text } from "../../components"
import { color } from "../../theme"

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
            paddingVertical: 8,
            paddingHorizontal: 16,
            borderWidth: 1,
            display: "flex",
            marginRight: 8,
            marginTop: 16,
            borderRadius: 20,
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
      <Screen preset={"fixed"} backgroundColor={"#ffffff00"} style={{ paddingHorizontal: 24, alignItems: "center" }}>
        <Header headerText={"Search"} titleStyle={{ left: -24 }} />
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
              height: 56,
              borderRadius: 13,
              paddingHorizontal: 24,
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
          <Text style={{ fontWeight: "600", marginLeft: 16, color: "#B87BF2" }} onPress={() => {}}>
            {"Go!"}
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", width: '100%', justifyContent: 'flex-start' }}>
          {renderFilterChip("Artist")}
          {renderFilterChip("Track")}
        </View>
        <View style={{ flex: 0.6, justifyContent: "center" }}>
        <Text
            style={{
              fontWeight: "900",
              color: color.palette.white,
              textAlign: "center",
              fontSize: 14,
            }}
            onPress={() => {}}
          >
            {"Play what you like"}
          </Text>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 12,
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
