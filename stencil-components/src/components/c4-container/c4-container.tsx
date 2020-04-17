import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-container",
  styleUrl: "c4-container.css",
  shadow: true,
})
export class C4Container {
  @Prop() tag: string = "div";
  @Prop() containerClass: string;

  render() {
    return (
      <this.tag class={this.containerClass}>
        <slot />
      </this.tag>
    );
  }
}
