import React, { FC, useContext } from "react";
import { View } from "react-native";
import { TextLabel } from "./TextLabel";
import { ShowLabelsForAuthStyle } from "@src/components/styles/ShowLabelsForAuthStyle";
import { TextLabelVariants } from "@src/utils/enums/TextLabelVariants";
import { ThemeContext } from "@src/theme/provider/ThemeContext";
interface Props{
  largeText:string;
  smallText:string;
  inputLabel:string;
}
export const ShowLabelsForAuth:FC<Props> = ({largeText,smallText,inputLabel})=>{
const {themeColors} = useContext(ThemeContext);
  return(<View>
            <TextLabel variant={TextLabelVariants.HEADER}>{largeText}</TextLabel>
          <TextLabel style={ShowLabelsForAuthStyle.textMargin} variant={TextLabelVariants.LABEL}>
            {smallText}
          </TextLabel>
          <TextLabel style={ShowLabelsForAuthStyle.textMargin} variant={TextLabelVariants.INPUTLABEL}>
            {inputLabel}
          </TextLabel>
  </View>)
}