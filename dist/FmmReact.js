"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetRef = exports.useOnceAfterFirstRender = exports.useFmmReactStore = exports.useFmmReactPanel = exports.useFmmReactMinimap = exports.FmmReactStoreT = exports.FmmReactPanelT = exports.FmmReactMinimapT = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
var core_1 = require("@fmmp/core");
// =================================================================================================================================
//						F M M R E A C T M I N I M A P T
// =================================================================================================================================
var FmmReactMinimapFn = function (_a, ref) {
    var aggregateLabels = _a.aggregateLabels, anchorRef = _a.anchorRef, children = _a.children, customWidgetIds = _a.customWidgetIds, debounceMsec = _a.debounceMsec, dynamicLabels = _a.dynamicLabels, framework = _a.framework, onUpdate = _a.onUpdate, pageRef = _a.pageRef, panelRef = _a.panelRef, storeRef = _a.storeRef, title = _a.title, usePanelDetail = _a.usePanelDetail, useWidthToScale = _a.useWidthToScale, verbosity = _a.verbosity, widgetFactories = _a.widgetFactories;
    if (children)
        throw new Error('FmmReactMinimapT is a contentless tag');
    var thisForm = react_1.default.useRef();
    var setFormRef = function (e) {
        var form = e === null || e === void 0 ? void 0 : e.parentElement;
        while (form && form.tagName !== 'FORM')
            form = form.parentElement;
        if (e && !form)
            throw new Error('FmmReactMinimapT must be used inside a FORM tag');
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
        storeRef: storeRef,
        title: title,
        usePanelDetail: usePanelDetail,
        useWidthToScale: useWidthToScale,
        verbosity: verbosity,
        widgetFactories: widgetFactories
    };
    exports.useSetRef(ref, exports.useFmmReactMinimap('', thisForm, p));
    return react_1.default.createElement("div", { ref: setFormRef }); // avoid using form element tag to keep out of the way of any form processing library
};
exports.FmmReactMinimapT = react_1.default.forwardRef(FmmReactMinimapFn);
var FmmReactPanelFn = function (_a, ref) {
    var children = _a.children, detailParentRef = _a.detailParentRef, _b = _a.vertical, vertical = _b === void 0 ? false : _b;
    if (children)
        throw new Error('FmmReactPanelT is a contentless tag');
    var thisHost = react_1.default.useRef();
    exports.useSetRef(ref, exports.useFmmReactPanel(thisHost, detailParentRef, vertical));
    return (react_1.default.createElement("div", { className: 'fmm-panel', ref: thisHost },
        react_1.default.createElement("style", null, core_1.Fmm.CSS)));
};
exports.FmmReactPanelT = react_1.default.forwardRef(FmmReactPanelFn);
var FmmReactStoreFn = function (_a, ref) {
    var children = _a.children, errors = _a.errors, values = _a.values;
    if (children)
        throw new Error('FmmReactStoreT is a contentless tag');
    exports.useSetRef(ref, exports.useFmmReactStore(values, errors));
    return null;
};
exports.FmmReactStoreT = react_1.default.forwardRef(FmmReactStoreFn);
// =================================================================================================================================
//						U S E F M M R E A C T M I N I M A P
// =================================================================================================================================
var useFmmReactMinimap = function (key, form, p) {
    var thisFmm = react_1.default.useRef();
    var thisMinimap = react_1.default.useRef();
    var createMinimap = function () {
        var _a, _b, _c, _d;
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
        thisFmm.current = panelX === null || panelX === void 0 ? void 0 : panelX.createMinimap(fmcp);
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
    exports.useOnceAfterFirstRender(createMinimap);
    react_1.default.useEffect(function () {
        if (thisFmm.current)
            thisFmm.current.destructor();
        thisMinimap.current = thisFmm.current = undefined;
        return createMinimap();
    }, [key]);
    react_1.default.useEffect(function () {
        if (thisFmm.current)
            thisFmm.current.compose(p.customWidgetIds);
    }, [p.customWidgetIds, key, thisFmm]);
    if (thisFmm.current)
        thisFmm.current.takeSnapshot();
    return thisMinimap;
};
exports.useFmmReactMinimap = useFmmReactMinimap;
// =================================================================================================================================
//						U S E F M M R E A C T P A N E L
// =================================================================================================================================
var useFmmReactPanel = function (hostRef, detailParentRef, vertical) {
    var thisPanel = react_1.default.useRef();
    exports.useOnceAfterFirstRender(function () {
        var panel = core_1.Fmm.createPanel(undefined, hostRef.current, detailParentRef === null || detailParentRef === void 0 ? void 0 : detailParentRef.current, vertical);
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
exports.useFmmReactPanel = useFmmReactPanel;
// =================================================================================================================================
//						U S E F M M R E A C T S T O R E
// =================================================================================================================================
var useFmmReactStore = function (values, errors) {
    var thisStore = react_1.default.useRef(new core_1.FmmMapStore(values, errors));
    thisStore.current.update(values, errors);
    return thisStore;
};
exports.useFmmReactStore = useFmmReactStore;
// =================================================================================================================================
//						U S E O N C E A F T E R F I R S T R E N D E R
// =================================================================================================================================
var useOnceAfterFirstRender = function (fn) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return react_1.default.useEffect(fn, []);
};
exports.useOnceAfterFirstRender = useOnceAfterFirstRender;
// =================================================================================================================================
//						U S E S E T R E F
// =================================================================================================================================
var useSetRef = function (ref, value) {
    return react_1.default.useEffect(function () {
        if (typeof ref === 'function')
            ref(value.current);
        else if (ref)
            ref.current = value.current;
    }, [ref, value]);
};
exports.useSetRef = useSetRef;
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
