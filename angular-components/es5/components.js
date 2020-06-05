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
export var proxyInputs = (/**
 * @param {?} Cmp
 * @param {?} inputs
 * @return {?}
 */
function (Cmp, inputs) {
    /** @type {?} */
    var Prototype = Cmp.prototype;
    inputs.forEach((/**
     * @param {?} item
     * @return {?}
     */
    function (item) {
        Object.defineProperty(Prototype, item, {
            get: /**
             * @return {?}
             */
            function () { return this.el[item]; },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                var _this = this;
                this.z.runOutsideAngular((/**
                 * @return {?}
                 */
                function () { return (_this.el[item] = val); }));
            }
        });
    }));
});
/** @type {?} */
export var proxyMethods = (/**
 * @param {?} Cmp
 * @param {?} methods
 * @return {?}
 */
function (Cmp, methods) {
    /** @type {?} */
    var Prototype = Cmp.prototype;
    methods.forEach((/**
     * @param {?} methodName
     * @return {?}
     */
    function (methodName) {
        Prototype[methodName] = (/**
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var args = arguments;
            return this.z.runOutsideAngular((/**
             * @return {?}
             */
            function () { return _this.el[methodName].apply(_this.el, args); }));
        });
    }));
});
/** @type {?} */
export var proxyOutputs = (/**
 * @param {?} instance
 * @param {?} el
 * @param {?} events
 * @return {?}
 */
function (instance, el, events) {
    events.forEach((/**
     * @param {?} eventName
     * @return {?}
     */
    function (eventName) { return instance[eventName] = fromEvent(el, eventName); }));
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
    var decorator = (/**
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
var C4Button = /** @class */ (function () {
    function C4Button(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4Button.decorators = [
        { type: Component, args: [{ selector: 'c4-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type'] },] },
    ];
    /** @nocollapse */
    C4Button.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4Button = tslib_1.__decorate([
        ProxyCmp({ inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4Button);
    return C4Button;
}());
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
var C4ColorSwatches = /** @class */ (function () {
    function C4ColorSwatches(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['colorChanged']);
    }
    C4ColorSwatches.decorators = [
        { type: Component, args: [{ selector: 'c4-color-swatches', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'colorsData', 'colorsString', 'radioName'] },] },
    ];
    /** @nocollapse */
    C4ColorSwatches.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4ColorSwatches = tslib_1.__decorate([
        ProxyCmp({ inputs: ['callback', 'colorsData', 'colorsString', 'radioName'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4ColorSwatches);
    return C4ColorSwatches;
}());
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
var C4Columns = /** @class */ (function () {
    function C4Columns(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4Columns.decorators = [
        { type: Component, args: [{ selector: 'c4-columns', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hasGutter'] },] },
    ];
    /** @nocollapse */
    C4Columns.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4Columns = tslib_1.__decorate([
        ProxyCmp({ inputs: ['hasGutter'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4Columns);
    return C4Columns;
}());
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
var C4Container = /** @class */ (function () {
    function C4Container(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4Container.decorators = [
        { type: Component, args: [{ selector: 'c4-container', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['isDark', 'isProse', 'isTall', 'tag'] },] },
    ];
    /** @nocollapse */
    C4Container.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4Container = tslib_1.__decorate([
        ProxyCmp({ inputs: ['isDark', 'isProse', 'isTall', 'tag'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4Container);
    return C4Container;
}());
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
var C4DetailsLockup = /** @class */ (function () {
    function C4DetailsLockup(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4DetailsLockup.decorators = [
        { type: Component, args: [{ selector: 'c4-details-lockup', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' },] },
    ];
    /** @nocollapse */
    C4DetailsLockup.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    return C4DetailsLockup;
}());
export { C4DetailsLockup };
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
var C4Heading = /** @class */ (function () {
    function C4Heading(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4Heading.decorators = [
        { type: Component, args: [{ selector: 'c4-heading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['tag'] },] },
    ];
    /** @nocollapse */
    C4Heading.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4Heading = tslib_1.__decorate([
        ProxyCmp({ inputs: ['tag'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4Heading);
    return C4Heading;
}());
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
var C4ProductIllustration = /** @class */ (function () {
    function C4ProductIllustration(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4ProductIllustration.decorators = [
        { type: Component, args: [{ selector: 'c4-product-illustration', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['altText', 'color', 'imgPath'] },] },
    ];
    /** @nocollapse */
    C4ProductIllustration.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4ProductIllustration = tslib_1.__decorate([
        ProxyCmp({ inputs: ['altText', 'color', 'imgPath'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4ProductIllustration);
    return C4ProductIllustration;
}());
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
var C4RadioButtons = /** @class */ (function () {
    function C4RadioButtons(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
        proxyOutputs(this, this.el, ['colorChanged']);
    }
    C4RadioButtons.decorators = [
        { type: Component, args: [{ selector: 'c4-radio-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'optionsData', 'optionsString', 'radioName'] },] },
    ];
    /** @nocollapse */
    C4RadioButtons.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4RadioButtons = tslib_1.__decorate([
        ProxyCmp({ inputs: ['callback', 'optionsData', 'optionsString', 'radioName'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4RadioButtons);
    return C4RadioButtons;
}());
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
var C4StarRating = /** @class */ (function () {
    function C4StarRating(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4StarRating.decorators = [
        { type: Component, args: [{ selector: 'c4-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'] },] },
    ];
    /** @nocollapse */
    C4StarRating.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4StarRating = tslib_1.__decorate([
        ProxyCmp({ inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4StarRating);
    return C4StarRating;
}());
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
var C4Stepper = /** @class */ (function () {
    function C4Stepper(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4Stepper.decorators = [
        { type: Component, args: [{ selector: 'c4-stepper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['max', 'min', 'startValue'] },] },
    ];
    /** @nocollapse */
    C4Stepper.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    C4Stepper = tslib_1.__decorate([
        ProxyCmp({ inputs: ['max', 'min', 'startValue'] }),
        tslib_1.__metadata("design:paramtypes", [ChangeDetectorRef, ElementRef, NgZone])
    ], C4Stepper);
    return C4Stepper;
}());
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
var C4Text = /** @class */ (function () {
    function C4Text(c, r, z) {
        this.z = z;
        c.detach();
        this.el = r.nativeElement;
    }
    C4Text.decorators = [
        { type: Component, args: [{ selector: 'c4-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' },] },
    ];
    /** @nocollapse */
    C4Text.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: ElementRef },
        { type: NgZone }
    ]; };
    return C4Text;
}());
export { C4Text };
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
