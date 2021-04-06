import React from 'react';
import { FmmFramework, FmmMapErrors, FmmMapString, FmmMapValues, FmmOnUpdate, FmmStore, FmmWidgetFactory } from '@fmmp/core';
export interface FmmReactMinimap {
    destructor(): void;
    takeSnapshot(): boolean;
}
export interface FmmReactMinimapProps {
    readonly aggregateLabels?: FmmMapString;
    readonly anchor?: React.RefObject<HTMLElement>;
    readonly debounceMsec?: number;
    readonly dynamicLabels?: string[];
    readonly framework?: FmmFramework;
    readonly onUpdate?: FmmOnUpdate;
    readonly page?: React.RefObject<HTMLElement>;
    readonly panel: React.RefObject<FmmReactPanel>;
    readonly store?: React.RefObject<FmmStore>;
    readonly title: string;
    readonly usePanelDetail?: boolean;
    readonly useWidthToScale?: boolean;
    readonly verbosity?: number;
    readonly widgetFactories?: FmmWidgetFactory[];
    customWidgetIds?: string[];
}
export declare const FmmReactMinimapT: React.ForwardRefExoticComponent<FmmReactMinimapProps & React.RefAttributes<FmmReactMinimap>>;
export interface FmmReactPanel {
    destroyDetached(): void;
}
interface FmmReactPanelProps {
    refDetailParent: React.RefObject<HTMLDivElement>;
    vertical?: boolean;
}
export declare const FmmReactPanelT: React.ForwardRefExoticComponent<FmmReactPanelProps & React.RefAttributes<FmmReactPanel>>;
interface FmmReactStoreProps {
    errors?: FmmMapErrors;
    values: FmmMapValues;
}
export declare const FmmReactStoreT: React.ForwardRefExoticComponent<FmmReactStoreProps & React.RefAttributes<FmmStore>>;
export declare const useFmmReactMinimap: (key: string, form: React.RefObject<HTMLFormElement>, p: FmmReactMinimapProps) => React.RefObject<FmmReactMinimap>;
export declare const useFmmReactPanel: (host: React.RefObject<HTMLDivElement>, detailParent: React.RefObject<HTMLDivElement>, vertical?: boolean) => React.RefObject<FmmReactPanel>;
export declare const useFmmReactStore: <TV extends FmmMapValues, TE extends FmmMapErrors>(values: TV, errors?: TE) => React.RefObject<FmmStore>;
export declare const useOnceAfterFirstRender: (fn: () => void) => void;
export declare const useSetRef: <T extends unknown>(ref: ((instance: T) => void) | React.MutableRefObject<T>, value: React.RefObject<T>) => void;
export {};
