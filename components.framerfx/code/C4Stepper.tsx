import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4Stepper as _C4Stepper } from "../../react-components/dist"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"

export const C4Stepper = (props: any) => (
    <_C4Stepper {...props} className={sizeToUtility(props.size)}></_C4Stepper>
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
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
})
