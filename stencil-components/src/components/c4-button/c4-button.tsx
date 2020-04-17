import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-button",
  styleUrl: "c4-button.css",
  shadow: true,
})
export class MyComponent {
  @Prop() disabled: boolean = false;
  @Prop() type: string = "button";
  @Prop() tag: string = "button";
  @Prop() href: string = "#";
  @Prop() text: string;
  @Prop() buttonClass: string;

  private getClass(): string {
    let className = "button";

    if (this.buttonClass) {
      className += ` ${this.buttonClass}`;
    }

    return className;
  }

  render() {
    if (this.tag === "a") {
      return (
        <a href={this.href} class={this.getClass()}>
          <slot />
        </a>
      );
    } else {
      return (
        <this.tag
          disabled={this.disabled}
          class={this.getClass()}
          type={this.type}
        >
          <slot />
        </this.tag>
      );
    }
  }
}
