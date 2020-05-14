import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-container",
  styleUrl: "c4-container.css",
  shadow: true,
})
export class C4Container {
  @Prop() tag: string = "div";
  @Prop() isProse: boolean;
  @Prop() isDark: boolean;
  @Prop() isTall: boolean;

  private getContainerClass(): string {
    let className = "container";

    if (this.isDark) {
      className += ` dark`;
    }

    return className;
  }

  private getContentClass(): string {
    let className = "";

    if (this.isProse) {
      className += ` prose`;
    }

    if (this.isTall) {
      className += ` tall`;
    }

    return className;
  }

  render() {
    return (
      <this.tag class={this.getContainerClass()}>
        <div class={this.getContentClass()}>
          <slot />
        </div>
      </this.tag>
    );
  }
}
