import { FC, useContext } from 'react';
import {
  TouchableOpacity,
  Text,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { GlobalStyle } from '@src/styles/GlobalStyle';
import { ThemeContext } from '@src/theme/provider/ThemeContext';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';
interface Props {
  title: string;
  onPress: () => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ActionButton: FC<Props> = ({
  title,
  onPress,
  buttonStyle,
  textStyle,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.appButtonContainer, buttonStyle]}
    >
      <TextLabel variant={TextLabelVariants.INPUTLABEL} style={textStyle}>
        {title}
      </TextLabel>
    </TouchableOpacity>
  );
};
