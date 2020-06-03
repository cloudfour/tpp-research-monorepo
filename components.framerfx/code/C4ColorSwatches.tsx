import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4ColorSwatches as _C4ColorSwatches } from "../../react-components/dist"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"

export const C4ColorSwatches = (props: any) => {
    const colorsArray = props.colors
        ? props.colors.map(color => {
              return {
                  hex: color,
                  name: "",
                  id: "",
              }
          })
        : []

    return (
        <_C4ColorSwatches
            colorsData={colorsArray}
            radioName={props.radioName}
            className={sizeToUtility(props.size)}
        />
    )
}

addPropertyControls(C4ColorSwatches, {
    radioName: {
        type: ControlType.String,
        defaultValue: "color",
    },
    colors: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.Color,
        },
        defaultValue: ["#215cca", "#158466", "#d9118f", "#f27041", "#485968"],
    },
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
})
