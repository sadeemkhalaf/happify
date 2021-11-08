import React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { color, spacing } from "../../theme"
import { translate } from "../../i18n/"
import { moderateScale } from "../../theme/dimensionUtils"
import { IconButton } from "../IconButton"

// static styles
const ROOT: ViewStyle = {
  flexDirection: "row",
  paddingTop: spacing[5],
  paddingBottom: spacing[5],
  justifyContent: "flex-start",
  marginTop: moderateScale(32),
  alignItems: "flex-start",
}

const TITLE: TextStyle = { textAlign: "left", fontWeight: "900", fontSize: moderateScale(30) }
const PLAYERTITLE: TextStyle = { textAlign: "center", fontSize: moderateScale(13) }
const PLAYERSUBHEADER: TextStyle = {
  textAlign: "center",
  fontWeight: "bold",
  fontSize: moderateScale(14),
}
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "center" }
const LEFT: ViewStyle = { width: moderateScale(32) }
const RIGHT: ViewStyle = { width: moderateScale(32) }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export function Header(props: HeaderProps) {
  const {
    onLeftPress,
    onRightPress,
    rightIcon,
    leftIcon,
    headerText,
    headerTx,
    style,
    titleStyle,
    isPlayer = false,
    subheader = "",
  } = props
  const header = headerText || (headerTx && translate(headerTx)) || ""

  const leftIconStyle: ViewStyle = {
    marginLeft: moderateScale(24),
    backgroundColor: `${color.palette.purple.type1}64`,
    borderRadius: moderateScale(30),
  }

  const rightIconStyle: ViewStyle = {
    marginRight: moderateScale(24),
    backgroundColor: `${color.palette.deepPurple}64`,
    borderRadius: moderateScale(30),
  }

  return (
    <View style={[ROOT, style]}>
      {leftIcon ? (
        <Button preset="link" onPress={onLeftPress}>
          {IconButton(leftIcon, onLeftPress, leftIconStyle)}
        </Button>
      ) : (
        <View style={LEFT} />
      )}
      <View style={TITLE_MIDDLE}>
        <Text style={[isPlayer ? PLAYERTITLE : TITLE, titleStyle]} text={header} />
        {isPlayer && <Text style={[PLAYERSUBHEADER, titleStyle]} text={subheader} />}
      </View>
      {rightIcon ? (
        <Button preset="link" onPress={onRightPress}>
          {IconButton(rightIcon, onRightPress, rightIconStyle)}
        </Button>
      ) : (
        <View style={RIGHT} />
      )}
    </View>
  )
}
