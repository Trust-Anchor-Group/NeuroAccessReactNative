import { StyleSheet } from 'react-native';
import { chooseAccountItemHeight } from '@Theme/Dimensions';
import { moderateScale } from '@Theme/Metrics';
const itemHeight = chooseAccountItemHeight.height;
const itemHorizontalMargin = chooseAccountItemHeight.itemHorizontalMargin;

export const ChooseActionTypeStyle=(themeColors:any) => StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: itemHeight,
    zIndex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: chooseAccountItemHeight.icon.marginRight,
  },
  informationLogoContainer: { 
    padding: moderateScale(5), 
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    height: (itemHeight + (itemHorizontalMargin * 2)) * 4,
    shadowColor: '#000000',
    shadowRadius: 1,
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.2,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: themeColors.choosePurpose.itemDefaultBg,
    paddingHorizontal: chooseAccountItemHeight.paddingHorizontal,
    paddingVertical: chooseAccountItemHeight.paddingVertical,
    borderWidth: chooseAccountItemHeight.borderWidth,
    borderColor: themeColors.choosePurpose.itemBorder,
    marginHorizontal: chooseAccountItemHeight.marginHorizontal,
    height: itemHeight,
    borderRadius: chooseAccountItemHeight.borderRadius,
    marginVertical: chooseAccountItemHeight.marginVertical,
  }
});
