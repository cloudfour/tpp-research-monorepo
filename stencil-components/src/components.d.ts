/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface C4Button {
        "buttonClass": string;
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
    interface C4Container {
        "containerClass": string;
        "contentClass": string;
        "tag": string;
    }
    interface C4Heading {
        "tag": string;
    }
    interface C4RadioButtons {
        "callback"?: Function;
        "optionsData"?: Array<any>;
        "optionsString"?: string;
        "radioName": string;
    }
    interface C4StarRating {
        "guid": string;
        "rating": number;
    }
    interface C4Stepper {
        "max"?: number;
        "min"?: number;
        "startValue"?: number;
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
    interface HTMLC4ContainerElement extends Components.C4Container, HTMLStencilElement {
    }
    var HTMLC4ContainerElement: {
        prototype: HTMLC4ContainerElement;
        new (): HTMLC4ContainerElement;
    };
    interface HTMLC4HeadingElement extends Components.C4Heading, HTMLStencilElement {
    }
    var HTMLC4HeadingElement: {
        prototype: HTMLC4HeadingElement;
        new (): HTMLC4HeadingElement;
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
    interface HTMLElementTagNameMap {
        "c4-button": HTMLC4ButtonElement;
        "c4-color-swatches": HTMLC4ColorSwatchesElement;
        "c4-container": HTMLC4ContainerElement;
        "c4-heading": HTMLC4HeadingElement;
        "c4-radio-buttons": HTMLC4RadioButtonsElement;
        "c4-star-rating": HTMLC4StarRatingElement;
        "c4-stepper": HTMLC4StepperElement;
    }
}
declare namespace LocalJSX {
    interface C4Button {
        "buttonClass"?: string;
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
    interface C4Container {
        "containerClass"?: string;
        "contentClass"?: string;
        "tag"?: string;
    }
    interface C4Heading {
        "tag"?: string;
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
    }
    interface C4Stepper {
        "max"?: number;
        "min"?: number;
        "startValue"?: number;
    }
    interface IntrinsicElements {
        "c4-button": C4Button;
        "c4-color-swatches": C4ColorSwatches;
        "c4-container": C4Container;
        "c4-heading": C4Heading;
        "c4-radio-buttons": C4RadioButtons;
        "c4-star-rating": C4StarRating;
        "c4-stepper": C4Stepper;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "c4-button": LocalJSX.C4Button & JSXBase.HTMLAttributes<HTMLC4ButtonElement>;
            "c4-color-swatches": LocalJSX.C4ColorSwatches & JSXBase.HTMLAttributes<HTMLC4ColorSwatchesElement>;
            "c4-container": LocalJSX.C4Container & JSXBase.HTMLAttributes<HTMLC4ContainerElement>;
            "c4-heading": LocalJSX.C4Heading & JSXBase.HTMLAttributes<HTMLC4HeadingElement>;
            "c4-radio-buttons": LocalJSX.C4RadioButtons & JSXBase.HTMLAttributes<HTMLC4RadioButtonsElement>;
            "c4-star-rating": LocalJSX.C4StarRating & JSXBase.HTMLAttributes<HTMLC4StarRatingElement>;
            "c4-stepper": LocalJSX.C4Stepper & JSXBase.HTMLAttributes<HTMLC4StepperElement>;
        }
    }
}
