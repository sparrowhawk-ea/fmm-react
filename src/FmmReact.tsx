import React from 'react';
import {
	Fmm,
	FmmFramework,
	FmmMapErrors,
	FmmMapStore,
	FmmMapString,
	FmmMapValues,
	FmmMinimap,
	FmmMinimapCreateParam,
	FmmOnUpdate,
	FmmPanel,
	FmmStore,
	FmmWidgetFactory
} from '@fmmp/core';

// =================================================================================================================================
//						F M M R E A C T M I N I M A P
// =================================================================================================================================
export interface FmmReactMinimap {
	destructor(): void;
	takeSnapshot(): boolean;
}

// =================================================================================================================================
//						F M M R E A C T M I N I M A P P R O P S
// =================================================================================================================================
export interface FmmReactMinimapProps {
	readonly aggregateLabels?: FmmMapString;
	readonly anchorRef?: React.RefObject<HTMLElement>;
	readonly debounceMsec?: number;
	readonly dynamicLabels?: string[];
	readonly framework?: FmmFramework;
	readonly onUpdate?: FmmOnUpdate;
	readonly pageRef?: React.RefObject<HTMLElement>;
	readonly panelRef: React.RefObject<FmmReactPanel>;
	readonly storeRef?: React.RefObject<FmmStore>;
	readonly title: string;
	readonly usePanelDetail?: boolean;
	readonly useWidthToScale?: boolean;
	readonly verbosity?: number;
	readonly widgetFactories?: FmmWidgetFactory[];
	customWidgetIds?: string[];
}

// =================================================================================================================================
//						F M M R E A C T M I N I M A P T
// =================================================================================================================================
const FmmReactMinimapFn: React.ForwardRefRenderFunction<FmmReactMinimap, FmmReactMinimapProps> = (
	{
		aggregateLabels,
		anchorRef,
		children,
		customWidgetIds,
		debounceMsec,
		dynamicLabels,
		framework,
		onUpdate,
		pageRef,
		panelRef,
		storeRef,
		title,
		usePanelDetail,
		useWidthToScale,
		verbosity,
		widgetFactories
	}: React.PropsWithChildren<FmmReactMinimapProps>,
	ref
) => {
	if (children) throw new Error('FmmReactMinimapT is a contentless tag');
	const thisForm = React.useRef<HTMLFormElement>();
	const setFormRef = (e: HTMLDivElement) => {
		let form = e?.parentElement;
		while (form && form.tagName !== 'FORM') form = form.parentElement;
		if (e && !form) throw new Error('FmmReactMinimapT must be used inside a FORM tag');
		thisForm.current = form as HTMLFormElement;
	};
	const p: FmmReactMinimapProps = {
		aggregateLabels,
		anchorRef,
		customWidgetIds,
		debounceMsec,
		dynamicLabels,
		framework,
		onUpdate,
		pageRef,
		panelRef,
		storeRef,
		title,
		usePanelDetail,
		useWidthToScale,
		verbosity,
		widgetFactories
	};
	useSetRef(ref, useFmmReactMinimap('', thisForm, p));
	return <div ref={setFormRef}></div>; // avoid using form element tag to keep out of the way of any form processing library
};
export const FmmReactMinimapT = React.forwardRef(FmmReactMinimapFn);

// =================================================================================================================================
//						F M M R E A C T P A N E L
// =================================================================================================================================
export interface FmmReactPanel {
	destroyDetached(): void;
}

// =================================================================================================================================
//						F M M R E A C T P A N E L T
// =================================================================================================================================
interface FmmReactPanelProps {
	detailParentRef?: React.RefObject<HTMLDivElement>;
	vertical?: boolean;
}
const FmmReactPanelFn: React.ForwardRefRenderFunction<FmmReactPanel, FmmReactPanelProps> = (
	{ children, detailParentRef, vertical = false }: React.PropsWithChildren<FmmReactPanelProps>,
	ref
) => {
	if (children) throw new Error('FmmReactPanelT is a contentless tag');
	const thisHost = React.useRef<HTMLDivElement>();
	useSetRef(ref, useFmmReactPanel(thisHost, detailParentRef, vertical));
	return (
		<div className='fmm-panel' ref={thisHost}>
			<style>{Fmm.CSS}</style>
		</div>
	);
};
export const FmmReactPanelT = React.forwardRef(FmmReactPanelFn);

