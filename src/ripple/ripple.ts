// import { customAttribute, IViewModel, bindable } from "@aurelia/runtime";
// import { inject } from "@aurelia/kernel";
// // import { MDCRipple } from "@material/ripple";
// import { RippleColor } from "./ripple-color";

// @customAttribute({ name: 'nipple' })
// @inject(Element)
// export class Ripple implements IViewModel {

//     @bindable public color?: 'primary' | 'secondary' = 'primary';
//     @bindable public unbounded: boolean = false;
//     private ripple?: MDCRipple;

//     constructor(private readonly element: Element) { }

//     colorChanged() {
//         this.element.classList.remove(RippleColor.Primary, RippleColor.Secondary);
//         this.element.classList.add(this.getColor());
//     }

//     attaching() {
//         this.ripple = new MDCRipple(this.element);
//         this.ripple.unbounded = this.unbounded;
//         this.element.classList.add(RippleColor.Base, this.getColor());
//     }

//     detaching() {
//         this.ripple && this.ripple.destroy();
//     }

//     getColor() {
//         if (!this.color) return RippleColor.Primary;
//         return this.color === 'primary' ? RippleColor.Primary : RippleColor.Secondary;
//     }
// }