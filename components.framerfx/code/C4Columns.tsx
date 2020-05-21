import * as React from "react"
import { ControlType, addPropertyControls, Stack, Frame } from "framer"
import { C4Columns as _C4Columns } from "../../react-components/dist"

export const C4Columns = (props: any) => {
    return (
        <_C4Columns {...props}>
            <Stack alignment="start" direction="horizontal">
                {props.slot}
            </Stack>
        </_C4Columns>
    )
}

addPropertyControls(C4Columns, {
    slot: {
        type: ControlType.Array,
        propertyControl: {
            type: ControlType.ComponentInstance,
        },
    },
})
