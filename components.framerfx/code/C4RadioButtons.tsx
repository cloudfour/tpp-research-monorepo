import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { C4RadioButtons as _C4RadioButtons } from "../../react-components/dist"

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
            radioName={props.radioName}
        />
    )
}

addPropertyControls(C4RadioButtons, {
    radioName: {
        type: ControlType.String,
        defaultValue: "color",
    },
    options: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.String,
        },
    },
})
