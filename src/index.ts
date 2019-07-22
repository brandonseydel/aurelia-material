import { Ripple } from './ripple/new-ripple';
import { Shape } from './shape/shape';
import { IRegistry, IContainer, Registration } from '@aurelia/kernel';
import { Button } from './button/button';
import { CustomElement } from '@aurelia/runtime';
import { Card } from './card/card';
import { Elevation } from './elevation/elevation';
import { ToClassValueConverter } from './to-class-value-conterter';
import { Theme } from './theme/theme';
import './scss/main.scss';


export class MaterialUI implements IRegistry, IMaterialUIConfig {
    public prefix: string = '';
    static config(config: (config: IMaterialUIConfig) => void) {
        const instance = new MaterialUI();
        config(instance);
        return instance;
    }

    register(container: IContainer): void {
        this.registerComponent(container, Button);
        this.registerComponent(container, Card);
        this.registerComponent(container, Elevation);
        // this.registerComponent(container, Ripple);
        this.registerComponent(container, Shape);
        this.registerComponent(container, ToClassValueConverter);
        this.registerComponent(container, Ripple);
        this.registerComponent(container, Theme);
    }

    registerComponent(container: IContainer, ...components: any) {
        for (const component of components) {
            const name = component.description ? component.description.name : component.name;
            container.register(component);
            if (!this.prefix) return;
            Registration.alias(this.prefix + '-' + CustomElement.keyFrom(name), component).register(container);
        }
    }
}

export interface IMaterialUIConfig {
    /**
     * This is used to prefix all custom elements and attributes so one can name them whatever they want
     */
    prefix: string;
}

export const mdiClass = 'material-icons';