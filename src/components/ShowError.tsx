import React, {useContext} from 'react'
import { View } from 'react-native';
import { TextLabel } from './TextLabel';
import { ShowErrorStyle } from './styles/ShowErrorStyle';
import { ThemeContext } from '@src/theme/provider/ThemeContext';
import { TextLabelVariants } from '@src/utils/enums/TextLabelVariants';
import { InformationIcon } from '@src/assets/svg/InformationIcon';

interface Props{
errorMessage:string;
}

export const ShowError:React.FC<Props>= ({errorMessage}) =>{

  const {themeColors} = useContext(ThemeContext);
  return(
        <View style={ShowErrorStyle.Container}>
          <InformationIcon textColor={themeColors.inputBox.error} />
          <TextLabel style={ShowErrorStyle.label} variant={TextLabelVariants.ERRORLABEL}>{errorMessage}</TextLabel>
        </View>
  );
}