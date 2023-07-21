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
import { CopyPastIcon } from '@Assets/Svgs';
interface Props {
  title: string;
  link: string;
}

export const AlmostTechnicalLabel: FC<Props> = ({
  title, link
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
    <View style={{width:'100%', flexWrap:'wrap'}}>
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 7,
      }}
    >
      <TextLabel
        variant={TextLabelVariants.INPUTLABEL}
        style={{ flex: 0.9, textAlign: 'left', color:'rgba(24, 31, 37, 0.5)',fontSize:14, letterSpacing:0.1, lineHeight:19.6 }}
      >
        {title}
      </TextLabel>

      <CopyPastIcon style={{ flex: 0.1 }} textColor='rgba(24, 31, 37, 0.5)'/>
    </View>
    <TextLabel
        variant={TextLabelVariants.DESCRIPTION}
        style={{ width:'100%', flexWrap:'wrap', color:'rgba(79, 126, 172, 1)',textAlign:'auto',
        fontSize:14, letterSpacing:0.5, lineHeight:25.2 }}
      >
        {link}
      </TextLabel>
    </View>
  );
};
