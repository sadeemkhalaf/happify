import React from 'react';
import { ViewStyle, View } from "react-native"
import { color } from "../../theme"
import { moderateScale } from "../../theme/dimensionUtils"

export const ShadowEffect: ViewStyle = {
    shadowColor: color.palette.grey.type1,
    shadowOffset: {
      width: moderateScale(-30),
      height: moderateScale(-65),
    },
    shadowOpacity: 1,
    shadowRadius: moderateScale(22),
    elevation: moderateScale(30),
    width: "150%",
    height: moderateScale(120),
    backgroundColor: color.palette.grey.type1,
  }
  
  export const absoluteBox: ViewStyle = { position: "relative", top: moderateScale(230), zIndex: 3 }
  
  export const renderShadowBox = () => {
    return (
      <View style={absoluteBox}>
        <View style={[ShadowEffect]} />
      </View>
    )
  }