// import { customAttribute, IViewModel, bindable } from "@aurelia/runtime";
// import { inject } from "@aurelia/kernel";
// import { ElevationProps } from "./elevation-props";

// const elevationTransition = 'mdc-elevation-transition';

// @customAttribute({ name: 'shadow' })
// @inject(HTMLElement)
// export class Elevation implements IViewModel {
//     @bindable from: ElevationProps['zSpace'] = 12;
//     @bindable to?: ElevationProps['zSpace'];

//     constructor(private readonly element: HTMLElement) {
//     }

//     getClassFromZSpace = (space?: ElevationProps['zSpace']) => `mdc-elevation--z${space}`;
//     attaching() {
//         if (this.to) {
//             this.element.addEventListener('mouseenter', this.mouseEnter);
//             this.element.addEventListener('mouseleave', this.mouseLeave);
//             this.element.classList.add(elevationTransition);

//         }
//         this.element.classList.add(this.getClassFromZSpace(this.from));
//     }

//     mouseEnter = (event: MouseEvent) => {
//         this.element.classList.add(this.getClassFromZSpace(this.to));
//     }

//     mouseLeave = (event: MouseEvent) => {
//         this.element.classList.remove(this.getClassFromZSpace(this.to));
//     }
//     detaching() {
//         if (this.to) {
//             this.element.removeEventListener('mouseenter', this.mouseEnter);
//             this.element.removeEventListener('mouseleave', this.mouseLeave);
//         }
//     }

// }