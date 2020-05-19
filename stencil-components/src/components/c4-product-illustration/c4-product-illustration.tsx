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
        <svg height="500" width="500" viewBox="0 0 500 500">
          <use href="/assets/illustrations/socks.svg#socks"></use>
        </svg>
      </div>
    );
  }
}
