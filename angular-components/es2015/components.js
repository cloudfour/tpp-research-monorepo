/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';
/** @type {?} */
export const proxyInputs = (/**
 * @param {?} Cmp
 * @param {?} inputs
 * @return {?}
 */
(Cmp, inputs) => {
    /** @type {?} */
    const Prototype = Cmp.prototype;
    inputs.forEach((/**
     * @param {?} item
     * @return {?}
     */
    item => {
        Object.defineProperty(Prototype, item, {
            /**
             * @return {?}
             */
            get() { return this.el[item]; },
            /**
             * @param {?} val
             * @return {?}
             */
            set(val) { this.z.runOutsideAngular((/**
             * @return {?}
             */
            () => (this.el[item] = val))); }
        });
    }));
});
/** @type {?} */
export const proxyMethods = (/**
 * @param {?} Cmp
 * @param {?} methods
 * @return {?}
 */
(Cmp, methods) => {
    /** @type {?} */
    const Prototype = Cmp.prototype;
    methods.forEach((/**
     * @param {?} methodName
     * @return {?}
     */
    methodName => {
        Prototype[methodName] = (/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            const args = arguments;
            return this.z.runOutsideAngular((/**
             * @return {?}
             */
            () => this.el[methodName].apply(this.el, args)));
        });
    }));
});
/** @type {?} */
export const proxyOutputs = (/**
 * @param {?} instance
 * @param {?} el
 * @param {?} events
 * @return {?}
 */
(instance, el, events) => {
    events.forEach((/**
     * @param {?} eventName
     * @return {?}
     */
    eventName => instance[eventName] = fromEvent(el, eventName)));
})
// tslint:disable-next-line: only-arrow-functions
;
// tslint:disable-next-line: only-arrow-functions
/**
 * @param {?} opts
 * @return {?}
 */
export function ProxyCmp(opts) {
    /** @type {?} */
    const decorator = (/**
     * @param {?} cls
     * @return {?}
     */
    function (cls) {
        if (opts.inputs) {
            proxyInputs(cls, opts.inputs);
        }
        if (opts.methods) {
            proxyMethods(cls, opts.methods);
        }
        return cls;
    });
    return decorator;
}
let C4Button = class C4Button {
    /**
     * @param {?} c
     * @param {?} r
     * @param {?} z
     */
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
C4Button.decorators = [
    { type: Component, args: [{ selector: 'c4-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type'] },] },
];
/** @nocollapse */
C4Button.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4Button = tslib_1.__decorate([
    ProxyCmp({ inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4Button);
export { C4Button };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4Button.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4Button.prototype.z;
}
let C4ColorSwatches = class C4ColorSwatches {
    /**
     * @param {?} c
     * @param {?} r
     * @param {?} z
     */
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['colorChanged']);
    }
};
C4ColorSwatches.decorators = [
    { type: Component, args: [{ selector: 'c4-color-swatches', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'colorsData', 'colorsString', 'radioName'] },] },
];
/** @nocollapse */
C4ColorSwatches.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4ColorSwatches = tslib_1.__decorate([
    ProxyCmp({ inputs: ['callback', 'colorsData', 'colorsString', 'radioName'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4ColorSwatches);
export { C4ColorSwatches };
if (false) {
    /** @type {?} */
    C4ColorSwatches.prototype.colorChanged;
    /**
     * @type {?}
     * @protected
     */
    C4ColorSwatches.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4ColorSwatches.prototype.z;
}
let C4Container = class C4Container {
    /**
     * @param {?} c
     * @param {?} r
     * @param {?} z
     */
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
C4Container.decorators = [
    { type: Component, args: [{ selector: 'c4-container', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['containerClass', 'contentClass', 'tag'] },] },
];
/** @nocollapse */
C4Container.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4Container = tslib_1.__decorate([
    ProxyCmp({ inputs: ['containerClass', 'contentClass', 'tag'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4Container);
export { C4Container };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4Container.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4Container.prototype.z;
}
let C4Heading = class C4Heading {
    /**
     * @param {?} c
     * @param {?} r
     * @param {?} z
     */
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
C4Heading.decorators = [
    { type: Component, args: [{ selector: 'c4-heading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['tag'] },] },
];
/** @nocollapse */
C4Heading.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4Heading = tslib_1.__decorate([
    ProxyCmp({ inputs: ['tag'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4Heading);
export { C4Heading };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4Heading.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4Heading.prototype.z;
}
let C4StarRating = class C4StarRating {
    /**
     * @param {?} c
     * @param {?} r
     * @param {?} z
     */
    constructor(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
};
C4StarRating.decorators = [
    { type: Component, args: [{ selector: 'c4-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['guid', 'rating'] },] },
];
/** @nocollapse */
C4StarRating.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4StarRating = tslib_1.__decorate([
    ProxyCmp({ inputs: ['guid', 'rating'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4StarRating);
export { C4StarRating };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4StarRating.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4StarRating.prototype.z;
}