// =================================================================================================================================
//						F M M R E A C T S T O R E T
// =================================================================================================================================
interface FmmReactStoreProps {
	errors?: FmmMapErrors;
	values: FmmMapValues;
}
const FmmReactStoreFn: React.ForwardRefRenderFunction<FmmStore, FmmReactStoreProps> = (
	{ children, errors, values }: React.PropsWithChildren<FmmReactStoreProps>,
	ref
) => {
	if (children) throw new Error('FmmReactStoreT is a contentless tag');
	useSetRef(ref, useFmmReactStore(values, errors));
	return null;
};
export const FmmReactStoreT = React.forwardRef(FmmReactStoreFn);

// =================================================================================================================================
//						U S E F M M R E A C T M I N I M A P
// =================================================================================================================================
export const useFmmReactMinimap = (key: string, form: React.RefObject<HTMLFormElement>, p: FmmReactMinimapProps):
	React.RefObject<FmmReactMinimap> => {
	const thisFmm = React.useRef<FmmMinimap>();
	const thisMinimap = React.useRef<FmmReactMinimap>();
	const createMinimap = (): (() => void) => {
		const fmcp: FmmMinimapCreateParam = {
			aggregateLabels: p.aggregateLabels,
			anchor: p.anchorRef?.current,
			debounceMsec: p.debounceMsec,
			dynamicLabels: p.dynamicLabels,
			form: form.current,
			framework: p.framework,
			onUpdate: p.onUpdate,
			page: p.pageRef?.current,
			store: p.storeRef?.current,
			title: p.title,
			usePanelDetail: p.usePanelDetail,
			useWidthToScale: p.useWidthToScale,
			verbosity: p.verbosity,
			widgetFactories: p.widgetFactories
		};
		const panelX = p.panelRef?.current ? G.PANELS.get(p.panelRef.current) : undefined;
		thisFmm.current = panelX?.createMinimap(fmcp);
		if (!thisFmm.current) return undefined;
		thisMinimap.current = {
			destructor: () => thisFmm.current?.destructor(),
			takeSnapshot: () => thisFmm.current?.takeSnapshot()
		};
		return () => {
			if (thisFmm.current) thisFmm.current.detach();
			thisFmm.current = undefined;
		};
	};
	useOnceAfterFirstRender(createMinimap);
	React.useEffect(() => {
		if (thisFmm.current) thisFmm.current.destructor();
		thisMinimap.current = thisFmm.current = undefined;
		return createMinimap();
	}, [key]);
	React.useEffect(() => {
		if (thisFmm.current) thisFmm.current.compose(p.customWidgetIds);
	}, [p.customWidgetIds, key, thisFmm]);
	if (thisFmm.current) thisFmm.current.takeSnapshot();
	return thisMinimap;
};

// =================================================================================================================================
//						U S E F M M R E A C T P A N E L
// =================================================================================================================================
export const useFmmReactPanel = (
	hostRef: React.RefObject<HTMLDivElement>,
	detailParentRef?: React.RefObject<HTMLDivElement>,
	vertical?: boolean
): React.RefObject<FmmReactPanel> => {
	const thisPanel = React.useRef<FmmReactPanel>();
	useOnceAfterFirstRender(() => {
		const panel = Fmm.createPanel(undefined, hostRef.current, detailParentRef?.current, vertical);
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

// =================================================================================================================================
//						U S E F M M R E A C T S T O R E
// =================================================================================================================================
export const useFmmReactStore = <TV extends FmmMapValues, TE extends FmmMapErrors>(
	values: TV,
	errors?: TE
): React.RefObject<FmmStore> => {
	const thisStore = React.useRef(new FmmMapStore(values, errors));
	thisStore.current.update(values, errors);
	return thisStore;
};

// =================================================================================================================================
//						U S E O N C E A F T E R F I R S T R E N D E R
// =================================================================================================================================
export const useOnceAfterFirstRender = (fn: () => void): void =>
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(fn, []);

// =================================================================================================================================
//						U S E S E T R E F
// =================================================================================================================================
export const useSetRef = <T extends unknown>(
	ref: React.RefCallback<T> | React.MutableRefObject<T>,
	value: React.RefObject<T>
): void =>
	React.useEffect(() => {
		if (typeof ref === 'function') ref(value.current);
		else if (ref) ref.current = value.current;
	}, [ref, value]);

// =================================================================================================================================
// =================================================================================================================================
// =================================================	P R I V A T E	============================================================
// =================================================================================================================================
// =================================================================================================================================

// =================================================================================================================================
//						G
// =================================================================================================================================
const G: {
	PANELS: WeakMap<FmmReactPanel, FmmPanel>;
} = {
	PANELS: new WeakMap()
};
