import { NgModule } from "@angular/core";
import { defineCustomElements } from "../../../stencil-components/loader";

// import { DemoComponent } from "./directives/proxies";

defineCustomElements(window);

// const DECLARATIONS = [
//   // DemoComponent
// ];

@NgModule({
  // declarations: DECLARATIONS,
  // exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class ComponentLibraryModule {}
