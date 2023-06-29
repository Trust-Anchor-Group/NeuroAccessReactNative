import { useContext } from 'react';
import { View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { t } from 'i18next';
import { ThemeContext } from '@Theme/Provider';
import { ChooseAccountTypeStyle } from '@Pages/Styles';
import { InformationOverlayStyle } from './Styles';
import { ActionButton } from './ActionButton';
import { TextLabel } from './TextLabel';
import { TextLabelVariants } from './TextLabel';
interface Props {
  title: string;
  description: string;
  toggleOverlay: () => void;
}
export const InformationOverlay: React.FC<Props> = ({
  title,
  description,
  toggleOverlay,
}) => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <View style={InformationOverlayStyle(themeColors).overlay}>
      <BlurView
        style={InformationOverlayStyle(themeColors).overlay}
        blurType="light"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      >
        <View style={InformationOverlayStyle(themeColors).informationContainer}>
          <TextLabel
            style={InformationOverlayStyle(themeColors).title}
            variant={TextLabelVariants.HEADER}
          >
            {title}
          </TextLabel>
          <TextLabel variant={TextLabelVariants.DESCRIPTION}>
            {description}
          </TextLabel>
          <ActionButton
            title={t('buttonTitle.close')}
            textStyle={ChooseAccountTypeStyle(themeColors).sendText}
            onPress={toggleOverlay}
          />
        </View>
      </BlurView>
    </View>
  );
};
