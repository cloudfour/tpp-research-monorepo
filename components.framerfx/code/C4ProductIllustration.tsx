import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4ProductIllustration as _C4ProductIllustration } from "../../react-components/dist"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"

export const C4ProductIllustration = (props: any) => (
    <_C4ProductIllustration
        altText="placeholder text"
        imgPath={props.image}
        color={props.color}
        className={sizeToUtility(props.size)}
    ></_C4ProductIllustration>
)

addPropertyControls(C4ProductIllustration, {
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
    image: {
        type: ControlType.File,
        allowedFileTypes: ["svg", "png"],
    },
    color: {
        type: ControlType.Color,
    },
})
