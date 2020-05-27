import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class ColorPickerComponent extends Component {
  colors = [
    { hex: "#215cca", name: "Cloud Blue", id: "123" },
    { hex: "#158466", name: "PNW Green", id: "124" },
    { hex: "#d9118f", name: "PWA Pink", id: "125" },
    { hex: "#f27041", name: "Cloud Fourange", id: "126" },
    { hex: "#485968", name: "Grey", id: "127" },
  ];

  @tracked currentColor = this.colors[0];

  @action changeColor({ detail }) {
    this.currentColor = detail;
  }
}
