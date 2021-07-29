import React from 'react';
import { Fmm, FmmMapStore } from '@eafmm/core';
// =================================================================================================================================
//						F M M R E A C T M I N I M A P T A G
// =================================================================================================================================
var FmmReactMinimapFn = function (_a, ref) {
    var aggregateLabels = _a.aggregateLabels, anchorRef = _a.anchorRef, children = _a.children, customWidgetIds = _a.customWidgetIds, debounceMsec = _a.debounceMsec, dynamicLabels = _a.dynamicLabels, framework = _a.framework, onUpdate = _a.onUpdate, pageRef = _a.pageRef, panelRef = _a.panelRef, parentRef = _a.parentRef, storeRef = _a.storeRef, title = _a.title, usePanelDetail = _a.usePanelDetail, useWidthToScale = _a.useWidthToScale, verbosity = _a.verbosity, widgetFactories = _a.widgetFactories;
    if (children)
        throw new Error('FmmReactMinimapTag is a contentless tag');
    var thisForm = React.useRef();
    var setFormRef = function (e) {
        var form = e === null || e === void 0 ? void 0 : e.parentElement;
        while (form && form.tagName !== 'FORM')
            form = form.parentElement;
        if (e && !form)
            throw new Error('FmmReactMinimapTag must be used inside a FORM tag');
        thisForm.current = form;
    };
    var p = {
        aggregateLabels: aggregateLabels,
        anchorRef: anchorRef,
        customWidgetIds: customWidgetIds,
        debounceMsec: debounceMsec,
        dynamicLabels: dynamicLabels,
        framework: framework,
        onUpdate: onUpdate,
        pageRef: pageRef,
        panelRef: panelRef,
        parentRef: parentRef,
        storeRef: storeRef,
        title: title,
        usePanelDetail: usePanelDetail,
        useWidthToScale: useWidthToScale,
        verbosity: verbosity,
        widgetFactories: widgetFactories
    };
    useSetRef(ref, useFmmReactMinimap('', thisForm, p));
    return React.createElement("div", { ref: setFormRef }); // avoid using form element tag to keep out of the way of any form processing library
};
export var FmmReactMinimapTag = React.forwardRef(FmmReactMinimapFn);
var FmmReactPanelFn = function (_a, ref) {
    var children = _a.children, detailParentRef = _a.detailParentRef, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
    if (children)
        throw new Error('FmmReactPanelTag is a contentless tag');
    var thisHost = React.useRef();
    useSetRef(ref, useFmmReactPanel(thisHost, detailParentRef, vertical));
    return (React.createElement("div", { className: 'fmm-panel', ref: thisHost },
        React.createElement("style", null, Fmm.CSS)));
};
export var FmmReactPanelTag = React.forwardRef(FmmReactPanelFn);
var FmmReactStoreFn = function (_a, ref) {
    var children = _a.children, errors = _a.errors, values = _a.values;
    if (children)
        throw new Error('FmmReactStoreTag is a contentless tag');
    useSetRef(ref, useFmmReactStore(values, errors));
    return null;
};
export var FmmReactStoreTag = React.forwardRef(FmmReactStoreFn);
// =================================================================================================================================
//						U S E F M M R E A C T M I N I M A P
// =================================================================================================================================
export var useFmmReactMinimap = function (key, form, p) {
    var thisFmm = React.useRef();
    var thisMinimap = React.useRef();
    var createMinimap = function () {
        var _a, _b, _c, _d, _e;
        var fmcp = {
            aggregateLabels: p.aggregateLabels,
            anchor: (_a = p.anchorRef) === null || _a === void 0 ? void 0 : _a.current,
            debounceMsec: p.debounceMsec,
            dynamicLabels: p.dynamicLabels,
            form: form.current,
            framework: p.framework,
            onUpdate: p.onUpdate,
            page: (_b = p.pageRef) === null || _b === void 0 ? void 0 : _b.current,
            store: (_c = p.storeRef) === null || _c === void 0 ? void 0 : _c.current,
            title: p.title,
            usePanelDetail: p.usePanelDetail,
            useWidthToScale: p.useWidthToScale,
            verbosity: p.verbosity,
            widgetFactories: p.widgetFactories
        };
        var panelX = ((_d = p.panelRef) === null || _d === void 0 ? void 0 : _d.current) ? G.PANELS.get(p.panelRef.current) : undefined;
        thisFmm.current = panelX ? panelX.createMinimap(fmcp) : Fmm.createMinimap(fmcp, (_e = p.parentRef) === null || _e === void 0 ? void 0 : _e.current);
        if (!thisFmm.current)
            return undefined;
        thisMinimap.current = {
            destructor: function () { var _a; return (_a = thisFmm.current) === null || _a === void 0 ? void 0 : _a.destructor(); },
            takeSnapshot: function () { var _a; return (_a = thisFmm.current) === null || _a === void 0 ? void 0 : _a.takeSnapshot(); }
        };
        return function () {
            if (thisFmm.current)
                thisFmm.current.detach();
            thisFmm.current = undefined;
        };
    };
    useOnceAfterFirstRender(createMinimap);
    React.useEffect(function () {
        if (thisFmm.current)
            thisFmm.current.destructor();
        thisMinimap.current = thisFmm.current = undefined;
        return createMinimap();
    }, [key]);
    React.useEffect(function () {
        if (thisFmm.current)
            thisFmm.current.compose(p.customWidgetIds);
    }, [p.customWidgetIds, key, thisFmm]);
    if (thisFmm.current)
        thisFmm.current.takeSnapshot();
    return thisMinimap;
};
// =================================================================================================================================
//						U S E F M M R E A C T P A N E L
// =================================================================================================================================
export var useFmmReactPanel = function (hostRef, detailParentRef, vertical) {
    var thisPanel = React.useRef();
    useOnceAfterFirstRender(function () {
        var panel = Fmm.createPanel(hostRef.current, detailParentRef === null || detailParentRef === void 0 ? void 0 : detailParentRef.current, vertical, undefined);
        thisPanel.current = {
            destroyDetached: function () { return panel.destroyDetached(); }
        };
        G.PANELS.set(thisPanel.current, panel);
        return function () {
            panel.destructor();
            G.PANELS.delete(thisPanel.current);
        };
    });
    return thisPanel;
};
// =================================================================================================================================
//						U S E F M M R E A C T S T O R E
// =================================================================================================================================
export var useFmmReactStore = function (values, errors) {
    var thisStore = React.useRef(new FmmMapStore(values, errors));
    thisStore.current.update(values, errors);
    return thisStore;
};
// =================================================================================================================================
//						U S E O N C E A F T E R F I R S T R E N D E R
// =================================================================================================================================
export var useOnceAfterFirstRender = function (fn) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return React.useEffect(fn, []);
};
// =================================================================================================================================
//						U S E S E T R E F
// =================================================================================================================================
export var useSetRef = function (ref, value) {
    return React.useEffect(function () {
        if (typeof ref === 'function')
            ref(value.current);
        else if (ref)
            ref.current = value.current;
    }, [ref, value]);
};
// =================================================================================================================================
// =================================================================================================================================
// =================================================	P R I V A T E	============================================================
// =================================================================================================================================
// =================================================================================================================================
// =================================================================================================================================
//						G
// =================================================================================================================================
var G = {
    PANELS: new WeakMap()
};
