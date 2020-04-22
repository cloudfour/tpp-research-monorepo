import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "c4-star-rating",
  styleUrl: "c4-star-rating.css",
  shadow: true,
})
export class C4Container {
  @Prop() rating: number;
  @Prop() guid: string;

  render() {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      let svgClass = "";
      let gradient = "";
      let gradientId = "";

      const remainingStars = this.rating - i;

      if (remainingStars >= 1) {
        svgClass = "full";
      } else if (remainingStars > 0) {
        const remainingPercent = remainingStars * 100;
        gradientId = `star-gradient-${this.guid}`;
        gradient = (
          <defs>
            <linearGradient id={gradientId}>
              <stop
                offset={`${remainingPercent}%`}
                stop-color="var(--color-star-full)"
              />
              <stop
                offset={`${remainingPercent}%`}
                stop-color="var(--color-star-empty)"
              />
            </linearGradient>
          </defs>
        );
      } else {
        svgClass = "empty";
      }

      stars.push(
        <svg viewBox="0 0 60 60" class={svgClass}>
          {gradient}
          <path
            fill={`url(#${gradientId})`}
            d="M47 57.5c-.2 0-.5-.1-.7-.2l-16.1-8.5L14 57.4c-.5.3-1.1.2-1.6-.1-.5-.3-.7-.9-.6-1.4l3.1-18-13-12.8c-.4-.4-.5-1-.4-1.5.2-.5.6-.9 1.2-1l18-2.6 8.1-16.3c.5-1 2.2-1 2.7 0l8 16.3 18 2.6c.6.1 1 .5 1.2 1 .2.5 0 1.1-.4 1.5l-13 12.7 3.1 18c.1.6-.1 1.1-.6 1.4-.2.2-.5.3-.8.3z"
          />
        </svg>
      );
    }

    return <div>{stars}</div>;
  }
}
