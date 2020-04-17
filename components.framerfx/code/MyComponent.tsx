import * as React from "react"
import { ControlType, addPropertyControls } from "framer"
import { MyComponent as _MyComponent } from "../../react-components/dist"

export const MyComponent = (props: any) => (
    <_MyComponent {...props}>{props.slot}</_MyComponent>
)

addPropertyControls(MyComponent, {
    first: {
        type: ControlType.String,
        defaultValue: "Paul",
    },
})
