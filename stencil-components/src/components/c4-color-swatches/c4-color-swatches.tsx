import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";

interface Color {
  name: string;
  hex: string;
  id: string;
}

@Component({
  tag: "c4-color-swatches",
  styleUrl: "c4-color-swatches.css"
})
export class C4ColorSwatches {
  @Prop() colorsString?: string;
  // TODO: Why can't I set this to Color?
  @Prop() colorsData?: Array<any> = null;
  @Event() colorChanged: EventEmitter;
  @Prop() callback?: Function = null;
  @Prop() radioName: string;

  private changeHandler(color: Color) {
    if (this.callback !== null) {
      this.callback(color);
    }
    return this.colorChanged.emit(color);
  }

  private parsedColors(): Array<Color> {
    if (this.colorsData !== null) {
      return this.colorsData;
    }

    return JSON.parse(this.colorsString);
  }

  render() {
    return (
      <div class="swatches">
        {this.parsedColors().map((color, index) => {
          const styles = {
            background: color.hex,
          };

          const checked = index === 0;

          return (
            <div class="swatches__swatch">
              <input
                class="swatches__input"
                type="radio"
                id={color.id}
                name={this.radioName}
                value={color.id}
                style={styles}
                checked={checked}
                onClick={() => this.changeHandler(color)}
              />
              <label class="swatches__label" htmlFor={color.id}>
                {color.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
