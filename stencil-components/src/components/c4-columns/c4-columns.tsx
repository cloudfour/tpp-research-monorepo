import { Component, h, Prop } from "@stencil/core";

@Component({
  tag: "c4-columns",
  styleUrl: "c4-columns.css",
  shadow: true,
})
export class C4Columns {
  @Prop() hasGutter: boolean;

  render() {
    return (
      <div class={this.hasGutter ? "columns columns--with-gutter" : "columns"}>
        <slot></slot>
      </div>
    );
  }
}
