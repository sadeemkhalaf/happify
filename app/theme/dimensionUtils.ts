import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const CORRECTNESS_FACTOR = 1;

export const scaleByDeviceWidth = (size: number) =>
  (width / guidelineBaseWidth) * size * CORRECTNESS_FACTOR;
export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size * CORRECTNESS_FACTOR;
export const moderateScale = (size: number, factor = 0.5) =>
  size + (scaleByDeviceWidth(size) - size) * factor;

export const windowWidth = width;
export const windowHeight = height;
