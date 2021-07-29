import React from 'react';
import { FmmFramework, FmmMapErrors, FmmMapString, FmmMapValues, FmmOnUpdate, FmmStore, FmmWidgetFactory } from '@eafmm/core';
export interface FmmReactMinimap {
    destructor(): void;
    takeSnapshot(): boolean;
}
export interface FmmReactMinimapProps {
    readonly aggregateLabels?: FmmMapString;
    readonly anchorRef?: React.RefObject<HTMLElement>;
    readonly debounceMsec?: number;
    readonly dynamicLabels?: string[];
    readonly framework?: FmmFramework;
    readonly onUpdate?: FmmOnUpdate;
    readonly pageRef?: React.RefObject<HTMLElement>;
    readonly panelRef?: React.RefObject<FmmReactPanel>;
    readonly parentRef?: React.RefObject<HTMLElement>;
    readonly storeRef?: React.RefObject<FmmStore>;
    readonly title: string;
    readonly usePanelDetail?: boolean;
    readonly useWidthToScale?: boolean;
    readonly verbosity?: number;
    readonly widgetFactories?: FmmWidgetFactory[];
    customWidgetIds?: string[];
}
export declare const FmmReactMinimapTag: React.ForwardRefExoticComponent<FmmReactMinimapProps & React.RefAttributes<FmmReactMinimap>>;
export interface FmmReactPanel {
    destroyDetached(): void;
}
interface FmmReactPanelProps {
    detailParentRef?: React.RefObject<HTMLDivElement>;
    vertical?: boolean;
}
export declare const FmmReactPanelTag: React.ForwardRefExoticComponent<FmmReactPanelProps & React.RefAttributes<FmmReactPanel>>;
interface FmmReactStoreProps {
    errors?: FmmMapErrors;
    values: FmmMapValues;
}
export declare const FmmReactStoreTag: React.ForwardRefExoticComponent<FmmReactStoreProps & React.RefAttributes<FmmStore>>;
export declare const useFmmReactMinimap: (key: string, form: React.RefObject<HTMLFormElement>, p: FmmReactMinimapProps) => React.RefObject<FmmReactMinimap>;
export declare const useFmmReactPanel: (hostRef: React.RefObject<HTMLDivElement>, detailParentRef?: React.RefObject<HTMLDivElement>, vertical?: boolean) => React.RefObject<FmmReactPanel>;
export declare const useFmmReactStore: <TV extends FmmMapValues, TE extends FmmMapErrors>(values: TV, errors?: TE) => React.RefObject<FmmStore>;
export declare const useOnceAfterFirstRender: (fn: () => void) => void;
export declare const useSetRef: <T extends unknown>(ref: ((instance: T) => void) | React.MutableRefObject<T>, value: React.RefObject<T>) => void;
export {};
