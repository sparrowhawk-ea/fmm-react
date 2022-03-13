import React from 'react';
import {
	Fmm,
	FmmFormHTML,
	FmmFramework,
	FmmMapString,
	FmmMinimap,
	FmmMinimapCreateParam,
	FmmOnUpdate,
	FmmPanel,
	FmmStore,
	FmmStoreErrors,
	FmmStoreImpl,
	FmmStoreValues
} from '@eafmm/core';

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
	readonly anchorRef?: React.RefObject<HTMLDivElement>;
	readonly debounceMsec?: number;
	readonly dynamicLabels?: string[];
	readonly framework?: FmmFramework;
	readonly onUpdate?: FmmOnUpdate;
	readonly ordinal?: number;
	readonly pageRef?: React.RefObject<HTMLElement>;
	readonly panelRef?: React.RefObject<FmmReactPanel>;
	readonly storeRef?: React.RefObject<FmmStore>;
	readonly title: string;
	readonly usePanelDetail?: boolean;
	readonly useWidthToScale?: boolean;
	readonly verbosity?: number;
	readonly zoomFactor?: number;
	customElementIds?: string[];
}

// =================================================================================================================================
//						F M M R E A C T M I N I M A P T A G
// =================================================================================================================================
const FmmReactMinimapFn: React.ForwardRefRenderFunction<FmmReactMinimap, FmmReactMinimapProps> = (
	{
		aggregateLabels,
		anchorRef,
		children,
		customElementIds,
		debounceMsec,
		dynamicLabels,
		framework,
		onUpdate,
		ordinal,
		pageRef,
		panelRef,
		storeRef,
		title,
		usePanelDetail,
		useWidthToScale,
		verbosity,
		zoomFactor,
		...otherAttributes
	}: React.PropsWithChildren<FmmReactMinimapProps>,
	ref
) => {
	if (children) throw new Error('FmmReactMinimapTag is a contentless tag');
	const thisForm = React.useRef<HTMLFormElement | null>(null);
	const setFormRef = (e: HTMLDivElement) => {
		let form = e?.parentElement;
		while (form && form.tagName !== 'FORM') form = form.parentElement;
		if (e && !form) throw new Error('FmmReactMinimapTag must be used inside a FORM tag');
		thisForm.current = form as HTMLFormElement;
	};
	const p: FmmReactMinimapProps = {
		aggregateLabels,
		anchorRef,
		customElementIds,
		debounceMsec,
		dynamicLabels,
		framework,
		onUpdate,
		ordinal,
		pageRef,
		panelRef,
		storeRef,
		title,
		usePanelDetail,
		useWidthToScale,
		verbosity,
		zoomFactor
	};
	useSetRef(ref, useFmmReactMinimap('', thisForm, p));
	return React.createElement('div', { // don't create form element tag to keep out of the way of any form processing library
		...otherAttributes,
		ref: setFormRef
	});
};
export const FmmReactMinimapTag = React.forwardRef(FmmReactMinimapFn);

// =================================================================================================================================
//						F M M R E A C T P A N E L
// =================================================================================================================================
export interface FmmReactPanel {
	destroyDetached(): void;
}

// =================================================================================================================================
//						F M M R E A C T P A N E L T A G
// =================================================================================================================================
interface FmmReactPanelProps {
	minimapsCount: number;
	detailParentRef?: React.RefObject<HTMLDivElement>;
	vertical?: boolean;
}
const FmmReactPanelFn: React.ForwardRefRenderFunction<FmmReactPanel, FmmReactPanelProps> = (
	{ children, minimapsCount, detailParentRef, vertical = false }: React.PropsWithChildren<FmmReactPanelProps>,
	ref
) => {
	if (children) throw new Error('FmmReactPanelTag is a contentless tag');
	const thisHost = React.useRef<HTMLDivElement>(null);
	useSetRef(ref, useFmmReactPanel(thisHost, minimapsCount, detailParentRef, vertical));
	return (
		<div className='fmm-panel' ref={thisHost}>
			<style>{Fmm.CSS}</style>
		</div>
	);
};
export const FmmReactPanelTag = React.forwardRef(FmmReactPanelFn);

