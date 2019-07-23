import { customElement, bindable, IViewModel } from "@aurelia/runtime";
import { ElevationProps } from "../elevation/elevation-props";

@customElement({ name: 'paper' })
export class Paper {
    @bindable public elevation?: ElevationProps['elevation'];
    @bindable public color?: string;
    @bindable public height?: string | number;
}