import React, { ReactNode } from 'react';
import { Text, TextStyle } from 'react-native';
import { TextLabelStyle } from '@src/components/styles/TextLabelStyle';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';
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
  const getVariantStyle = (): TextStyle | undefined => {
    switch (variant) {
      case TextLabelVariants.HEADER:
        return TextLabelStyle.header;
      case TextLabelVariants.LABEL:
        return TextLabelStyle.label;
      case TextLabelVariants.INPUTLABEL:
        return TextLabelStyle.inputLabel;
      case TextLabelVariants.ERRORLABEL:
        return TextLabelStyle.errorLabel;
      case TextLabelVariants.XSMALL:
        return TextLabelStyle.xSmall;
      default:
        return undefined;
    }
  };

  return <Text style={[getVariantStyle(), style]}>{children}</Text>;
};
