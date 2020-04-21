import * as React from "react";
import { ControlType, addPropertyControls } from "framer";
import { C4ColorSwatches as _C4ColorSwatches } from "../../react-components/dist";

export const C4ColorSwatches = (props: any) => {
  const colorsArray = props.colors
    ? props.colors.map((color) => {
        return {
          hex: color,
          name: "",
          id: "",
        };
      })
    : [];

  return (
    <_C4ColorSwatches colorsData={colorsArray} radioName={props.radioName} />
  );
};

addPropertyControls(C4ColorSwatches, {
  radioName: {
    type: ControlType.String,
    defaultValue: "color",
  },
  colors: {
    type: ControlType.Array,
    propertyControl: {
      type: ControlType.Color,
    },
  },
});
