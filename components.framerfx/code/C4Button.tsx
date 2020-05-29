import * as React from "react";
import { ControlType, addPropertyControls } from "framer";
import { C4Button as _C4Button } from "../../react-components/dist";
import { sizeSelectorPresets, sizeToUtility } from "./Utilities";

export const C4Button = (props: any) => (
  <_C4Button {...props} className={sizeToUtility(props.size)}>
    {props.slot}
  </_C4Button>
);

addPropertyControls(C4Button, {
  slot: {
    type: ControlType.String,
    defaultValue: "Button",
  },
  buttonClass: {
    type: ControlType.Enum,
    defaultValue: null,
    options: [null, "secondary", "tertiary"],
    displaySegmentedControl: true,
  },
  tag: {
    type: ControlType.Enum,
    defaultValue: "button",
    options: ["a", "button"],
    displaySegmentedControl: true,
  },
  disabled: {
    type: ControlType.Boolean,
    defaultValue: false,
    hidden(props) {
      return props.tag === "a";
    },
  },
  type: {
    type: ControlType.Enum,
    defaultValue: "button",
    options: ["submit", "reset", "button"],
    displaySegmentedControl: true,
    hidden(props) {
      return props.tag === "a";
    },
  },
  href: {
    type: ControlType.String,
    defaultValue: "href",
    hidden(props) {
      return props.tag !== "a";
    },
  },
  size: {
    type: ControlType.Number,
    ...sizeSelectorPresets,
  },
});
