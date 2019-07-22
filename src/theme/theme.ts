export class Theme {
    type: ThemeType = ThemeType.Light;
}

export enum ThemeType {
    Light = 'theme--light',
    Dark = 'theme--dark'
}