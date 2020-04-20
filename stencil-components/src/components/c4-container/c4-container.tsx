import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-container",
  styleUrl: "c4-container.css",
  shadow: true,
})
export class C4Container {
  @Prop() tag: string = "div";
  @Prop() containerClass: string;
  @Prop() contentClass: string;

  private getClass(): string {
    let className = "container";

    if (this.containerClass) {
      className += ` ${this.containerClass}`;
    }

    return className;
  }

  render() {
    return (
      <this.tag class={this.getClass()}>
        <div class={this.contentClass}>
          <slot />
        </div>
      </this.tag>
    );
  }
}
