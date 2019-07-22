import { valueConverter, IValueConverter } from "@aurelia/runtime";

@valueConverter({ name: 'toClass' })
export class ToClassValueConverter implements IValueConverter {

    toView(data: any) {
        let returnVal = '';
        for (const property in data) {
            let string = '';
            if (typeof data[property] === 'boolean') {
                if (string = <string>(!!data[property] && property)) {
                    // We don't want an empty string in the beginning
                    returnVal && (returnVal += ' ');
                    returnVal += string;
                    continue;
                }
            }
        }
        return returnVal;
    }
}