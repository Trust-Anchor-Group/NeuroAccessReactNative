import { FC, useContext } from 'react';
import { View } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { CopyPastIcon } from '@Assets/Svgs';
import { AlmostTechnicalLabelStyle } from './Styles';
interface Props {
  title: string;
  link: string;
  prefix: string;
}

export const AlmostTechnicalLabel: FC<Props> = ({ title, link, prefix }) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);

  const getCopiedData = (text: string) => {
    Clipboard.setString(prefix + text);
  };

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
          onPress={() => getCopiedData(link)}
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
