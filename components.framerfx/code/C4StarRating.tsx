import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4StarRating as _C4StarRating } from "../../react-components/dist"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"

export const C4StarRating = (props: any) => (
    <_C4StarRating
        {...props}
        className={sizeToUtility(props.size)}
    ></_C4StarRating>
)

addPropertyControls(C4StarRating, {
    rating: {
        type: ControlType.Number,
        defaultValue: 3.5,
        step: 0.01,
        min: 0,
        max: 5,
    },
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
})
