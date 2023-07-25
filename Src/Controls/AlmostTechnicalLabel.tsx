import { FC, useContext } from 'react';
import { View } from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { CopyPastIcon } from '@Assets/Svgs';
import { AlmostTechnicalLabelStyle } from './Styles';
interface Props {
  title: string;
  link: string;
}

export const AlmostTechnicalLabel: FC<Props> = ({ title, link }) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
    <View style={AlmostTechnicalLabelStyle(themeColors).Container}>
      <View style={AlmostTechnicalLabelStyle(themeColors).detailContainer}>
        <TextLabel
          variant={TextLabelVariants.INPUTLABEL}
          style={AlmostTechnicalLabelStyle(themeColors).label}
        >
          {title}
        </TextLabel>

        <CopyPastIcon
          style={AlmostTechnicalLabelStyle(themeColors).icon}
          textColor={themeColors.almost.horizontalLine}
        />
      </View>
      <TextLabel
        variant={TextLabelVariants.DESCRIPTION}
        style={AlmostTechnicalLabelStyle(themeColors).value}
      >
        {link}
      </TextLabel>
    </View>
  );
};
