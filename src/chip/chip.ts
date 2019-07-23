import { customElement, bindable } from "@aurelia/runtime";
import '../scss/components/_chips.scss';
import { inject } from "@aurelia/kernel";
import { Theme } from "../theme/theme";
import { Icon } from '../icon/icon';

@customElement({
    name: 'chip', template: `
<template>
<span class.bind="getClasses() | toClass" class="\${theme.type}">

<span class="\${contentClass}">

asdfasdfasdf
<div if.bind="close">
<icon></icon>
</div>

</span>

</span>

</template>

`})
@inject(Theme)
export class Chip {

    @bindable public close?: boolean;
    @bindable public disabled?: boolean;
    @bindable public label?: boolean;
    @bindable public outline?: boolean;
    @bindable public selected?: boolean;
    @bindable public small?: boolean;
    @bindable public textColor?: string;
    @bindable public value: boolean = true;

    private contentClass = 'md-chip__content';
    constructor(private readonly theme: Theme) { }


    getClasses() {
        return {
            'md-chip': true,
            'md-chip--disabled': this.disabled,
            'md-chip--selected': this.selected && !this.disabled,
            'md-chip--label': this.label,
            'md-chip--outline': this.outline,
            'md-chip--small': this.small,
            'md-chip--removable': this.close
        }
    }
}