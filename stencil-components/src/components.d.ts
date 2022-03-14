/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CfourButton {
        "buttonClass"?: "secondary" | "tertiary" | "right" | "left";
        "disabled": boolean;
        "href": string;
        "tag": string;
        "type": string;
    }
    interface CfourColorSwatches {
        "callback"?: Function;
        "colorsData"?: Array<any>;
        "colorsString"?: string;
        "radioName": string;
    }
    interface CfourColumns {
        "hasGutter": boolean;
    }
    interface CfourContainer {
        "isDark": boolean;
        "isProse": boolean;
        "isStaggered": boolean;
        "isTall": boolean;
        "tag": string;
    }
    interface CfourDetailsLockup {
    }
    interface CfourHeading {
        "tag": string;
    }
    interface CfourProductIllustration {
        "altText": string;
        "aspectRatio": number;
        "color": string;
        "imgPath": string;
    }
    interface CfourRadioButtons {
        "callback"?: Function;
        "optionsData"?: Array<any>;
        "optionsString"?: string;
        "radioName": string;
    }
    interface CfourStarRating {
        "getRating": () => Promise<number>;
        "guid": string;
        "rating": number;
        "reviewsCount"?: number;
        "reviewsLink"?: string;
    }
    interface CfourStepper {
        "max"?: number;
        "min"?: number;
        "startValue"?: number;
    }
    interface CfourText {
    }
}
declare global {
    interface HTMLCfourButtonElement extends Components.CfourButton, HTMLStencilElement {
    }
    var HTMLCfourButtonElement: {
        prototype: HTMLCfourButtonElement;
        new (): HTMLCfourButtonElement;
    };
    interface HTMLCfourColorSwatchesElement extends Components.CfourColorSwatches, HTMLStencilElement {
    }
    var HTMLCfourColorSwatchesElement: {
        prototype: HTMLCfourColorSwatchesElement;
        new (): HTMLCfourColorSwatchesElement;
    };
    interface HTMLCfourColumnsElement extends Components.CfourColumns, HTMLStencilElement {
    }
    var HTMLCfourColumnsElement: {
        prototype: HTMLCfourColumnsElement;
        new (): HTMLCfourColumnsElement;
    };
    interface HTMLCfourContainerElement extends Components.CfourContainer, HTMLStencilElement {
    }
    var HTMLCfourContainerElement: {
        prototype: HTMLCfourContainerElement;
        new (): HTMLCfourContainerElement;
    };
    interface HTMLCfourDetailsLockupElement extends Components.CfourDetailsLockup, HTMLStencilElement {
    }
    var HTMLCfourDetailsLockupElement: {
        prototype: HTMLCfourDetailsLockupElement;
        new (): HTMLCfourDetailsLockupElement;
    };
    interface HTMLCfourHeadingElement extends Components.CfourHeading, HTMLStencilElement {
    }
    var HTMLCfourHeadingElement: {
        prototype: HTMLCfourHeadingElement;
        new (): HTMLCfourHeadingElement;
    };
    interface HTMLCfourProductIllustrationElement extends Components.CfourProductIllustration, HTMLStencilElement {
    }
    var HTMLCfourProductIllustrationElement: {
        prototype: HTMLCfourProductIllustrationElement;
        new (): HTMLCfourProductIllustrationElement;
    };
    interface HTMLCfourRadioButtonsElement extends Components.CfourRadioButtons, HTMLStencilElement {
    }
    var HTMLCfourRadioButtonsElement: {
        prototype: HTMLCfourRadioButtonsElement;
        new (): HTMLCfourRadioButtonsElement;
    };
    interface HTMLCfourStarRatingElement extends Components.CfourStarRating, HTMLStencilElement {
    }
    var HTMLCfourStarRatingElement: {
        prototype: HTMLCfourStarRatingElement;
        new (): HTMLCfourStarRatingElement;
    };
    interface HTMLCfourStepperElement extends Components.CfourStepper, HTMLStencilElement {
    }
    var HTMLCfourStepperElement: {
        prototype: HTMLCfourStepperElement;
        new (): HTMLCfourStepperElement;
    };
    interface HTMLCfourTextElement extends Components.CfourText, HTMLStencilElement {
    }
    var HTMLCfourTextElement: {
        prototype: HTMLCfourTextElement;
        new (): HTMLCfourTextElement;
    };
    interface HTMLElementTagNameMap {
        "cfour-button": HTMLCfourButtonElement;
        "cfour-color-swatches": HTMLCfourColorSwatchesElement;
        "cfour-columns": HTMLCfourColumnsElement;
        "cfour-container": HTMLCfourContainerElement;
        "cfour-details-lockup": HTMLCfourDetailsLockupElement;
        "cfour-heading": HTMLCfourHeadingElement;
        "cfour-product-illustration": HTMLCfourProductIllustrationElement;
        "cfour-radio-buttons": HTMLCfourRadioButtonsElement;
        "cfour-star-rating": HTMLCfourStarRatingElement;
        "cfour-stepper": HTMLCfourStepperElement;
        "cfour-text": HTMLCfourTextElement;
    }
}
declare namespace LocalJSX {
    interface CfourButton {
        "buttonClass"?: "secondary" | "tertiary" | "right" | "left";
        "disabled"?: boolean;
        "href"?: string;
        "tag"?: string;
        "type"?: string;
    }
    interface CfourColorSwatches {
        "callback"?: Function;
        "colorsData"?: Array<any>;
        "colorsString"?: string;
        "onColorChanged"?: (event: CustomEvent<any>) => void;
        "radioName"?: string;
    }
    interface CfourColumns {
        "hasGutter"?: boolean;
    }
    interface CfourContainer {
        "isDark"?: boolean;
        "isProse"?: boolean;
        "isStaggered"?: boolean;
        "isTall"?: boolean;
        "tag"?: string;
    }
    interface CfourDetailsLockup {
    }
    interface CfourHeading {
        "tag"?: string;
    }
    interface CfourProductIllustration {
        "altText"?: string;
        "aspectRatio"?: number;
        "color"?: string;
        "imgPath"?: string;
    }
    interface CfourRadioButtons {
        "callback"?: Function;
        "onColorChanged"?: (event: CustomEvent<any>) => void;
        "optionsData"?: Array<any>;
        "optionsString"?: string;
        "radioName"?: string;
    }
    interface CfourStarRating {
        "guid"?: string;
        "rating"?: number;
        "reviewsCount"?: number;
        "reviewsLink"?: string;
    }
    interface CfourStepper {
        "max"?: number;
        "min"?: number;
        "startValue"?: number;
    }
    interface CfourText {
    }
    interface IntrinsicElements {
        "cfour-button": CfourButton;
        "cfour-color-swatches": CfourColorSwatches;
        "cfour-columns": CfourColumns;
        "cfour-container": CfourContainer;
        "cfour-details-lockup": CfourDetailsLockup;
        "cfour-heading": CfourHeading;
        "cfour-product-illustration": CfourProductIllustration;
        "cfour-radio-buttons": CfourRadioButtons;
        "cfour-star-rating": CfourStarRating;
        "cfour-stepper": CfourStepper;
        "cfour-text": CfourText;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "cfour-button": LocalJSX.CfourButton & JSXBase.HTMLAttributes<HTMLCfourButtonElement>;
            "cfour-color-swatches": LocalJSX.CfourColorSwatches & JSXBase.HTMLAttributes<HTMLCfourColorSwatchesElement>;
            "cfour-columns": LocalJSX.CfourColumns & JSXBase.HTMLAttributes<HTMLCfourColumnsElement>;
            "cfour-container": LocalJSX.CfourContainer & JSXBase.HTMLAttributes<HTMLCfourContainerElement>;
            "cfour-details-lockup": LocalJSX.CfourDetailsLockup & JSXBase.HTMLAttributes<HTMLCfourDetailsLockupElement>;
            "cfour-heading": LocalJSX.CfourHeading & JSXBase.HTMLAttributes<HTMLCfourHeadingElement>;
            "cfour-product-illustration": LocalJSX.CfourProductIllustration & JSXBase.HTMLAttributes<HTMLCfourProductIllustrationElement>;
            "cfour-radio-buttons": LocalJSX.CfourRadioButtons & JSXBase.HTMLAttributes<HTMLCfourRadioButtonsElement>;
            "cfour-star-rating": LocalJSX.CfourStarRating & JSXBase.HTMLAttributes<HTMLCfourStarRatingElement>;
            "cfour-stepper": LocalJSX.CfourStepper & JSXBase.HTMLAttributes<HTMLCfourStepperElement>;
            "cfour-text": LocalJSX.CfourText & JSXBase.HTMLAttributes<HTMLCfourTextElement>;
        }
    }
}
