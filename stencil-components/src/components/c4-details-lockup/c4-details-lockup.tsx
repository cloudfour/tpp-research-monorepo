import { Component, h } from "@stencil/core";

@Component({
  tag: "c4-details-lockup",
  styleUrl: "c4-details-lockup.css",
  shadow: true,
})
export class C4DetailsLockup {
  render() {
    return (
      <div class="lockup">
        <div class="header">
          <slot name="header"></slot>
        </div>

        <div class="content">
          <slot name="content"></slot>
        </div>

        <div class="footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
