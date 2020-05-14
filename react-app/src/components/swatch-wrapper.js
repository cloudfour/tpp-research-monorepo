import React from "react";
import { C4Heading, C4ColorSwatches } from "../../../react-components";

export class SwatchWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      color: props.colorsData[0],
    };
  }

  updateColor(color) {
    this.setState({ color });
  }

  render() {
    return (
      <div>
        <C4Heading tag="h2">Color Swatches</C4Heading>

        <p>
          Selected Color:&nbsp;
          <em>{this.state.color.name}</em>
        </p>

        <C4ColorSwatches
          callback={this.updateColor.bind(this)}
          colorsData={this.props.colorsData}
          radioName={this.props.radioName}
        ></C4ColorSwatches>
      </div>
    );
  }
}
