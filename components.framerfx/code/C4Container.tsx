import * as React from "react"
import { ControlType, addPropertyControls, Stack } from "framer"
import { C4Container as _C4Container } from "../../react-components/dist"

export const C4Container = (props: any) => (
    <_C4Container {...props}>
        <Stack alignment="start" width="100%" gap={0}>
            {props.slot}
        </Stack>
    </_C4Container>
)

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
    containerClass: {
        type: ControlType.String,
        defaultValue: "",
    },
})
