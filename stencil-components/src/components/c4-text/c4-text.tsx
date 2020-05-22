import { Component, Host, h } from "@stencil/core";

@Component({
  tag: "c4-text",
  styleUrl: "c4-text.css",
  shadow: true,
})
export class C4Text {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
