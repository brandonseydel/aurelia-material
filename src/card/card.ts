import { customElement, bindable } from "@aurelia/runtime";
import template from './card.html';
import '../scss/components/_cards.scss';
import { inject } from "@aurelia/kernel";
import { Theme } from "../theme/theme";


@customElement({ containerless: true, name: 'card', template: template })
@inject(Theme)
export class Card {

    public constructor(private readonly theme: Theme) { }

    @bindable public activeClass?: string;
    @bindable public append = false;
    @bindable public flat?: boolean;
    @bindable public hover?: boolean;
    @bindable public img?: string;
    @bindable public raised?: boolean;


    getClasses() {
        return {
            'md-card': true,
            'md-card--flat': this.flat,
            'md-card--hover': this.hover
        }
    }

}