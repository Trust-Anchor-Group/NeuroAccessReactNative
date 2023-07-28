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
import { ActionButtonWithIcon } from './ActionButtonWithIcon';
interface Props {
  title: string;
  description: string;
  toggleOverlay: () => void;
  peerReview?: () => void;
  showPeerReview?: boolean | false;
}
export const InformationOverlay: React.FC<Props> = ({
  title,
  description,
  toggleOverlay,
  showPeerReview,
  peerReview,
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
          <View style={InformationOverlayStyle(themeColors).spacer} />

          {showPeerReview && (
            <ActionButtonWithIcon
              onPress={peerReview}
              hideIcon={false}
              title={t('almostThere.invitePeer')}
              buttonStyle={InformationOverlayStyle(themeColors).actionButton}
              textStyle={InformationOverlayStyle(themeColors).sendText}
            />
          )}

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
