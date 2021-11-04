import React from "react"
import { TouchableOpacity, ViewStyle } from "react-native"

import Explore from "./explore.svg"
import Search from "./search.svg"
import Profile from "./profile.svg"
import Close from "./close.svg"
import BackBold from "./back.svg"

// player icons
import SkipNext from "./skip-next.svg"
import SkipBack from "./skip-back.svg"
import Repeat from "./repeat.svg"
import Play from "./play-button.svg"
import PlayWhite from "./play-white.svg"
import Pause from "./pause.svg"
import { moderateScale, scaleByDeviceWidth } from "../../../app/theme/dimensionUtils"
import { IconTypes } from "../../../app/components/icon/icons"

export type Icons =
  | "back"
  | "close"
  | "play"
  | "play-white"
  | "pause"
  | "repeat"
  | "skip-backward"
  | "skip-forward"

const IconButton = (iconName: Icons | IconTypes, action = () => {}, style: ViewStyle = {}) => {
  const dim = scaleByDeviceWidth(16)
  const getIconByName = () => {
    switch (iconName) {
      case "back":
        return <BackBold height={dim} width={dim} />

      case "close":
        return <Close height={dim} width={dim} />

      case "pause":
        return <Pause height={dim} width={dim} />

      case "play":
        return <Play height={dim} width={dim} />

      case "repeat":
        return <Repeat height={dim} width={dim} />

      case "play-white":
        return <PlayWhite height={dim} width={dim} />

      case "skip-backward":
        return <SkipBack height={dim} width={dim} />

      case "skip-forward":
        return <SkipNext height={dim} width={dim} />

      default:
        return <Close height={dim} width={dim} />
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

export {
  IconButton,
  BackBold,
  Close,
  PlayWhite,
  SkipBack,
  SkipNext,
  Pause,
  Play,
  Repeat,
  Explore,
  Search,
  Profile,
}
