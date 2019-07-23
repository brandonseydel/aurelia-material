import { inject } from "@aurelia/kernel";
import { Theme, ThemeType } from "../theme/theme";
import { bindable } from "@aurelia/runtime";


@inject(Theme)
export class Themeable {
    @bindable() public theme?: ThemeType;
    constructor(private readonly injectedTheme: Theme) { if (!this.theme) { this.theme = this.injectedTheme.type; } }

    themeClass(): object {
        return {
            'theme--dark': this.theme === ThemeType.Dark,
            'theme--light': this.theme !== ThemeType.Dark
        }
    }

}