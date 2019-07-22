import { ChipClass } from './chip-class';
import { customElement, bindable } from "@aurelia/runtime";
import clsx from "clsx";
import { mdiClass } from "..";

@customElement({
    name: 'chip-remove', template: `
<template>
  <i class="\${getClass())"
    tabindex="0"
    role="button"
    click.delegate="onClick">
    <slot>cancel</slot>
  </i>
</template>
` })
export class ChipRemove {
    @bindable onClick?: (event?: MouseEvent) => void;
    getClass = () => clsx(mdiClass, ChipClass.chipIcon, ChipClass.chipIconTrailing);
}