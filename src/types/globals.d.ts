declare global {
    interface Element {
        ripple?: {
            enabled?: boolean;
            centered?: boolean;
            class?: string;
            circle?: boolean;
            touched?: boolean;
        }
    }
}   

export {};