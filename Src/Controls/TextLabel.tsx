import React, { ReactNode, useContext } from 'react';
import { Text, TextStyle, TextProps } from 'react-native';
import { TextLabelStyle } from '@Controls/Styles';
import { TextLabelVariants } from 'Helpers/Enums';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
interface CustomTextProps extends TextProps {
  children: ReactNode;
  variant: TextLabelVariants;
}

export const TextLabel: React.FC<CustomTextProps> = ({
  children,
  variant,
  ...restProps
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = TextLabelStyle(themeColors);
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
      case TextLabelVariants.DESCRIPTION:
        return styles.description;
      default:
        return undefined;
    }
  };

  return <Text {...restProps} style={[getVariantStyle(), restProps && restProps?.style]}>{children}</Text>;
};
