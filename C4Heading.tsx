import * as React from "react";
import { ControlType, addPropertyControls } from "framer";
import { C4Heading as _C4Heading } from "../../react-components/dist";

export const C4Heading = (props: any) => (
  <_C4Heading {...props}>{props.slot}</_C4Heading>
);

addPropertyControls(C4Heading, {
  slot: {
    type: ControlType.String,
    defaultValue: "Hello world",
  },
  tag: {
    type: ControlType.String,
    defaultValue: "h1",
  },
});
