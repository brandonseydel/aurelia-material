import { ShapeClasses } from './shape-classes';
import { customAttribute, bindable, IViewModel } from "@aurelia/runtime";
import { inject } from "@aurelia/kernel";

const divTemplate = `<div class="${ShapeClasses.base} {0}"></div>`;

@customAttribute({ name: 'shape' })
@inject(Element)
export class Shape implements IViewModel {

    constructor(private readonly element: Element) {
        element.classList.add(ShapeClasses.outer);
    }
    @bindable topLeft: boolean = false;
    @bindable topRight: boolean = false;
    @bindable bottomLeft: boolean = false;
    @bindable bottomRight: boolean = false;


    attaching() {
        let html = '';
        if (this.topLeft) {
            html += divTemplate.replace('{0}', ShapeClasses.topLeft);
        }
        if (this.topRight) {
            html += divTemplate.replace('{0}', ShapeClasses.topRight);
        }
        if (this.bottomLeft) {
            html += divTemplate.replace('{0}', ShapeClasses.bottomLeft);
        }
        if (this.bottomRight) {
            html += divTemplate.replace('{0}', ShapeClasses.bottomRight);
        }

        this.element.insertAdjacentHTML('beforeend', html);
    }

} 