// =================================================================================================================================
//						F M M R E A C T S T O R E T A G
// =================================================================================================================================
interface FmmReactStoreProps {
	errors?: FmmStoreErrors;
	values: FmmStoreValues;
}
const FmmReactStoreFn: React.ForwardRefRenderFunction<FmmStore, FmmReactStoreProps> = (
	{ children, errors, values }: React.PropsWithChildren<FmmReactStoreProps>,
	ref
) => {
	if (children) throw new Error('FmmReactStoreTag is a contentless tag');
	useSetRef(ref, useFmmReactStore(values, errors));
	return null;
};
export const FmmReactStoreTag = React.forwardRef(FmmReactStoreFn);

// =================================================================================================================================
//						U S E F M M R E A C T M I N I M A P
// =================================================================================================================================
export const useFmmReactMinimap = (key: string, form: React.RefObject<HTMLFormElement>, p: FmmReactMinimapProps):
	React.RefObject<FmmReactMinimap> => {
	const thisFmm = React.useRef<FmmMinimap>();
	const thisMinimap = React.useRef<FmmReactMinimap | null>(null);
	const createMinimap = (): (() => void) => {
		const fmcp: FmmMinimapCreateParam = {
			aggregateLabels: p.aggregateLabels,
			anchor: p.anchorRef?.current as HTMLDivElement,
			debounceMsec: p.debounceMsec,
			dynamicLabels: p.dynamicLabels,
			form: new FmmFormHTML(form.current as HTMLFormElement, p.pageRef?.current as HTMLElement),
			framework: p.framework,
			onUpdate: p.onUpdate,
			ordinal: p.ordinal,
			store: p.storeRef?.current as FmmStore,
			title: p.title,
			usePanelDetail: p.usePanelDetail,
			useWidthToScale: p.useWidthToScale,
			verbosity: p.verbosity,
			zoomFactor: p.zoomFactor
		};
		const panelX = p.panelRef?.current ? G.PANELS.get(p.panelRef.current) : undefined;
		thisFmm.current = panelX ? panelX.createMinimap(fmcp) : Fmm.createMinimap(fmcp);
		if (!thisFmm.current) return () => { /**/ };
		thisMinimap.current = {
			destructor: () => thisFmm.current?.destructor(),
			takeSnapshot: () => !!thisFmm.current?.takeSnapshot()
		};
		return () => {
			if (thisFmm.current) thisFmm.current.detach();
			thisFmm.current = undefined;
		};
	};
	useOnceAfterFirstRender(createMinimap);
	React.useEffect(() => {
		if (thisFmm.current) thisFmm.current.destructor();
		thisMinimap.current = null;
		thisFmm.current = undefined;
		return createMinimap();
	}, [key]);
	React.useEffect(() => {
		if (thisFmm.current) thisFmm.current.compose(p.customElementIds);
	}, [p.customElementIds, key, thisFmm]);
	if (thisFmm.current) thisFmm.current.takeSnapshot();
	return thisMinimap;
};

// =================================================================================================================================
//						U S E F M M R E A C T P A N E L
// =================================================================================================================================
export const useFmmReactPanel = (
	hostRef: React.RefObject<HTMLDivElement>,
	minimapsCount: number,
	detailParentRef?: React.RefObject<HTMLDivElement>,
	vertical?: boolean
): React.RefObject<FmmReactPanel> => {
	const thisPanel = React.useRef<FmmReactPanel | null>(null);
	useOnceAfterFirstRender(() => {
		const panel = Fmm.createPanel(hostRef.current as HTMLDivElement, minimapsCount, detailParentRef?.current as HTMLDivElement, vertical, undefined);
		thisPanel.current = {
			destroyDetached: () => panel.destroyDetached()
		};
		G.PANELS.set(thisPanel.current, panel);
		return () => {
			panel.destructor();
			G.PANELS.delete(thisPanel.current as FmmReactPanel);
		};
	});
	return thisPanel;
};

// =================================================================================================================================
//						U S E F M M R E A C T S T O R E
// =================================================================================================================================
export const useFmmReactStore = <TV extends FmmStoreValues, TE extends FmmStoreErrors>(
	values: TV,
	errors?: TE
): React.RefObject<FmmStore> => {
	const thisStore = React.useRef(new FmmStoreImpl(values, errors));
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
export const useSetRef = <T,>(
	ref: React.RefCallback<T> | React.ForwardedRef<T>,
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
