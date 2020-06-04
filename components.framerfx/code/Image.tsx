import * as React from "react"
import { Frame, addPropertyControls, ControlType } from "framer"

// Open Preview: Command + P
// Learn more: https://framer.com/api

export function Image(props) {
    const styles = {
        width: "100%",
        heeight: "auto",
    }

    return <img src={props.image} style={styles} />
}

// Learn more: https://framer.com/api/property-controls/
addPropertyControls(Image, {
    image: {
        title: "Image",
        type: ControlType.Image,
    },
})
