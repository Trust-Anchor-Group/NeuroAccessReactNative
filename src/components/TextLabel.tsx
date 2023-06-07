import React, { ReactNode, useContext } from 'react';
import { Text, TextStyle } from 'react-native';
import { TextLabelStyle } from '@src/components/styles/TextLabelStyle';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';
import { ThemeContext } from '@src/theme/provider/ThemeContext';
interface CustomTextProps {
  children: ReactNode;
  variant?: TextLabelVariants;
  style?: TextStyle;
}

export const TextLabel: React.FC<CustomTextProps> = ({
  children,
  variant,
  style,
}) => {
const {themeColors} = useContext(ThemeContext);
const styles = TextLabelStyle(themeColors)

  const getVariantStyle = (): TextStyle | undefined => {
    switch (variant) {
      case TextLabelVariants.HEADER:
        return styles.header;
      case TextLabelVariants.LABEL:
        return styles.label;
      case TextLabelVariants.INPUTLABEL:
        return styles.inputLabel;
      case TextLabelVariants.ERRORLABEL:
        return styles.errorLabel;
      case TextLabelVariants.XSMALL:
        return styles.xSmall;
      default:
        return undefined;
    }
  };

  return <Text style={[getVariantStyle(), style]}>{children}</Text>;
};
