import { __rest } from "tslib";
import React from 'react';
import { Fmm, FmmFormHTML, FmmStoreImpl } from '@eafmm/core';
const FmmReactMinimapFn = (_a, ref) => {
    var { aggregateLabels, anchorRef, children, customElementIds, debounceMsec, dynamicLabels, framework, onUpdate, pageRef, panelRef, parentRef, storeRef, title, usePanelDetail, useWidthToScale, verbosity, zoomFactor } = _a, otherAttributes = __rest(_a, ["aggregateLabels", "anchorRef", "children", "customElementIds", "debounceMsec", "dynamicLabels", "framework", "onUpdate", "pageRef", "panelRef", "parentRef", "storeRef", "title", "usePanelDetail", "useWidthToScale", "verbosity", "zoomFactor"]);
    if (children)
        throw new Error('FmmReactMinimapTag is a contentless tag');
    const thisForm = React.useRef(null);
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
    return React.createElement('div', Object.assign(Object.assign({}, otherAttributes), { ref: setFormRef }));
};
export const FmmReactMinimapTag = React.forwardRef(FmmReactMinimapFn);
const FmmReactPanelFn = ({ children, detailParentRef, vertical = false }, ref) => {
    if (children)
        throw new Error('FmmReactPanelTag is a contentless tag');
    const thisHost = React.useRef(null);
    useSetRef(ref, useFmmReactPanel(thisHost, detailParentRef, vertical));
    return (React.createElement("div", { className: 'fmm-panel', ref: thisHost },
        React.createElement("style", null, Fmm.CSS)));
};
export const FmmReactPanelTag = React.forwardRef(FmmReactPanelFn);
const FmmReactStoreFn = ({ children, errors, values }, ref) => {
    if (children)
        throw new Error('FmmReactStoreTag is a contentless tag');
    useSetRef(ref, useFmmReactStore(values, errors));
    return null;
};
export const FmmReactStoreTag = React.forwardRef(FmmReactStoreFn);
export const useFmmReactMinimap = (key, form, p) => {
    const thisFmm = React.useRef();
    const thisMinimap = React.useRef(null);
    const createMinimap = () => {
        var _a, _b, _c, _d, _e;
        const fmcp = {
            aggregateLabels: p.aggregateLabels,
            anchor: (_a = p.anchorRef) === null || _a === void 0 ? void 0 : _a.current,
            debounceMsec: p.debounceMsec,
            dynamicLabels: p.dynamicLabels,
            form: new FmmFormHTML(form.current, (_b = p.pageRef) === null || _b === void 0 ? void 0 : _b.current),
            framework: p.framework,
            onUpdate: p.onUpdate,
            store: (_c = p.storeRef) === null || _c === void 0 ? void 0 : _c.current,
            title: p.title,
            usePanelDetail: p.usePanelDetail,
            useWidthToScale: p.useWidthToScale,
            verbosity: p.verbosity,
            zoomFactor: p.zoomFactor
        };
        const panelX = ((_d = p.panelRef) === null || _d === void 0 ? void 0 : _d.current) ? G.PANELS.get(p.panelRef.current) : undefined;
        thisFmm.current = panelX ? panelX.createMinimap(fmcp) : Fmm.createMinimap(fmcp, (_e = p.parentRef) === null || _e === void 0 ? void 0 : _e.current);
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
    React.useEffect(() => {
        if (thisFmm.current)
            thisFmm.current.destructor();
        thisMinimap.current = null;
        thisFmm.current = undefined;
        return createMinimap();
    }, [key]);
    React.useEffect(() => {
        if (thisFmm.current)
            thisFmm.current.compose(p.customElementIds);
    }, [p.customElementIds, key, thisFmm]);
    if (thisFmm.current)
        thisFmm.current.takeSnapshot();
    return thisMinimap;
};
export const useFmmReactPanel = (hostRef, detailParentRef, vertical) => {
    const thisPanel = React.useRef(null);
    useOnceAfterFirstRender(() => {
        const panel = Fmm.createPanel(hostRef.current, detailParentRef === null || detailParentRef === void 0 ? void 0 : detailParentRef.current, vertical, undefined);
        thisPanel.current = {
            destroyDetached: () => panel.destroyDetached()
        };
        G.PANELS.set(thisPanel.current, panel);
        return () => {
            panel.destructor();
            G.PANELS.delete(thisPanel.current);
        };
    });
    return thisPanel;
};
export const useFmmReactStore = (values, errors) => {
    const thisStore = React.useRef(new FmmStoreImpl(values, errors));
    thisStore.current.update(values, errors);
    return thisStore;
};
export const useOnceAfterFirstRender = (fn) => React.useEffect(fn, []);
export const useSetRef = (ref, value) => React.useEffect(() => {
    if (typeof ref === 'function')
        ref(value.current);
    else if (ref)
        ref.current = value.current;
}, [ref, value]);
const G = {
    PANELS: new WeakMap()
};
