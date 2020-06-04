import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"
import { C4Text } from "../../react-components/dist"

export const C4TextLine = (props: any) => {
    const fontStyles = {
        fontWeight: props.weight,
        fontStyle: props.italic ? "italic" : "normal",
    }

    return (
        <C4Text className={sizeToUtility(props.size)} style={fontStyles}>
            <props.tag>{props.slot}</props.tag>
        </C4Text>
    )
}

addPropertyControls(C4TextLine, {
    slot: {
        type: ControlType.String,
        defaultValue: "Text",
    },
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
    italic: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    weight: {
        type: ControlType.Number,
        min: 200,
        max: 900,
        step: 1,
        defaultValue: 400,
    },
    tag: {
        type: ControlType.String,
        defaultValue: "p",
    },
})
