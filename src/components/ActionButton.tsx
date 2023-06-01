import { FC } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GlobalStyle as styles } from '@src/styles/GlobalStyle';
interface Props {
  title: string;
  onPress: () => void;
}

export const ActionButton: FC<Props> = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);
