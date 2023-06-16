import { View } from 'react-native';
import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { TextLabel } from '@Controls/TextLabel';
import { TextLabelVariants } from '@Controls/TextLabel';
import { InternetContainerViewStyles } from './NetworkServiceStyle';

export function NetworkService() {
  const { t } = useTranslation();
  const [isInternetReachable, setIsInternetReachable] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsInternetReachable(state.isInternetReachable ?? false);
    });

    return () => {
      unsubscribe();
    };
  });
  return (
    <>
      {isInternetReachable === false && (
        <View style={InternetContainerViewStyles.networkViewContainer}>
          <TextLabel
            variant={TextLabelVariants.LABEL}
            style={{ color: 'white' }}
          >
            {isInternetReachable
              ? t('internetSatus.connected')
              : t('internetSatus.disconnected')}
          </TextLabel>
        </View>
      )}
    </>
  );
}
