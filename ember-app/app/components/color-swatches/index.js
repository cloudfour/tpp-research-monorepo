import Component from "@glimmer/component";

export default class ColorSwatchesComponent extends Component {
  colorsString = JSON.stringify(this.args.colors);

  changeColor = this.args.changeColor;
}
