import { ChipsClasses } from './chips-classes';
import { IViewModel, customElement, bindable } from '@aurelia/runtime';
import { inject } from '@aurelia/kernel';
import { MDCChipSet } from '@material/chips';
import clsx from 'clsx';

@customElement({
    name: 'chips', template: `
<template>
  <div class.bind="getClasses()">
    <slot></slot>
  </div>
</template>
` })
@inject(Element)
export class Chips implements IViewModel {
    private chipSet?: MDCChipSet;

    /**
     * This is the one or many indexes of chips that are selected default unselected e.g. -1
     */
    @bindable({ attribute: 'selected' }) selectedChips: number | number[] = -1;
    @bindable() input: boolean = false;
    @bindable() choice: boolean = false;
    @bindable() filter: boolean = false;
    @bindable() options: any;

    constructor(private readonly element: Element) { }

    getClasses = () => clsx(ChipsClasses.base, this.input && ChipsClasses.input, this.choice && ChipsClasses.choice, this.filter && ChipsClasses.filter);

    attaching() {
        this.chipSet = new MDCChipSet(this.element);
        if (this.choice) {
            const selectedChip = this.chipSet.chips[this.selectedChips as number];
            if (selectedChip) {
                selectedChip.selected = true;
            }
        }

        if (this.filter && this.selectedChips instanceof Array) {
            const arrayOfChips = this.selectedChips as number[];
            this.chipSet.chips.forEach((chip, index) => {
                if (arrayOfChips.includes(index)) {
                    chip.selected = true;
                    // TODO fix type in mdc
                    (this.chipSet!.selectedChipIds as string[]).push(chip.id);
                }
            });
        }
    }

    detaching() {
        this.chipSet && this.chipSet.destroy();
    }
}