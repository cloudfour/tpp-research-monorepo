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

export declare interface C4Button extends Components.C4Button {}
@ProxyCmp({inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type']})
@Component({ selector: 'c4-button', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['buttonClass', 'disabled', 'href', 'tag', 'type'] })
export class C4Button {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4ColorSwatches extends Components.C4ColorSwatches {}
@ProxyCmp({inputs: ['callback', 'colorsData', 'colorsString', 'radioName']})
@Component({ selector: 'c4-color-swatches', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'colorsData', 'colorsString', 'radioName'] })
export class C4ColorSwatches {
  colorChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['colorChanged']);
  }
}

export declare interface C4Columns extends Components.C4Columns {}
@ProxyCmp({inputs: ['hasGutter']})
@Component({ selector: 'c4-columns', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['hasGutter'] })
export class C4Columns {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4Container extends Components.C4Container {}
@ProxyCmp({inputs: ['isDark', 'isProse', 'isStaggered', 'isTall', 'tag']})
@Component({ selector: 'c4-container', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['isDark', 'isProse', 'isStaggered', 'isTall', 'tag'] })
export class C4Container {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4DetailsLockup extends Components.C4DetailsLockup {}

@Component({ selector: 'c4-details-lockup', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class C4DetailsLockup {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4Heading extends Components.C4Heading {}
@ProxyCmp({inputs: ['tag']})
@Component({ selector: 'c4-heading', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['tag'] })
export class C4Heading {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4ProductIllustration extends Components.C4ProductIllustration {}
@ProxyCmp({inputs: ['altText', 'aspectRatio', 'color', 'imgPath']})
@Component({ selector: 'c4-product-illustration', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['altText', 'aspectRatio', 'color', 'imgPath'] })
export class C4ProductIllustration {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4RadioButtons extends Components.C4RadioButtons {}
@ProxyCmp({inputs: ['callback', 'optionsData', 'optionsString', 'radioName']})
@Component({ selector: 'c4-radio-buttons', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['callback', 'optionsData', 'optionsString', 'radioName'] })
export class C4RadioButtons {
  colorChanged!: EventEmitter<CustomEvent>;
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['colorChanged']);
  }
}

export declare interface C4StarRating extends Components.C4StarRating {}
@ProxyCmp({inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink']})
@Component({ selector: 'c4-star-rating', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['guid', 'rating', 'reviewsCount', 'reviewsLink'] })
export class C4StarRating {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4Stepper extends Components.C4Stepper {}
@ProxyCmp({inputs: ['max', 'min', 'startValue']})
@Component({ selector: 'c4-stepper', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>', inputs: ['max', 'min', 'startValue'] })
export class C4Stepper {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}

export declare interface C4Text extends Components.C4Text {}

@Component({ selector: 'c4-text', changeDetection: ChangeDetectionStrategy.OnPush, template: '<ng-content></ng-content>' })
export class C4Text {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}
