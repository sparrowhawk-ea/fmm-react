# Form Minimap React
React components and hooks for [Form Minimap](https://github.com/sparrowhawk-ea/fmmp-core).
Please consult that documentation for further information on the concepts mentioned below.

***
# Getting Started
## Installation
```bash
npm install --save @fmmp/react
```

## Adding Form Minimap
Before
```jsx
    function App() {
        return (
            <div className="App">
                <form>
                    <input id="Input1"/><br/>
                    <input id="Input2"/><br/>
                    <input id="Input3"/><br/>
                    <input id="Input4"/>
                </form>
            </div>
        );
    }

    export default App;
```
After
```jsx
    import React from 'react';
    import { FmmReactMinimapT, FmmReactPanelT } from '@fmmp/react';

    function App() {
        var anchorRef = React.useRef();
        var panelRef = React.useRef();
        var css = '.fmm-frame { height: 50px; } .fmm-panel { height: 0; }';
        return (
            <div className="App">
                <style>{css}</style>
                <div ref={anchorRef} style={{width:'20px', height:'20px', marginLeft:'200px'}}></div>
                <FmmReactPanelT ref={panelRef}/>
                <form>
                    <FmmReactMinimapT anchorRef={anchorRef} panelRef={panelRef} title='Title'/>
                    <input id="Input1"/><br/>
                    <input id="Input2"/><br/>
                    <input id="Input3"/><br/>
                    <input id="Input4"/>
                </form>
            </div>
        );
    }

    export default App;
```

***
# API
## FmmReactMinimap
Adapter for [FmmMinimap](https://github.com/sparrowhawk-ea/fmmp-core#fmmminimap) returned from [FmmReactMinimapT](#fmmreactminimapt) or [useFmmReactMinimap](#usefmmreactminimap).

| Method
| ---
| [destructor](https://github.com/sparrowhawk-ea/fmmp-core#mm-destructor)
| [takeSnapshot](https://github.com/sparrowhawk-ea/fmmp-core#mm-takesnapshot)

***
## FmmReactMinimapT
Component to create and manage a [FmmReactMinimap](#fmmreactminimap).
The minimap is detached when this component is destroyed.

Property | Type | Required
--- | --- | :---:
[aggregateLabels](https://github.com/sparrowhawk-ea/fmmp-core#mcp-aggregatelabels) | [FmmMapString](https://github.com/sparrowhawk-ea/fmmp-core#fmmmapstring)
[anchorRef](https://github.com/sparrowhawk-ea/fmmp-core#mcp-anchor) | React.RefObject\<HTMLElement\>
[customWidgetIds](https://github.com/sparrowhawk-ea/fmmp-core#mm-compose-customwidgetids) | string[]
[debounceMsec](https://github.com/sparrowhawk-ea/fmmp-core#mcp-debouncemsec) | number
[dynamicLabels](https://github.com/sparrowhawk-ea/fmmp-core#mcp-dynamiclabels) | string[]
[framework](https://github.com/sparrowhawk-ea/fmmp-core#mcp-framework) | [FmmFramework](https://github.com/sparrowhawk-ea/fmmp-core#fmmframework)
[onUpdate](https://github.com/sparrowhawk-ea/fmmp-core#mcp-onupdate) | [FmmOnUpdate](https://github.com/sparrowhawk-ea/fmmp-core#fmmonupdate)
[pageRef](https://github.com/sparrowhawk-ea/fmmp-core#mcp-page) | React.RefObject\<HTMLElement\>
panelRef | React.RefObject\<[FmmReactPanel](#fmmreactpanelt)\> | &check;
[storeRef](https://github.com/sparrowhawk-ea/fmmp-core#mcp-store) | React.RefObject\<[FmmStore](https://github.com/sparrowhawk-ea/fmmp-core#fmmstore)\>
[title](https://github.com/sparrowhawk-ea/fmmp-core#mcp-title) | string | &check;
[usePanelDetail](https://github.com/sparrowhawk-ea/fmmp-core#mcp-usepaneldetail) | boolean
[useWidthToScale](https://github.com/sparrowhawk-ea/fmmp-core#mcp-usewidthtoscale) | boolean
[verbosity](https://github.com/sparrowhawk-ea/fmmp-core#mcp-verbosity) | number
[widgetFactories](https://github.com/sparrowhawk-ea/fmmp-core#mcp-widgetfactories) | [FmmWidgetFactory](https://github.com/sparrowhawk-ea/fmmp-core#fmmwidgetfactory)[]

***
## useFmmReactMinimap
Hook version of [FmmReactMinimapT](#fmmreactminimapt) that returns a [FmmReactMinimap](#fmmreactminimap).

Parameter | Type | Required | Description
--- | --- | :---: | ---
key | string | &check; | Minimap is recreated when key changes.  Any previous minimap is detached.
[form](https://github.com/sparrowhawk-ea/fmmp-core#fmmminimapcreateparam) | React.RefObject\<HTMLFormElement\> | &check;
p | FmmReactMinimapProps | &check; | Object with properties of [FmmReactMinimapT](#fmmreactminimapt).

***
## FmmReactPanel
Adapter for [FmmPanel](https://github.com/sparrowhawk-ea/fmmp-core#fmmmpanel) returned from [FmmReactPanelT](#fmmreactpanelt) or [useFmmReactPanel](#usefmmreactpanel).

| Method
| ---
| [destroyDetached](https://github.com/sparrowhawk-ea/fmmp-core#pm-destroydetached)

***
## FmmReactPanelT
Component to create and manage a [FmmReactPanel](#fmmreactpanel).

Property | Type | Required
--- | --- | :---:
[detailParentRef](https://github.com/sparrowhawk-ea/fmmp-core#pcp-detailparent) | React.RefObject\<HTMLDivElement\>
[vertical](https://github.com/sparrowhawk-ea/fmmp-core#pcp-vertical) | boolean

***
## useFmmReactPanel
Hook version of [FmmReactPanelT](#fmmreactpanelt) that returns a [FmmReactPanel](#fmmreactpanel).

Parameter | Type | Required
--- | --- | :---:
[hostRef](https://github.com/sparrowhawk-ea/fmmp-core#fmmcreatepanel) | string | &check;
[detailParentRef](https://github.com/sparrowhawk-ea/fmmp-core#fmmcreatepanel) | React.RefObject\<HTMLDivElement\>
[vertical](https://github.com/sparrowhawk-ea/fmmp-core#fmmcreatepanel) | boolean

***
## FmmReactStoreT
Component to create and manage a [FmmStore](https://github.com/sparrowhawk-ea/fmmp-core#fmmstore).

Property | Type | Required
--- | --- | :---:
[errors](https://github.com/sparrowhawk-ea/fmmp-core#fmmcreatestore) | [FmmMapErrors](https://github.com/sparrowhawk-ea/fmmp-core#fmmmaperrors)
[values](https://github.com/sparrowhawk-ea/fmmp-core#fmmcreatestore) | [FmmMapValues](https://github.com/sparrowhawk-ea/fmmp-core#fmmmapvalues) | &check;

***
## useFmmReactStore
Hook version of [FmmReactStoreT](#fmmreactstoret) that returns a [FmmStore](https://github.com/sparrowhawk-ea/fmmp-core#fmmstore).

Parameter | Type | Required
--- | --- | :---:
[values](https://github.com/sparrowhawk-ea/fmmp-core#scp-values) | [FmmMapValues](https://github.com/sparrowhawk-ea/fmmp-core#fmmmapvalues) | &check;
[errors](https://github.com/sparrowhawk-ea/fmmp-core#scp-errors) | [FmmMapErrors](https://github.com/sparrowhawk-ea/fmmp-core#fmmmaperrors)
