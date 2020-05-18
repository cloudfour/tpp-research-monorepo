import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "c4-product-illustration",
  styleUrl: "c4-product-illustration.css",
  shadow: true,
})
export class C4ProductIllustration {
  @Prop() color: string = "#215CCA";

  render() {
    var styles = { "--illustration-color": this.color };

    return (
      <div style={styles}>
        <slot />
      </div>
    );
  }
}
