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
}

export const AlmostStatusLabel: FC<Props> = ({
  title,
  titleValue,
  titleValueColor,
}) => {
  const { themeColors } = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors);
  return (
    <View style={AlmostStatusLabelStyle(themeColors).Container}>
      <TextLabel
        variant={TextLabelVariants.INPUTLABEL}
        style={AlmostStatusLabelStyle(themeColors).label}
      >
        {title}
      </TextLabel>

      <TextLabel
        variant={TextLabelVariants.DESCRIPTION}
        style={[
          AlmostStatusLabelStyle(themeColors).value,
          { color: titleValueColor },
        ]}
      >
        {titleValue}
      </TextLabel>
    </View>
  );
};
