import React, { useEffect, useState } from "react"
import { ScrollView, TextInput, View, ViewStyle } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { BG_GRADIENT, Screen, Header, Text } from "../../components"
import { color } from "../../theme"
import { moderateScale, scaleByDeviceWidth } from "../../theme/dimensionUtils"
import { useDebounce } from "../../hooks/useDebounce"
import { AuthApiService } from "../../services/api"
import { renderTrackListItemSearchResults } from "./style"

const renderFilterChip = (title?: string, state = false) => {
  const [selected, setSelected] = useState(state)
  const SELECTED: ViewStyle = {
    backgroundColor: color.palette.purple.type1,
    borderColor: color.palette.purple.type1,
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
          borderColor: color.palette.grey.type4,
        },
        selected ? SELECTED : UNSELECTED,
      ]}
    >
      <Text onPress={() => setSelected(!selected)}>{title}</Text>
    </View>
  )
}

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("")
  const [results, setResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const debouncedSearchTerm = useDebounce(searchText, 500)

  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true)
        if (searchText.length > 2) {
          // run search service
          AuthApiService.getSearchResults(searchText).then((data) => {
            setIsSearching(false)
            setResults(data.result)
          })
        }
      } else {
        setResults([])
        setIsSearching(false)
      }
    },
    [debouncedSearchTerm], // Only call effect if debounced search term changes
  )

  return (
    <LinearGradient
      colors={[color.palette.grey.type1, color.palette.grey.type2]}
      style={BG_GRADIENT}
    >
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
              width: "100%",
            }}
            placeholder={"Search Keyword"}
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode={"while-editing"}
            autoFocus
            placeholderTextColor={color.palette.purple.type2}
            multiline={false}
            maxLength={50}
          />
        </View>

        {/* search filters */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "flex-start",
          }}
        >
          {renderFilterChip("Artist")}
          {renderFilterChip("Track", true)}
        </View>

        {/* results */}

        {isSearching && (
          <Text
            text={"searching ..."}
            style={{
              paddingVertical: moderateScale(16),
              color: color.palette.purpleActive.typeActive,
            }}
          />
        )}
        {results.length < 1 ? (
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
        ) : (
          <ScrollView
            style={{ display: "flex", width: "100%", height: "100%" }}
            contentContainerStyle={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {results.map((track, key) => (
              <View key={key}>{renderTrackListItemSearchResults(track)}</View>
            ))}
          </ScrollView>
        )}
      </Screen>
    </LinearGradient>
  )
}

export { SearchScreen }
