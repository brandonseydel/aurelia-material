import { IViewModel } from "@aurelia/runtime";
import '../scss/components/_ripples.scss';

export interface RippleOptions {
    class?: string;
    center?: boolean;
    circle?: boolean;
}

function transform(el: HTMLElement, value: string) {
    el.style['transform'] = value;
    el.style['webkitTransform'] = value;
}

function opacity(el: HTMLElement, value: number) {
    el.style['opacity'] = value.toString();
}

const calculate = (e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}) => {
    const offset = el.getBoundingClientRect();
    const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
    const localX = target.clientX - offset.left;
    const localY = target.clientY - offset.top;

    let radius = 0;
    let scale = 0.3;
    if (el.ripple && el.ripple.circle) {
        scale = 0.15;
        radius = el.clientWidth / 2;
        radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
    } else {
        radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2;
    }

    const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`;
    const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`;

    const x = value.center ? centerX : `${localX - radius}px`;
    const y = value.center ? centerY : `${localY - radius}px`;

    return { radius, scale, x, y, centerX, centerY };
}

const ripple = {
    /* eslint-disable max-statements */
    show(e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}) {
        if (!el.ripple || !el.ripple.enabled) {
            return;
        }

        const container = document.createElement('span');
        const animation = document.createElement('span');

        container.appendChild(animation)
        container.className = 'md-ripple__container';

        if (value.class) {
            container.className += ` ${value.class}`;
        }

        const { radius, scale, x, y, centerX, centerY } = calculate(e, el, value);

        const size = `${radius * 2}px`;
        animation.className = 'md-ripple__animation';
        animation.style.width = size;
        animation.style.height = size;

        el.appendChild(container);

        const computed = window.getComputedStyle(el)
        if (computed && computed.position === 'static') {
            el.style.position = 'relative';
            el.dataset.previousPosition = 'static';
        }

        animation.classList.add('md-ripple__animation--enter');
        animation.classList.add('md-ripple__animation--visible');
        transform(animation, `translate(${x}, ${y}) scale3d(${scale},${scale},${scale})`);
        opacity(animation, 0);
        animation.dataset.activated = String(performance.now());

        setTimeout(() => {
            animation.classList.remove('md-ripple__animation--enter');
            animation.classList.add('md-ripple__animation--in');
            transform(animation, `translate(${centerX}, ${centerY}) scale3d(1,1,1)`);
            opacity(animation, 0.25);
        }, 0)
    },

    hide(el: HTMLElement | null) {
        if (!el || !el.ripple || !el.ripple.enabled) return;

        const ripples = el.getElementsByClassName('md-ripple__animation') as HTMLCollectionOf<HTMLElement>;

        if (ripples.length === 0) return;
        const animation = ripples[ripples.length - 1];

        if (animation.dataset.isHiding) return;
        else animation.dataset.isHiding = 'true';

        const diff = performance.now() - Number(animation.dataset.activated);
        const delay = Math.max(250 - diff, 0);

        setTimeout(() => {
            animation.classList.remove('md-ripple__animation--in');
            animation.classList.add('md-ripple__animation--out');
            opacity(animation, 0);

            setTimeout(() => {
                const ripples = el.getElementsByClassName('md-ripple__animation');
                if (ripples.length === 1 && el.dataset.previousPosition) {
                    el.style.position = el.dataset.previousPosition;
                    delete el.dataset.previousPosition;
                }

                animation.parentNode && el.removeChild(animation.parentNode);
            }, 300)
        }, delay)
    }
}

function isTouchEvent(e: MouseEvent | TouchEvent): e is TouchEvent {
    return e.constructor.name === 'TouchEvent';
}

function rippleShow(e: MouseEvent | TouchEvent) {
    const value: RippleOptions = {}
    const element = e.currentTarget as HTMLElement;
    if (!element || !element.ripple || element.ripple.touched) return;
    if (isTouchEvent(e)) {
        element.ripple.touched = true;
    }
    value.center = element.ripple.centered;
    if (element.ripple.class) {
        value.class = element.ripple.class;
    }
    ripple.show(e, element, value);
}

function rippleHide(e: Event) {
    const element = e.currentTarget as HTMLElement | null;
    if (!element) return;

    window.setTimeout(() => {
        if (element.ripple) {
            element.ripple.touched = false;
        }
    })
    ripple.hide(element);
}

export abstract class RippleBase implements IViewModel {

    constructor(private readonly element: HTMLElement) { }

    calculate = (e: MouseEvent | TouchEvent, el: HTMLElement, value: RippleOptions = {}) => {
        const offset = el.getBoundingClientRect();
        const target = isTouchEvent(e) ? e.touches[e.touches.length - 1] : e;
        const localX = target.clientX - offset.left;
        const localY = target.clientY - offset.top;

        let radius = 0;
        let scale = 0.3;
        if (el.ripple && el.ripple.circle) {
            scale = 0.15;
            radius = el.clientWidth / 2;
            radius = value.center ? radius : radius + Math.sqrt((localX - radius) ** 2 + (localY - radius) ** 2) / 4;
        } else {
            radius = Math.sqrt(el.clientWidth ** 2 + el.clientHeight ** 2) / 2
        }

        const centerX = `${(el.clientWidth - (radius * 2)) / 2}px`
        const centerY = `${(el.clientHeight - (radius * 2)) / 2}px`

        const x = value.center ? centerX : `${localX - radius}px`
        const y = value.center ? centerY : `${localY - radius}px`

        return { radius, scale, x, y, centerX, centerY }
    }

    attaching() {
        this.element.ripple = this.element.ripple || {};
        this.element.ripple.enabled = true;
        if ('ontouchstart' in window) {
            this.element.addEventListener('touchend', rippleHide, false)
            this.element.addEventListener('touchcancel', rippleHide, false)
        }

        this.element.addEventListener('mousedown', rippleShow, false)
        this.element.addEventListener('mouseup', rippleHide, false)
        this.element.addEventListener('mouseleave', rippleHide, false)
        // Anchor tags can be dragged, causes other hides to fail - #1537
        this.element.addEventListener('dragstart', rippleHide, false)
    }


    detaching() { this.removeListeners(); }


    removeListeners() {
        this.element.removeEventListener('mousedown', rippleShow);
        this.element.removeEventListener('touchstart', rippleHide);
        this.element.removeEventListener('touchend', rippleHide);
        this.element.removeEventListener('touchcancel', rippleHide);
        this.element.removeEventListener('mouseup', rippleHide);
        this.element.removeEventListener('mouseleave', rippleHide);
        this.element.removeEventListener('dragstart', rippleHide);
    }
}