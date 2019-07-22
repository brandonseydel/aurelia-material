import { IViewModel, customAttribute } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { RippleBase } from './ripple-base';

@customAttribute({ name: 'ripple' })
@inject(HTMLElement)
export class Ripple extends RippleBase {
    constructor(private readonly node: HTMLElement) { super(node); }
}