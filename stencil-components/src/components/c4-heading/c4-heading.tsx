import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-heading",
  styleUrl: "c4-heading.css",
  shadow: true,
})
export class MyComponent {
  @Prop() tag: string = "h1";

  render() {
    return (
      <this.tag>
        <slot />
      </this.tag>
    );
  }
}
