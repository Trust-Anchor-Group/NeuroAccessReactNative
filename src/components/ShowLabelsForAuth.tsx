import React, { FC } from "react";
import { View } from "react-native";
import { TextLabel } from "./TextLabel";
import { ShowLabelsForAuthStyle } from "@src/components/styles/ShowLabelsForAuthStyle";
import { TextLabelVariants } from "@src/utils/enums/TextLabelVariants";

interface Props{
  largeText:string;
  smallText:string;
  inputLabel:string;
}
export const ShowLabelsForAuth:FC<Props> = ({largeText,smallText,inputLabel})=>{

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