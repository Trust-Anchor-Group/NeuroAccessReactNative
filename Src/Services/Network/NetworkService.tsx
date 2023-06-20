import { View } from 'react-native';
import React from 'react';
import NetInfo, { NetInfoSubscription } from '@react-native-community/netinfo';
import { useTranslation } from 'react-i18next';
import { TextLabel } from '@Controls/TextLabel';
import { TextLabelVariants } from '@Controls/TextLabel';
import { InternetContainerViewStyles } from './NetworkServiceStyle';

export function NetworkService() {
  const { t } = useTranslation();
  const [isInternetReachable, setIsInternetReachable] = React.useState(true);
  let unsubscribe: NetInfoSubscription | undefined = undefined;
  React.useEffect(() => {
    setTimeout(() => {
      unsubscribe = NetInfo.addEventListener((state) => {
        console.log(state.isInternetReachable);
        setIsInternetReachable(state.isInternetReachable ?? false);
      });
    }, 100);

    return () => {
      if (unsubscribe) unsubscribe();
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
