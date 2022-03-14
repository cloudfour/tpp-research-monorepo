/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';

export const proxyInputs = (Cmp: any, inputs: string[]) => {
  const Prototype = Cmp.prototype;
  inputs.forEach(item => {
    Object.defineProperty(Prototype, item, {
      get() { return this.el[item]; },
      set(val: any) { this.z.runOutsideAngular(() => (this.el[item] = val)); }
    });
  });
};

export const proxyMethods = (Cmp: any, methods: string[]) => {
  const Prototype = Cmp.prototype;
  methods.forEach(methodName => {
    Prototype[methodName] = function () {
      const args = arguments;
      return this.z.runOutsideAngular(() => this.el[methodName].apply(this.el, args));
    };
  });
};

export const proxyOutputs = (instance: any, el: any, events: string[]) => {
  events.forEach(eventName => instance[eventName] = fromEvent(el, eventName));
}

// tslint:disable-next-line: only-arrow-functions
export function ProxyCmp(opts: { inputs?: any; methods?: any }) {
  const decorator =  function(cls: any){
    if (opts.inputs) {
      proxyInputs(cls, opts.inputs);
    }
    if (opts.methods) {
      proxyMethods(cls, opts.methods);
    }
    return cls;
  };
  return decorator;
}

import { Components } from '../../stencil-components'

export declare interface CfourButton extends Components.CfourButton {}
@ProxyCmp({inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type']})
@Component({ selector: 'cfour-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type'] })
export class CfourButton {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourColorSwatches extends Components.CfourColorSwatches {}
@ProxyCmp({inputs: ['callback', 'colorsData', 'colorsString', 'radioName']})
@Component({ selector: 'cfour-color-swatches', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'colorsData', 'colorsString', 'radioName'] })
export class CfourColorSwatches {
  colorChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['colorChanged']);
  }
}

export declare interface CfourColumns extends Components.CfourColumns {}
@ProxyCmp({inputs: ['hasGutter']})
@Component({ selector: 'cfour-columns', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hasGutter'] })
export class CfourColumns {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourContainer extends Components.CfourContainer {}
@ProxyCmp({inputs: ['isDark', 'isProse', 'isStaggered', 'isTall', 'tag']})
@Component({ selector: 'cfour-container', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['isDark', 'isProse', 'isStaggered', 'isTall', 'tag'] })
export class CfourContainer {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourDetailsLockup extends Components.CfourDetailsLockup {}

@Component({ selector: 'cfour-details-lockup', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class CfourDetailsLockup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourHeading extends Components.CfourHeading {}
@ProxyCmp({inputs: ['tag']})
@Component({ selector: 'cfour-heading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['tag'] })
export class CfourHeading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourProductIllustration extends Components.CfourProductIllustration {}
@ProxyCmp({inputs: ['altText', 'aspectRatio', 'color', 'imgPath']})
@Component({ selector: 'cfour-product-illustration', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['altText', 'aspectRatio', 'color', 'imgPath'] })
export class CfourProductIllustration {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourRadioButtons extends Components.CfourRadioButtons {}
@ProxyCmp({inputs: ['callback', 'optionsData', 'optionsString', 'radioName']})
@Component({ selector: 'cfour-radio-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'optionsData', 'optionsString', 'radioName'] })
export class CfourRadioButtons {
  colorChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['colorChanged']);
  }
}

export declare interface CfourStarRating extends Components.CfourStarRating {}
@ProxyCmp({inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'], 'methods': ['getRating']})
@Component({ selector: 'cfour-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'] })
export class CfourStarRating {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourStepper extends Components.CfourStepper {}
@ProxyCmp({inputs: ['max', 'min', 'startValue']})
@Component({ selector: 'cfour-stepper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['max', 'min', 'startValue'] })
export class CfourStepper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface CfourText extends Components.CfourText {}

@Component({ selector: 'cfour-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class CfourText {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
