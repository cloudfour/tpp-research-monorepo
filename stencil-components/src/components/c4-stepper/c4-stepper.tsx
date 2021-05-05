import { Component, h, State, Prop } from "@stencil/core";

@Component({
  tag: "c4-stepper",
  styleUrl: "c4-stepper.css"
})
export class C4Stepper {
  @Prop() min?: number = null;
  @Prop() max?: number = null;
  @Prop() startValue?: number = null;
  @State() value: number = this.startValue || this.min || 1;

  updateCount(newValue: string) {
    const parsedValue = parseInt(newValue);

    const notANumber = Number.isNaN(parsedValue);
    const lessThanMin = parsedValue < this.min;
    const moreThanMax = parsedValue > this.max;

    if (notANumber || lessThanMin) {
      this.value = 1;
    } else if (moreThanMax) {
      this.value = this.max;
    } else {
      this.value = parsedValue;
    }
  }

  render() {
    return (
      <div class="c4-stepper">
        {/* Buttons are hidden from screen readers to avoid a confusing
        experience. Since they're likely using a keyboard they can use the
        built-in keyboard controls */}
        <c4-button
          class="c4-stepper__button"
          buttonClass="left"
          onClick={this.updateCount.bind(this, this.value - 1)}
          disabled={this.value === this.min}
          aria-hidden="true"
        >
          <span class="button-content">&minus;</span>
        </c4-button>
        <input
          class="c4-stepper__input"
          type="number"
          {...{ min: this.min, max: this.max }}
          value={this.value}
          onChange={(event) =>
            this.updateCount((event.target as HTMLInputElement).value)
          }
        />
        <c4-button
          class="c4-stepper__button"
          buttonClass="right"
          onClick={this.updateCount.bind(this, this.value + 1)}
          disabled={this.value === this.max}
          aria-hidden="true"
        >
          <span class="button-content">+</span>
        </c4-button>
      </div>
    );
  }
}
