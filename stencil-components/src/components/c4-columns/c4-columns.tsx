import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'cfour-columns',
  styleUrl: 'c4-columns.css',
})
export class C4Columns {
  @Prop() hasGutter: boolean;

  render() {
    return (
      <div
        class={
          this.hasGutter ? 'c4-columns c4-columns--with-gutter' : 'c4-columns'
        }
      >
        <slot></slot>
      </div>
    );
  }
}
