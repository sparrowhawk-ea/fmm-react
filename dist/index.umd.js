(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('tslib'), require('react'), require('@eafmm/core')) :
    typeof define === 'function' && define.amd ? define(['exports', 'tslib', 'react', '@eafmm/core'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sayHello = {}, global.tslib, global.React, global.core));
})(this, (function (exports, tslib, React, core) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

    const FmmReactMinimapFn = (_a, ref) => {
        var { aggregateLabels, anchorRef, children, customElementIds, debounceMsec, dynamicLabels, framework, onUpdate, pageRef, panelRef, parentRef, storeRef, title, usePanelDetail, useWidthToScale, verbosity, zoomFactor } = _a, otherAttributes = tslib.__rest(_a, ["aggregateLabels", "anchorRef", "children", "customElementIds", "debounceMsec", "dynamicLabels", "framework", "onUpdate", "pageRef", "panelRef", "parentRef", "storeRef", "title", "usePanelDetail", "useWidthToScale", "verbosity", "zoomFactor"]);
        if (children)
            throw new Error('FmmReactMinimapTag is a contentless tag');
        const thisForm = React__default["default"].useRef(null);
        const setFormRef = (e) => {
            let form = e === null || e === void 0 ? void 0 : e.parentElement;
            while (form && form.tagName !== 'FORM')
                form = form.parentElement;
            if (e && !form)
                throw new Error('FmmReactMinimapTag must be used inside a FORM tag');
            thisForm.current = form;
        };
        const p = {
            aggregateLabels,
            anchorRef,
            customElementIds,
            debounceMsec,
            dynamicLabels,
            framework,
            onUpdate,
            pageRef,
            panelRef,
            parentRef,
            storeRef,
            title,
            usePanelDetail,
            useWidthToScale,
            verbosity,
            zoomFactor
        };
        useSetRef(ref, useFmmReactMinimap('', thisForm, p));
        return React__default["default"].createElement('div', Object.assign(Object.assign({}, otherAttributes), { ref: setFormRef }));
    };
    const FmmReactMinimapTag = React__default["default"].forwardRef(FmmReactMinimapFn);
    const FmmReactPanelFn = ({ children, detailParentRef, vertical = false }, ref) => {
        if (children)
            throw new Error('FmmReactPanelTag is a contentless tag');
        const thisHost = React__default["default"].useRef(null);
        useSetRef(ref, useFmmReactPanel(thisHost, detailParentRef, vertical));
        return (React__default["default"].createElement("div", { className: 'fmm-panel', ref: thisHost },
            React__default["default"].createElement("style", null, core.Fmm.CSS)));
    };
    const FmmReactPanelTag = React__default["default"].forwardRef(FmmReactPanelFn);
    const FmmReactStoreFn = ({ children, errors, values }, ref) => {
        if (children)
            throw new Error('FmmReactStoreTag is a contentless tag');
        useSetRef(ref, useFmmReactStore(values, errors));
        return null;
    };
    const FmmReactStoreTag = React__default["default"].forwardRef(FmmReactStoreFn);
    const useFmmReactMinimap = (key, form, p) => {
        const thisFmm = React__default["default"].useRef();
        const thisMinimap = React__default["default"].useRef(null);
        const createMinimap = () => {
            var _a, _b, _c, _d, _e;
            const fmcp = {
                aggregateLabels: p.aggregateLabels,
                anchor: (_a = p.anchorRef) === null || _a === void 0 ? void 0 : _a.current,
                debounceMsec: p.debounceMsec,
                dynamicLabels: p.dynamicLabels,
                form: new core.FmmFormHTML(form.current, (_b = p.pageRef) === null || _b === void 0 ? void 0 : _b.current),
                framework: p.framework,
                onUpdate: p.onUpdate,
                store: (_c = p.storeRef) === null || _c === void 0 ? void 0 : _c.current,
                title: p.title,
                usePanelDetail: p.usePanelDetail,
                useWidthToScale: p.useWidthToScale,
                verbosity: p.verbosity,
                zoomFactor: p.zoomFactor
            };
            const panelX = ((_d = p.panelRef) === null || _d === void 0 ? void 0 : _d.current) ? G$1.PANELS.get(p.panelRef.current) : undefined;
            thisFmm.current = panelX ? panelX.createMinimap(fmcp) : core.Fmm.createMinimap(fmcp, (_e = p.parentRef) === null || _e === void 0 ? void 0 : _e.current);
            if (!thisFmm.current)
                return () => { };
            thisMinimap.current = {
                destructor: () => { var _a; return (_a = thisFmm.current) === null || _a === void 0 ? void 0 : _a.destructor(); },
                takeSnapshot: () => { var _a; return !!((_a = thisFmm.current) === null || _a === void 0 ? void 0 : _a.takeSnapshot()); }
            };
            return () => {
                if (thisFmm.current)
                    thisFmm.current.detach();
                thisFmm.current = undefined;
            };
        };
        useOnceAfterFirstRender(createMinimap);
        React__default["default"].useEffect(() => {
            if (thisFmm.current)
                thisFmm.current.destructor();
            thisMinimap.current = null;
            thisFmm.current = undefined;
            return createMinimap();
        }, [key]);
        React__default["default"].useEffect(() => {
            if (thisFmm.current)
                thisFmm.current.compose(p.customElementIds);
        }, [p.customElementIds, key, thisFmm]);
        if (thisFmm.current)
            thisFmm.current.takeSnapshot();
        return thisMinimap;
    };
    const useFmmReactPanel = (hostRef, detailParentRef, vertical) => {
        const thisPanel = React__default["default"].useRef(null);
        useOnceAfterFirstRender(() => {
            const panel = core.Fmm.createPanel(hostRef.current, detailParentRef === null || detailParentRef === void 0 ? void 0 : detailParentRef.current, vertical, undefined);
            thisPanel.current = {
                destroyDetached: () => panel.destroyDetached()
            };
            G$1.PANELS.set(thisPanel.current, panel);
            return () => {
                panel.destructor();
                G$1.PANELS.delete(thisPanel.current);
            };
        });
        return thisPanel;
    };
    const useFmmReactStore = (values, errors) => {
        const thisStore = React__default["default"].useRef(new core.FmmStoreImpl(values, errors));
        thisStore.current.update(values, errors);
        return thisStore;
    };
    const useOnceAfterFirstRender = (fn) => React__default["default"].useEffect(fn, []);
    const useSetRef = (ref, value) => React__default["default"].useEffect(() => {
        if (typeof ref === 'function')
            ref(value.current);
        else if (ref)
            ref.current = value.current;
    }, [ref, value]);
    const G$1 = {
        PANELS: new WeakMap()
    };

    const FmmMaterialUI = {
        createFrameworkItem(_, e) {
            if (e.tagName === 'INPUT') {
                const type = e.type;
                if (type === 'checkbox' || type === 'radio')
                    return G.Check;
            }
            return e.classList.contains('MuiSelect-nativeInput') ? G.Select : G.Other;
        }
    };
    class FrameworkItem extends core.FmmFrameworkItemHTML {
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

    exports.FmmMaterialUI = FmmMaterialUI;
    exports.FmmReactMinimapTag = FmmReactMinimapTag;
    exports.FmmReactPanelTag = FmmReactPanelTag;
    exports.FmmReactStoreTag = FmmReactStoreTag;
    exports.useFmmReactMinimap = useFmmReactMinimap;
    exports.useFmmReactPanel = useFmmReactPanel;
    exports.useFmmReactStore = useFmmReactStore;
    exports.useOnceAfterFirstRender = useOnceAfterFirstRender;
    exports.useSetRef = useSetRef;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
