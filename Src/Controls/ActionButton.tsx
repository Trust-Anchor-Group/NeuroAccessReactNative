import { FC, useContext } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
} from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from '@Helpers/Enums';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
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
