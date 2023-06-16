import { FC, useContext } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from '@Helpers/Enums';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
interface Props extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ActionButton: FC<Props> = ({
  title,
  buttonStyle,
  textStyle,
  ...restProps
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
    <TouchableOpacity
      {...restProps}
      style={[styles.appButtonContainer, buttonStyle]}
    >
      <TextLabel variant={TextLabelVariants.INPUTLABEL} style={textStyle}>
        {title}
      </TextLabel>
    </TouchableOpacity>
  );
};
