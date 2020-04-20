import * as React from "react"
import { ControlType, addPropertyControls, Stack, Frame } from "framer"
import { C4Container as _C4Container } from "../../react-components/dist"

export const C4Container = (props: any) => {
    const frameStyles = props.containerClass.includes("dark")
        ? {
              backgroundColor: "#215cca",
              width: "100%",
              height: "100%",
              left: 0,
              top: 0,
              position: "absolute" as "absolute",
          }
        : {}

    return (
        <_C4Container {...props} style={frameStyles}>
            <Stack alignment="start" width="100%" height="100%" gap={0}>
                {props.slot}
            </Stack>
        </_C4Container>
    )
}

addPropertyControls(C4Container, {
    slot: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
    },
    tag: {
        type: ControlType.String,
        defaultValue: "div",
    },
    contentClass: {
        type: ControlType.String,
        defaultValue: "",
    },
    containerClass: {
        type: ControlType.String,
        defaultValue: "",
    },
})
