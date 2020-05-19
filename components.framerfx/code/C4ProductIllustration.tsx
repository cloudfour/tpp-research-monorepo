import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4ProductIllustration as _C4ProductIllustration } from "../../react-components/dist"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"

export const C4ProductIllustration = (props: any) => (
    <_C4ProductIllustration
        altText="placeholder text"
        color={props.color}
        className={sizeToUtility(props.size)}
        reference={`${props.svg}#illustration`}
    ></_C4ProductIllustration>
)

addPropertyControls(C4ProductIllustration, {
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
    svg: {
        type: ControlType.File,
        allowedFileTypes: ["svg"],
    },
    color: {
        type: ControlType.Color,
    },
})
