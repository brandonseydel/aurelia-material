import { customElement, bindable } from "@aurelia/runtime";
import template from './card.html';
@customElement({ name: 'card', template: template })
export class Card {

    @bindable outline = false;
    

}