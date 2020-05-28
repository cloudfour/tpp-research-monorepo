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
         {/*
          // The current production version (1.12) of Stencil does not have
          // support for `href` on `use` elements.
          //
          // This has been added in the prerelease version (1.14.0-3) but I'd
          // rather stay on a stable version and ignore this error.
          //
          // @ts-ignore */}
          <use href={`${this.reference}#illustration`}></use>
        </svg>
      </div>
    );
  }
}
