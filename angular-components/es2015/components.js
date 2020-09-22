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
let C4Columns = class C4Columns {
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
C4Columns.decorators = [
    { type: Component, args: [{ selector: 'c4-columns', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hasGutter'] },] },
];
/** @nocollapse */
C4Columns.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4Columns = tslib_1.__decorate([
    ProxyCmp({ inputs: ['hasGutter'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4Columns);
export { C4Columns };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4Columns.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4Columns.prototype.z;
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
    { type: Component, args: [{ selector: 'c4-container', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['isDark', 'isProse', 'isTall', 'tag'] },] },
];
/** @nocollapse */
C4Container.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4Container = tslib_1.__decorate([
    ProxyCmp({ inputs: ['isDark', 'isProse', 'isTall', 'tag'] }),
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
export class C4DetailsLockup {
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
}
C4DetailsLockup.decorators = [
    { type: Component, args: [{ selector: 'c4-details-lockup', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' },] },
];
/** @nocollapse */
C4DetailsLockup.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4DetailsLockup.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4DetailsLockup.prototype.z;
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
let C4ProductIllustration = class C4ProductIllustration {
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
C4ProductIllustration.decorators = [
    { type: Component, args: [{ selector: 'c4-product-illustration', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['altText', 'aspectRatio', 'color', 'imgPath'] },] },
];
/** @nocollapse */
C4ProductIllustration.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4ProductIllustration = tslib_1.__decorate([
    ProxyCmp({ inputs: ['altText', 'aspectRatio', 'color', 'imgPath'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4ProductIllustration);
export { C4ProductIllustration };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4ProductIllustration.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4ProductIllustration.prototype.z;
}
let C4RadioButtons = class C4RadioButtons {
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
C4RadioButtons.decorators = [
    { type: Component, args: [{ selector: 'c4-radio-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'optionsData', 'optionsString', 'radioName'] },] },
];
/** @nocollapse */
C4RadioButtons.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4RadioButtons = tslib_1.__decorate([
    ProxyCmp({ inputs: ['callback', 'optionsData', 'optionsString', 'radioName'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4RadioButtons);
export { C4RadioButtons };
if (false) {
    /** @type {?} */
    C4RadioButtons.prototype.colorChanged;
    /**
     * @type {?}
     * @protected
     */
    C4RadioButtons.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4RadioButtons.prototype.z;
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
    { type: Component, args: [{ selector: 'c4-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'] },] },
];
/** @nocollapse */
C4StarRating.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4StarRating = tslib_1.__decorate([
    ProxyCmp({ inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'], 'methods': ['getRating'] }),
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
let C4Stepper = class C4Stepper {
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
C4Stepper.decorators = [
    { type: Component, args: [{ selector: 'c4-stepper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['max', 'min', 'startValue'] },] },
];
/** @nocollapse */
C4Stepper.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
C4Stepper = tslib_1.__decorate([
    ProxyCmp({ inputs: ['max', 'min', 'startValue'] }),
    tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
], C4Stepper);
export { C4Stepper };
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4Stepper.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4Stepper.prototype.z;
}
export class C4Text {
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
}
C4Text.decorators = [
    { type: Component, args: [{ selector: 'c4-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' },] },
];
/** @nocollapse */
C4Text.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: ElementRef },
    { type: NgZone }
];
if (false) {
    /**
     * @type {?}
     * @protected
     */
    C4Text.prototype.el;
    /**
     * @type {?}
     * @protected
     */
    C4Text.prototype.z;
}
