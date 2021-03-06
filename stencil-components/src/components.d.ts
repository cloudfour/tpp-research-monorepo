/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface C4Button {
        "buttonClass"?: "secondary" | "tertiary" | "right" | "left";
        "disabled": boolean;
        "href": string;
        "tag": string;
        "type": string;
    }
    interface C4ColorSwatches {
        "callback"?: Function;
        "colorsData"?: Array<any>;
        "colorsString"?: string;
        "radioName": string;
    }
    interface C4Columns {
        "hasGutter": boolean;
    }
    interface C4Container {
        "isDark": boolean;
        "isProse": boolean;
        "isStaggered": boolean;
        "isTall": boolean;
        "tag": string;
    }
    interface C4DetailsLockup {
    }
    interface C4Heading {
        "tag": string;
    }
    interface C4ProductIllustration {
        "altText": string;
        "aspectRatio": number;
        "color": string;
        "imgPath": string;
    }
    interface C4RadioButtons {
        "callback"?: Function;
        "optionsData"?: Array<any>;
        "optionsString"?: string;
        "radioName": string;
    }
    interface C4StarRating {
        "getRating": () => Promise<number>;
        "guid": string;
        "rating": number;
        "reviewsCount"?: number;
        "reviewsLink"?: string;
    }
    interface C4Stepper {
        "max"?: number;
        "min"?: number;
        "startValue"?: number;
    }
    interface C4Text {
    }
}
declare global {
    interface HTMLC4ButtonElement extends Components.C4Button, HTMLStencilElement {
    }
    var HTMLC4ButtonElement: {
        prototype: HTMLC4ButtonElement;
        new (): HTMLC4ButtonElement;
    };
    interface HTMLC4ColorSwatchesElement extends Components.C4ColorSwatches, HTMLStencilElement {
    }
    var HTMLC4ColorSwatchesElement: {
        prototype: HTMLC4ColorSwatchesElement;
        new (): HTMLC4ColorSwatchesElement;
    };
    interface HTMLC4ColumnsElement extends Components.C4Columns, HTMLStencilElement {
    }
    var HTMLC4ColumnsElement: {
        prototype: HTMLC4ColumnsElement;
        new (): HTMLC4ColumnsElement;
    };
    interface HTMLC4ContainerElement extends Components.C4Container, HTMLStencilElement {
    }
    var HTMLC4ContainerElement: {
        prototype: HTMLC4ContainerElement;
        new (): HTMLC4ContainerElement;
    };
    interface HTMLC4DetailsLockupElement extends Components.C4DetailsLockup, HTMLStencilElement {
    }
    var HTMLC4DetailsLockupElement: {
        prototype: HTMLC4DetailsLockupElement;
        new (): HTMLC4DetailsLockupElement;
    };
    interface HTMLC4HeadingElement extends Components.C4Heading, HTMLStencilElement {
    }
    var HTMLC4HeadingElement: {
        prototype: HTMLC4HeadingElement;
        new (): HTMLC4HeadingElement;
    };
    interface HTMLC4ProductIllustrationElement extends Components.C4ProductIllustration, HTMLStencilElement {
    }
    var HTMLC4ProductIllustrationElement: {
        prototype: HTMLC4ProductIllustrationElement;
        new (): HTMLC4ProductIllustrationElement;
    };
    interface HTMLC4RadioButtonsElement extends Components.C4RadioButtons, HTMLStencilElement {
    }
    var HTMLC4RadioButtonsElement: {
        prototype: HTMLC4RadioButtonsElement;
        new (): HTMLC4RadioButtonsElement;
    };
    interface HTMLC4StarRatingElement extends Components.C4StarRating, HTMLStencilElement {
    }
    var HTMLC4StarRatingElement: {
        prototype: HTMLC4StarRatingElement;
        new (): HTMLC4StarRatingElement;
    };
    interface HTMLC4StepperElement extends Components.C4Stepper, HTMLStencilElement {
    }
    var HTMLC4StepperElement: {
        prototype: HTMLC4StepperElement;
        new (): HTMLC4StepperElement;
    };
    interface HTMLC4TextElement extends Components.C4Text, HTMLStencilElement {
    }
    var HTMLC4TextElement: {
        prototype: HTMLC4TextElement;
        new (): HTMLC4TextElement;
    };
    interface HTMLElementTagNameMap {
        "c4-button": HTMLC4ButtonElement;
        "c4-color-swatches": HTMLC4ColorSwatchesElement;
        "c4-columns": HTMLC4ColumnsElement;
        "c4-container": HTMLC4ContainerElement;
        "c4-details-lockup": HTMLC4DetailsLockupElement;
        "c4-heading": HTMLC4HeadingElement;
        "c4-product-illustration": HTMLC4ProductIllustrationElement;
        "c4-radio-buttons": HTMLC4RadioButtonsElement;
        "c4-star-rating": HTMLC4StarRatingElement;
        "c4-stepper": HTMLC4StepperElement;
        "c4-text": HTMLC4TextElement;
    }
}
declare namespace LocalJSX {
    interface C4Button {
        "buttonClass"?: "secondary" | "tertiary" | "right" | "left";
        "disabled"?: boolean;
        "href"?: string;
        "tag"?: string;
        "type"?: string;
    }
    interface C4ColorSwatches {
        "callback"?: Function;
        "colorsData"?: Array<any>;
        "colorsString"?: string;
        "onColorChanged"?: (event: CustomEvent<any>) => void;
        "radioName"?: string;
    }
    interface C4Columns {
        "hasGutter"?: boolean;
    }
    interface C4Container {
        "isDark"?: boolean;
        "isProse"?: boolean;
        "isStaggered"?: boolean;
        "isTall"?: boolean;
        "tag"?: string;
    }
    interface C4DetailsLockup {
    }
    interface C4Heading {
        "tag"?: string;
    }
    interface C4ProductIllustration {
        "altText"?: string;
        "aspectRatio"?: number;
        "color"?: string;
        "imgPath"?: string;
    }
    interface C4RadioButtons {
        "callback"?: Function;
        "onColorChanged"?: (event: CustomEvent<any>) => void;
        "optionsData"?: Array<any>;
        "optionsString"?: string;
        "radioName"?: string;
    }
    interface C4StarRating {
        "guid"?: string;
        "rating"?: number;
        "reviewsCount"?: number;
        "reviewsLink"?: string;
    }
    interface C4Stepper {
        "max"?: number;
        "min"?: number;
        "startValue"?: number;
    }
    interface C4Text {
    }
    interface IntrinsicElements {
        "c4-button": C4Button;
        "c4-color-swatches": C4ColorSwatches;
        "c4-columns": C4Columns;
        "c4-container": C4Container;
        "c4-details-lockup": C4DetailsLockup;
        "c4-heading": C4Heading;
        "c4-product-illustration": C4ProductIllustration;
        "c4-radio-buttons": C4RadioButtons;
        "c4-star-rating": C4StarRating;
        "c4-stepper": C4Stepper;
        "c4-text": C4Text;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "c4-button": LocalJSX.C4Button & JSXBase.HTMLAttributes<HTMLC4ButtonElement>;
            "c4-color-swatches": LocalJSX.C4ColorSwatches & JSXBase.HTMLAttributes<HTMLC4ColorSwatchesElement>;
            "c4-columns": LocalJSX.C4Columns & JSXBase.HTMLAttributes<HTMLC4ColumnsElement>;
            "c4-container": LocalJSX.C4Container & JSXBase.HTMLAttributes<HTMLC4ContainerElement>;
            "c4-details-lockup": LocalJSX.C4DetailsLockup & JSXBase.HTMLAttributes<HTMLC4DetailsLockupElement>;
            "c4-heading": LocalJSX.C4Heading & JSXBase.HTMLAttributes<HTMLC4HeadingElement>;
            "c4-product-illustration": LocalJSX.C4ProductIllustration & JSXBase.HTMLAttributes<HTMLC4ProductIllustrationElement>;
            "c4-radio-buttons": LocalJSX.C4RadioButtons & JSXBase.HTMLAttributes<HTMLC4RadioButtonsElement>;
            "c4-star-rating": LocalJSX.C4StarRating & JSXBase.HTMLAttributes<HTMLC4StarRatingElement>;
            "c4-stepper": LocalJSX.C4Stepper & JSXBase.HTMLAttributes<HTMLC4StepperElement>;
            "c4-text": LocalJSX.C4Text & JSXBase.HTMLAttributes<HTMLC4TextElement>;
        }
    }
}
