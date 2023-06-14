import React, {useContext} from 'react'
import { View } from 'react-native';
import { TextLabel } from './TextLabel';
import { ShowErrorStyle } from './Styles/ShowErrorStyle';
import { ThemeContext } from '@Theme/Provider';
import { TextLabelVariants } from '@Helpers/Enums';
import { InformationIcon } from '@Assets/Svgs';

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