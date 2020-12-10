import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "c4-text",
  styleUrl: "c4-text.css"
})
export class C4Text {
  render() {
    return (
      <Host class="c4-text">
        <slot></slot>
      </Host>
    );
  }
}
