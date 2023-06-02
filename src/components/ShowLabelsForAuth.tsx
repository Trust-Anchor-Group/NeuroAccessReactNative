import React, { FC } from "react";
import { View } from "react-native";
import { TextLabel } from "./TextLabel";
import { ShowLabelsForAuthStyle } from "@src/styles/ShowLabelsForAuthStyle";

interface Props{
  largeText:string;
  smallText:string;
  inputLabel:string;
}
export const ShowLabelsForAuth:FC<Props> = ({largeText,smallText,inputLabel})=>{

  return(<View>
            <TextLabel variant="header">{largeText}</TextLabel>
          <TextLabel style={ShowLabelsForAuthStyle.textMargin} variant="label">
            {smallText}
          </TextLabel>
          <TextLabel style={ShowLabelsForAuthStyle.textMargin} variant="inputLabel">
            {inputLabel}
          </TextLabel>
  </View>)
}