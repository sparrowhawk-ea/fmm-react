import React from 'react';
import { FmmMapString, FmmFramework, FmmOnUpdate, FmmStore, FmmStoreValues, FmmStoreErrors } from '@eafmm/core';

interface FmmReactMinimap {
    destructor(): void;
    takeSnapshot(): boolean;
}
interface FmmReactMinimapProps {
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
declare const FmmReactMinimapTag: React.ForwardRefExoticComponent<FmmReactMinimapProps & React.RefAttributes<FmmReactMinimap>>;
interface FmmReactPanel {
    destroyDetached(): void;
}
interface FmmReactPanelProps {
    minimapsCount: number;
    detailParentRef?: React.RefObject<HTMLDivElement>;
    vertical?: boolean;
}
declare const FmmReactPanelTag: React.ForwardRefExoticComponent<FmmReactPanelProps & React.RefAttributes<FmmReactPanel>>;
interface FmmReactStoreProps {
    errors?: FmmStoreErrors;
    values: FmmStoreValues;
}
declare const FmmReactStoreTag: React.ForwardRefExoticComponent<FmmReactStoreProps & React.RefAttributes<FmmStore>>;
declare const useFmmReactMinimap: (key: string, form: React.RefObject<HTMLFormElement>, p: FmmReactMinimapProps) => React.RefObject<FmmReactMinimap>;
declare const useFmmReactPanel: (hostRef: React.RefObject<HTMLDivElement>, minimapsCount: number, detailParentRef?: React.RefObject<HTMLDivElement> | undefined, vertical?: boolean | undefined) => React.RefObject<FmmReactPanel>;
declare const useFmmReactStore: <TV extends FmmStoreValues, TE extends FmmStoreErrors>(values: TV, errors?: TE | undefined) => React.RefObject<FmmStore>;
declare const useOnceAfterFirstRender: (fn: () => void) => void;
declare const useSetRef: <T extends unknown>(ref: ((instance: T | null) => void) | React.ForwardedRef<T>, value: React.RefObject<T>) => void;

declare const FmmMaterialUI: FmmFramework;

export { FmmMaterialUI, FmmReactMinimap, FmmReactMinimapProps, FmmReactMinimapTag, FmmReactPanel, FmmReactPanelTag, FmmReactStoreTag, useFmmReactMinimap, useFmmReactPanel, useFmmReactStore, useOnceAfterFirstRender, useSetRef };
