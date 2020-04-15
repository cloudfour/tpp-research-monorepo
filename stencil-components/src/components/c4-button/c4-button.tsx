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
  @Prop() buttonClass: string;

  private getClass(): string {
    let className = "button";

    if (this.buttonClass) {
      className += ` ${this.buttonClass}`;
    }

    return className;
  }

  render() {
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
