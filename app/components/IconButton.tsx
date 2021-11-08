import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"
import * as SvgIcons from "./../../assets/images/svgs"
import { moderateScale, scaleByDeviceWidth } from "../theme/dimensionUtils"
import { IconTypes } from "./icon/icons"

export type Icons =
  | "back"
  | "close"
  | "play"
  | "play-white"
  | "pause"
  | "repeat"
  | "skip-backward"
  | "skip-forward"
  | "artist"
  | "album"

export const IconButton = (iconName: Icons | IconTypes, action = () => {}, style: ViewStyle = {}) => {
  const dim = scaleByDeviceWidth(16)
  const getIconByName = () => {
    switch (iconName) {
      case "back":
        return <SvgIcons.BackBold height={dim} width={dim} />

      case "close":
        return <SvgIcons.Close height={dim} width={dim} />

      case "pause":
        return <SvgIcons.Pause height={dim} width={dim} />

      case "play":
        return <SvgIcons.Play height={dim} width={dim} />

      case "repeat":
        return <SvgIcons.Repeat height={dim} width={dim} />

      case "play-white":
        return <SvgIcons.PlayWhite height={dim} width={dim} />

      case "skip-backward":
        return <SvgIcons.SkipBack height={dim} width={dim} />

      case "skip-forward":
        return <SvgIcons.SkipNext height={dim} width={dim} />

      case "album":
        return <SvgIcons.Album height={dim} width={dim} />

      case "artist":
        return <SvgIcons.Artist height={dim} width={dim} />

      default:
        return <SvgIcons.Close height={dim} width={dim} />
    }
  }

  return (
    <TouchableOpacity
      onPress={action}
      style={[
        {
          height: moderateScale(40),
          width: moderateScale(40),
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
    >
      {getIconByName()}
    </TouchableOpacity>
  )
}
