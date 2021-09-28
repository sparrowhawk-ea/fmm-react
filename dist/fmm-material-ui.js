import { FmmFrameworkItemHTML } from '@eafmm/core';
export const FmmMaterialUI = {
    createFrameworkItem(_, e) {
        if (e.tagName === 'INPUT') {
            const type = e.type;
            if (type === 'checkbox' || type === 'radio')
                return G.Check;
        }
        return e.classList.contains('MuiSelect-nativeInput') ? G.Select : G.Other;
    }
};
class FrameworkItem extends FmmFrameworkItemHTML {
    constructor(wrapperClass) {
        super(wrapperClass || 'MuiFormControl-root');
    }
    getError(_, _e, envelope, _v) {
        var _a;
        return ((_a = envelope === null || envelope === void 0 ? void 0 : envelope.querySelector('.MuiFormHelperText-root')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
    }
}
class FrameworkItemCheck extends FrameworkItem {
    constructor() {
        super('MuiFormControlLabel-root');
    }
    getLabel(_, envelope) {
        return envelope === null || envelope === void 0 ? void 0 : envelope.querySelector('SPAN.MuiFormControlLabel-label');
    }
}
class FrameworkItemSelect extends FrameworkItem {
    getValue(name, e, _n, _l) {
        var _a, _b;
        return ((_b = (_a = e.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector('#mui-component-select-' + name)) === null || _b === void 0 ? void 0 : _b.textContent) || '';
    }
}
const G = {
    Check: new FrameworkItemCheck(),
    Select: new FrameworkItemSelect(),
    Other: new FrameworkItem()
};
