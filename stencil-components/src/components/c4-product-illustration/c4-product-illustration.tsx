import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "c4-product-illustration",
  styleUrl: "c4-product-illustration.css"
})
export class C4ProductIllustration {
  @Prop() color: string = "#215CCA";
  @Prop() altText: string;
  @Prop() imgPath: string;
  @Prop() aspectRatio: number;

  render() {
    const illustrationStyles = this.aspectRatio
      ? { "--aspect-ratio": `${this.aspectRatio}%` }
      : null;

    const contentStyles = { "--illustration-color": this.color };

    const altTextErrorMessage = this.altText
      ? ""
      : "ERROR: Please provide alt text for this product illustration!";

    return (
      <div class="c4-product-illustration" style={illustrationStyles}>
        <div class="c4-product-illustration__content" style={contentStyles}>
          {altTextErrorMessage}

          <img src={this.imgPath} alt={this.altText} class="c4-product-illustration__img"></img>
        </div>
      </div>
    );
  }
}
