import React, { useContext } from 'react';
import { View } from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
import { ShowErrorStyle } from './Styles/ShowErrorStyle';
import { ThemeContext } from '@Theme/Provider';
import { InformationIcon } from '@Assets/Svgs';

interface Props {
  errorMessage: string;
  changeColor?: boolean;
  colorCode?: string;
  styles?: any;
}
export const ShowError: React.FC<Props> = ({
  errorMessage,
  changeColor,
  styles,
  colorCode,
}) => {
  const { themeColors } = useContext(ThemeContext);
  return (
    <View style={ShowErrorStyle.Container}>
      <InformationIcon
        textColor={changeColor ? colorCode : themeColors.inputBox.error}
      />
      <TextLabel
        style={[ShowErrorStyle.label, styles]}
        variant={TextLabelVariants.ERRORLABEL}
      >
        {errorMessage}
      </TextLabel>
    </View>
  );
};
