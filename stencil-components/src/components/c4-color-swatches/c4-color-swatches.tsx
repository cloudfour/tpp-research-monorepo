import { Component, Prop, h, Event, EventEmitter } from "@stencil/core";
// TODO: Emit events on change

interface Color {
  name: string;
  hex: string;
  id: string;
}

@Component({
  tag: "c4-color-swatches",
  styleUrl: "c4-color-swatches.css",
  shadow: true,
})
export class C4ColorSwatches {
  @Prop() colors: string;
  @Event() colorChanged: EventEmitter;

  changeHandler(color: Color) {
    return this.colorChanged.emit(color);
  }

  private parsedColors(): Array<Color> {
    return JSON.parse(this.colors);
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
            <div class="swatch">
              <input
                type="radio"
                id={color.id}
                name="color"
                value={color.id}
                style={styles}
                checked={checked}
                onClick={() => this.changeHandler(color)}
              />
              <label htmlFor={color.id} class="screen-reader-label">
                {color.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
