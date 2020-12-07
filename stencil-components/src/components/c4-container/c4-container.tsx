import { Component, Prop, h } from "@stencil/core";

@Component({
  tag: "c4-container",
  styleUrl: "c4-container.css"
})
export class C4Container {
  @Prop() tag: string = "div";
  @Prop() isProse: boolean;
  @Prop() isDark: boolean;
  @Prop() isTall: boolean;

  private getContainerClass(): string {
    let className = "c4-container";

    if (this.isDark) {
      className += " c4-container--dark";
    }

    if (this.isProse) {
      className += " c4-container--prose";
    }

    if (this.isTall) {
      className += " c4-container--tall";
    }

    return className;
  }

  render() {
    return (
      <this.tag class={this.getContainerClass()}>
        <div class="c4-container__content">
          <slot />
        </div>
      </this.tag>
    );
  }
}
