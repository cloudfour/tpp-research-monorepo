import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4RadioButtons as _C4RadioButtons } from "../../react-components/dist"
import { sizeSelectorPresets, sizeToUtility } from "./Utilities"

export const C4RadioButtons = (props: any) => {
    const optionsArray = props.options
        ? props.options.map(name => {
              return {
                  name: name,
                  id: "xxx",
              }
          })
        : []

    return (
        <_C4RadioButtons
            optionsData={optionsArray}
            // We randomize the radio name so if this is used in multiple designs it's unique each time.
            // This ensures the first option is checked.
            radioName={props.radioName + Math.random().toString()}
            className={sizeToUtility(props.size)}
        />
    )
}

addPropertyControls(C4RadioButtons, {
    radioName: {
        type: ControlType.String,
        defaultValue: "sizes",
    },
    options: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
        },
        defaultValue: ["S", "M", "L", "XL"],
    },
    size: {
        type: ControlType.Number,
        ...sizeSelectorPresets,
    },
})
