import { ChangeDetectorRef, ElementRef, EventEmitter, NgZone } from '@angular/core';
export declare const proxyInputs: (Cmp: any, inputs: string[]) => void;
export declare const proxyMethods: (Cmp: any, methods: string[]) => void;
export declare const proxyOutputs: (instance: any, el: any, events: string[]) => void;
export declare function ProxyCmp(opts: {
    inputs?: any;
    methods?: any;
}): (cls: any) => any;
import { Components } from '../../stencil-components';
export declare interface C4Button extends Components.C4Button {
}
export declare class C4Button {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4ColorSwatches extends Components.C4ColorSwatches {
}
export declare class C4ColorSwatches {
    protected z: NgZone;
    colorChanged: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4Container extends Components.C4Container {
}
export declare class C4Container {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4Heading extends Components.C4Heading {
}
export declare class C4Heading {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4ProductIllustration extends Components.C4ProductIllustration {
}
export declare class C4ProductIllustration {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4RadioButtons extends Components.C4RadioButtons {
}
export declare class C4RadioButtons {
    protected z: NgZone;
    colorChanged: EventEmitter<CustomEvent>;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4StarRating extends Components.C4StarRating {
}
export declare class C4StarRating {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
export declare interface C4Stepper extends Components.C4Stepper {
}
export declare class C4Stepper {
    protected z: NgZone;
    protected el: HTMLElement;
    constructor(c: ChangeDetectorRef, r: ElementRef, z: NgZone);
}
