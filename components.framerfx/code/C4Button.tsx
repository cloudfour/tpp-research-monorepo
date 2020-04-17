import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4Button as _C4Button } from "../../react-components/dist"

export const C4Button = (props: any) => (
    <_C4Button height="60" width="100" {...props}>
        {props.slot}
    </_C4Button>
)

addPropertyControls(C4Button, {
    slot: {
        type: ControlType.String,
        defaultValue: "Button",
    },
    buttonClass: {
        type: ControlType.String,
        defaultValue: null,
    },
    tag: {
        type: ControlType.Enum,
        defaultValue: "button",
        options: ["a", "button"],
    },
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
        hidden(props) {
            return props.tag === "a"
        },
    },
    type: {
        type: ControlType.String,
        defaultValue: "button",
        hidden(props) {
            return props.tag === "a"
        },
    },
    href: {
        type: ControlType.String,
        defaultValue: "href",
        hidden(props) {
            return props.tag !== "a"
        },
    },
})
