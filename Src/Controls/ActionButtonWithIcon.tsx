import { FC, useContext } from 'react';
import {
  TouchableOpacity,
  ViewStyle,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
} from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { InvitePeerIcon } from '@Assets/Svgs';
interface Props extends TouchableOpacityProps {
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const ActionButtonWithIcon: FC<Props> = ({
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
      style={[styles.appButtonIcon, buttonStyle]}
    >
      <InvitePeerIcon iconColor="#F5F6F7" />
      <TextLabel variant={TextLabelVariants.INPUTLABEL} style={textStyle}>
        {title}
      </TextLabel>
    </TouchableOpacity>
  );
};
