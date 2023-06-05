import { horizontalScale, verticalScale, moderateScale } from './Metrics';
export const backgroundLayerSize = {
  lMarginTop: verticalScale(60),
  layerWidth: horizontalScale(431),
  layerHeight: verticalScale(919),
};

export const headerSize = {
  hLeftIcon: verticalScale(16),
  wLeftIcon: horizontalScale(16),
  hRightIcon: verticalScale(20),
  wRightIcon: horizontalScale(21),
  Height: verticalScale(50),
  pTop: moderateScale(4),
  languageTextMTop: moderateScale(5),
  fontSize: moderateScale(12),
};

export const authLabelsSize = {
  large: moderateScale(30),
  medium: moderateScale(18),
  label: moderateScale(14),
  normal: moderateScale(18),
  small: moderateScale(13),
  xSmall: moderateScale(12),
  marginTop: moderateScale(10),
};

export const logoSize = {
  logoWidth: horizontalScale(233),
  logoHeight: verticalScale(110),
};

export const inputIconSize = {
  1: horizontalScale(20),
  40: verticalScale(30),
  iconWidth: horizontalScale(20),
  iconHeight: verticalScale(16),
};

export const inputBoxSize = {
  marginTop: moderateScale(5),
  borderWidth: moderateScale(1),
  borderRadius: moderateScale(4),
  paddingHorizontal: moderateScale(12),
  paddingVertical: moderateScale(8),
  fontSize: moderateScale(16),
  leftIcon:{
    marginRight: moderateScale(8),
  },
  rightIcon: {
    width: horizontalScale(20),
    height: verticalScale(20),
    marginLeft: moderateScale(8),
  },
  error: {
    marginTop: moderateScale(2),
  },
};

export const informationLogoSize = {
  logoWidth: horizontalScale(20),
  logoHeight: verticalScale(20),
};

export const chooseAccountItemHeight = {
  height: verticalScale(50),
};
