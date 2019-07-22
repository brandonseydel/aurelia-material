import { ButtonClass } from './button-classes';
import { customElement, bindable, IViewModel } from '@aurelia/runtime';
import template from './button.html';
import '../scss/components/_buttons.scss';
import { inject } from '@aurelia/kernel';
import { Theme } from '../theme/theme';


@customElement({ name: 'amd-button', template: template })
@inject(Theme)
export class Button {

    constructor(private readonly theme: Theme) {

    }

    @bindable()
    raised = false;

    @bindable()
    unelevated = false;

    @bindable()
    outlined = false;

    @bindable()
    dense = false;

    @bindable()
    disabled = false;

    @bindable()
    trailingIcon = false;

    @bindable()
    icon = '';

    @bindable()
    label = '';


    getClasses() {
        return {
            'md-btn': true
        }
    }
}