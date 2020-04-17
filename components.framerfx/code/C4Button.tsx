import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4Button as _C4Button } from "../../react-components/dist"

export const C4Button = (props: any) => (
    <_C4Button {...props}>{props.slot}</_C4Button>
)

addPropertyControls(C4Button, {
    slot: {
        type: ControlType.String,
        defaultValue: "Hello world",
    },
    disabled: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
})
