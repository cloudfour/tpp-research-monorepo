/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from "@angular/core";
import { defineCustomElements } from "c4-stencil-components/loader";
import { C4Button, C4ColorSwatches, C4Container, C4Heading, C4StarRating } from "./components";
defineCustomElements(window);
/** @type {?} */
var DECLARATIONS = [
    C4Button, C4ColorSwatches, C4Container, C4Heading, C4StarRating
];
var ComponentLibraryModule = /** @class */ (function () {
    function ComponentLibraryModule() {
    }
    ComponentLibraryModule.decorators = [
        { type: NgModule, args: [{
                    declarations: DECLARATIONS,
                    exports: DECLARATIONS,
                    imports: [],
                    providers: []
                },] },
    ];
    return ComponentLibraryModule;
}());
export { ComponentLibraryModule };
