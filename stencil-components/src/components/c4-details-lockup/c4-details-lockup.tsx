import { Component, h } from "@stencil/core";

@Component({
  tag: "c4-details-lockup",
  styleUrl: "c4-details-lockup.css"
})
export class C4DetailsLockup {
  render() {
    return (
      <div class="c4-lockup">
        <div class="c4-lockup__header">
          <slot name="header"></slot>
        </div>

        <div class="c4-lockup__content">
          <slot name="content"></slot>
        </div>

        <div class="c4-lockup__footer">
          <slot name="footer"></slot>
        </div>
      </div>
    );
  }
}
