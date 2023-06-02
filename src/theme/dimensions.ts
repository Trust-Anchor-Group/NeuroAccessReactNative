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
  fontSize: moderateScale(12),
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

export const informationLogoSize={
  logoWidth: horizontalScale(20),
  logoHeight: verticalScale(20),
}
