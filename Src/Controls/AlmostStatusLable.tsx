import { FC, useContext } from 'react';
import { View } from 'react-native';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
import { GlobalStyle } from '@Pages/Styles';
import { ThemeContext } from '@Theme/Provider/ThemeContext';
import { AlmostStatusLabelStyle } from './Styles';
interface Props {
  title: string;
  titleValue: string;
  titleValueColor?: string;
  styleTitle?: any;
  styleValue?: any;
}

export const AlmostStatusLabel: FC<Props> = ({
  title,
  titleValue,
  titleValueColor,
  styleTitle,
  styleValue,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
    <View style={AlmostStatusLabelStyle(themeColors).Container}>
      <TextLabel
        variant={TextLabelVariants.INPUTLABEL}
        style={[AlmostStatusLabelStyle(themeColors).label, styleTitle]}
      >
        {title}
      </TextLabel>

      <TextLabel
        variant={TextLabelVariants.DESCRIPTION}
        style={[
          AlmostStatusLabelStyle(themeColors).value,
          { color: titleValueColor },
          styleValue,
        ]}
      >
        {titleValue}
      </TextLabel>
    </View>
  );
};
