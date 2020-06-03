import * as React from "react";
import { ControlType, addPropertyControls } from "framer";
import { C4Text as _C4Text } from "../../react-components/dist";
import Markdown from "markdown-to-jsx";
import { render } from "react-dom";

export const C4Text = (props: any) => (
  <_C4Text>
    <Markdown>{props.slot}</Markdown>
  </_C4Text>
);

addPropertyControls(C4Text, {
  slot: {
    type: ControlType.String,
    defaultValue: "Text",
  },
});
