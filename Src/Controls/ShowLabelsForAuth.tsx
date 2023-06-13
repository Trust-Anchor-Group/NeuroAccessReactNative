import React, { FC, useContext } from "react";
import { View } from "react-native";
import { TextLabel } from "./TextLabel";
import { ShowLabelsForAuthStyle } from "@Controls/Styles/ShowLabelsForAuthStyle";
import { TextLabelVariants } from "Helpers/Enums/TextLabelVariants";
import { ThemeContext } from "@Theme/Provider/ThemeContext";
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