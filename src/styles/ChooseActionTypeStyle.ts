import { Colors } from '@src/theme/Colors';
import { StyleSheet } from 'react-native';
import { chooseAccountItemHeight } from '@src/theme/Dimensions';
const itemHeight = chooseAccountItemHeight.height;
const itemHorizontalMargin = 5;

export const ChooseActionTypeStyle = StyleSheet.create({
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
    marginRight: 10,
  },
  informationLogoContainer: { 
    right: 0, 
    justifyContent: 'center' 
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
    backgroundColor: Colors.light.chooseActionItemBackground,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: Colors.light.chooseActionItemBorderColor,
    marginHorizontal: 0,
    height: itemHeight,
    borderRadius: 4,
    marginVertical: 5,
  },
  text: {
    color: '#F5F6F7',
  },
});
