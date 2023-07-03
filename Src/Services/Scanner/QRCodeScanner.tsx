import { useContext } from 'react';
import { View } from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { t } from 'i18next';
import { ThemeContext } from '@Theme/Provider';
import { ChooseAccountTypeStyle } from '@Pages/Styles';
import { InformationOverlayStyle } from '@Controls/Styles';
import { ActionButton } from '@Controls/ActionButton';
import { TextLabel } from '@Controls/TextLabel';
import { TextLabelVariants } from '@Controls/TextLabel';

interface Props {
  title: string;
  description: string;
  toggleOverlay: () => void;
}
export const QRCodeScanner: React.FC<Props> = ({
  title,
  description,
  toggleOverlay,
}) => {
  const { themeColors } = useContext(ThemeContext);

  return (
    <View style={InformationOverlayStyle(themeColors).overlay}>
      <BlurView
        style={InformationOverlayStyle(themeColors).overlay}
        blurType="dark"
        blurAmount={5}
        reducedTransparencyFallbackColor="white"
      >
        <View style={InformationOverlayStyle(themeColors).informationContainer}>
          <TextLabel
            style={InformationOverlayStyle(themeColors).title}
            variant={TextLabelVariants.HEADER}
          >
            {'QRCode Scanner'}
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
