import * as React from "react";
import { ControlType, addPropertyControls } from "framer";
import { C4ProductIllustration as _C4ProductIllustration } from "../../react-components/dist";
import { sizeSelectorPresets, sizeToUtility } from "./Utilities";

export const C4ProductIllustration = (props: any) => (
  <_C4ProductIllustration
    altText="placeholder text"
    {...props}
    className={sizeToUtility(props.size)}
  ></_C4ProductIllustration>
);

addPropertyControls(C4ProductIllustration, {
  size: {
    type: ControlType.Number,
    ...sizeSelectorPresets,
  },
  imgPath: {
    type: ControlType.File,
    allowedFileTypes: ["svg", "png"],
  },
  color: {
    type: ControlType.Color,
    defaultValue: "#215cca",
  },
  aspectRatio: {
    type: ControlType.Number,
    defaultValue: 60,
    step: 0.25,
    min: 0,
    max: 100,
  },
});
