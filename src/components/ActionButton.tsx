import { FC, useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { GlobalStyle } from '@src/styles/GlobalStyle';
import { ThemeContext } from '@src/theme/provider/ThemeContext';
interface Props {
  title: string;
  onPress: () => void;
}

export const ActionButton: FC<Props> = ({ title, onPress }) => {
  const {themeColors} = useContext(ThemeContext);
  const styles = GlobalStyle(themeColors)
  return (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
)};
