import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "c4-product-illustration",
  styleUrl: "c4-product-illustration.css",
  shadow: true,
})
export class C4ProductIllustration {
  @Prop() color: string = "#215CCA";
  @Prop() altText: string;
  @Prop() reference: string;

  render() {
    const styles = { "--illustration-color": this.color };

    const altTextErrorMessage = this.altText
      ? ""
      : "ERROR: Please provide alt text for this product illustration!";

    return (
      <div style={styles}>
        {altTextErrorMessage}

        <svg
          height="500"
          width="500"
          viewBox="0 0 500 500"
          aria-labelledby="product-title"
        >
          <title id="product-title">{this.altText}</title>
          <use href={this.reference}></use>
        </svg>
      </div>
    );
  }
}
