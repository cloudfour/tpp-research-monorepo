import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4Stepper as _C4Stepper } from "../../react-components/dist"

export const C4Stepper = (props: any) => (
    <_C4Stepper {...props} style={{ fontSize: `${props.size}em` }}></_C4Stepper>
)

addPropertyControls(C4Stepper, {
    min: {
        type: ControlType.Number,
        defaultValue: 0,
    },
    max: {
        type: ControlType.Number,
        defaultValue: 100,
    },
})
