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
        "text": string;
        "type": string;
    }
    interface C4ColorSwatches {
        "colorsData"?: Array<any>;
        "colorsString"?: string;
    }
    interface C4Container {
        "containerClass": string;
        "contentClass": string;
        "tag": string;
    }
    interface C4Heading {
        "tag": string;
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
    interface HTMLElementTagNameMap {
        "c4-button": HTMLC4ButtonElement;
        "c4-color-swatches": HTMLC4ColorSwatchesElement;
        "c4-container": HTMLC4ContainerElement;
        "c4-heading": HTMLC4HeadingElement;
    }
}
declare namespace LocalJSX {
    interface C4Button {
        "buttonClass"?: string;
        "disabled"?: boolean;
        "href"?: string;
        "tag"?: string;
        "text"?: string;
        "type"?: string;
    }
    interface C4ColorSwatches {
        "colorsData"?: Array<any>;
        "colorsString"?: string;
        "onColorChanged"?: (event: CustomEvent<any>) => void;
    }
    interface C4Container {
        "containerClass"?: string;
        "contentClass"?: string;
        "tag"?: string;
    }
    interface C4Heading {
        "tag"?: string;
    }
    interface IntrinsicElements {
        "c4-button": C4Button;
        "c4-color-swatches": C4ColorSwatches;
        "c4-container": C4Container;
        "c4-heading": C4Heading;
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
        }
    }
}
