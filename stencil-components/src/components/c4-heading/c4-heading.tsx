import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-heading",
  styleUrl: "c4-heading.css"
})
export class C4Heading {
  @Prop() tag: string = "h1";

  render() {
    return (
      <this.tag className={`c4-heading c4-heading--${this.tag}`}>
        <slot />
      </this.tag>
    );
  }
}
