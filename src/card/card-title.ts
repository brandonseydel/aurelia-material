import { bindable, customElement } from "@aurelia/runtime";
import { Theme } from "../theme/theme";
import { inject } from "@aurelia/kernel";

@customElement({
    containerless: true,
    name: 'card-title', template: `
<template><div class.bind="getClasses() | toClass" class=\${class} class=\${theme.type}>MEOW</div></template>
` })
@inject(Theme)
export class CardTitle {
    @bindable class: string = '';
    @bindable primaryTitle: boolean = false;

    constructor(private readonly theme: Theme) { }


    getClasses() {
        return {
            'md-card__title': true,
            'md-card__title--primary': this.primaryTitle
        }
    }
}