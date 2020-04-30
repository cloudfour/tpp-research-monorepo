import { NgModule } from "@angular/core";
import { defineCustomElements } from "../../stencil-components/loader";

import { C4Button, C4ColorSwatches, C4Container, C4Heading, C4StarRating } from "./components";

defineCustomElements(window);

const DECLARATIONS = [
  C4Button, C4ColorSwatches, C4Container, C4Heading, C4StarRating
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: []
})
export class ComponentLibraryModule {}
