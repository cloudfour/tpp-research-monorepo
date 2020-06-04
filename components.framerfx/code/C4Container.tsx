import * as React from "react"
import { ControlType, addPropertyControls, Stack, Frame } from "framer"
import { C4Container as _C4Container } from "../../react-components/dist"

export const C4Container = (props: any) => {
    const background = props.isDark ? "#215cca" : "#fff"

    const frameStyles = {
        backgroundColor: background,
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        position: "absolute" as "absolute",
    }

    return (
        <_C4Container {...props} style={frameStyles}>
            <Stack alignment="start" width="100%" height="100%" gap={16}>
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
    isProse: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    isDark: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
    isTall: {
        type: ControlType.Boolean,
        defaultValue: false,
    },
})
