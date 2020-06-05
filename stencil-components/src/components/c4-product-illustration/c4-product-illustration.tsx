import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "c4-product-illustration",
  styleUrl: "c4-product-illustration.css",
  shadow: true,
})
export class C4ProductIllustration {
  @Prop() color: string = "#215CCA";
  @Prop() altText: string;
  @Prop() imgPath: string;
  @Prop() aspectRatio: number;

  render() {
    const ratioBoxStyles = this.aspectRatio
      ? { "--aspect-ratio": `${this.aspectRatio}%` }
      : null;

    const contentStyles = { "--illustration-color": this.color };

    const altTextErrorMessage = this.altText
      ? ""
      : "ERROR: Please provide alt text for this product illustration!";

    return (
      <div class="ratio-box" style={ratioBoxStyles}>
        <div class="content" style={contentStyles}>
          {altTextErrorMessage}

          <img src={this.imgPath} alt={this.altText}></img>
        </div>
      </div>
    );
  }
}
