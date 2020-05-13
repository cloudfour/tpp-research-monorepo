import { Component, Host, h, State } from "@stencil/core";

@Component({
  tag: "c4-stepper",
  styleUrl: "c4-stepper.css",
  shadow: true,
})
export class C4Stepper {
  @State() quantity = 1;

  updateCount(newQuantity) {
    const parsedQuantity = parseInt(newQuantity);

    if (Number.isNaN(parsedQuantity) || parsedQuantity < 1) {
      this.quantity = 1;
    } else {
      this.quantity = parsedQuantity;
    }
  }

  render() {
    return (
      <Host>
        <c4-button
          buttonClass="button--left"
          onClick={this.updateCount.bind(this, this.quantity - 1)}
          disabled={this.quantity === 1}
        >
          <span class="button-content">&minus;</span>
        </c4-button>
        <input
          type="number"
          min="0"
          value={this.quantity}
          onChange={(event) =>
            this.updateCount((event.target as HTMLInputElement).value)
          }
        />
        <c4-button
          buttonClass="button--right"
          onClick={this.updateCount.bind(this, this.quantity + 1)}
        >
          <span class="button-content">+</span>
        </c4-button>
      </Host>
    );
  }

  componentDidLoad() {
    console.log("loaded");
  }
}