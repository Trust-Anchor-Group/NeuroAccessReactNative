import { FC, useContext } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  View,
} from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
interface Props {
  title: string;
  titleValue: string;
  titleValueColor?: string;
}

export const AlmostStatusLabel: FC<Props> = ({
  title,
  titleValue,
  titleValueColor
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
      <View style={{flexDirection:'row', flex:1, justifyContent:'center', paddingVertical:7}}>
      <TextLabel variant={TextLabelVariants.INPUTLABEL} style={{flex:.4, textAlign:'left', color:'rgba(24, 31, 37, 0.5)',
    fontSize:14, letterSpacing:0.1, lineHeight:19.6}}>
        {title}
      </TextLabel>

      <TextLabel variant={TextLabelVariants.DESCRIPTION} style={{flex:.6, textAlign:'right',color:titleValueColor,
    fontSize:16, letterSpacing:0.5, lineHeight:25.2}}>
        {titleValue}
      </TextLabel>
      </View>
  );
};
