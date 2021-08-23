# Form Minimap React
React components and hooks for [Form Minimap](https://www.npmjs.com/package/@eafmm/core).
Please consult that documentation for further information on the concepts mentioned below.

***
# Getting Started
## Installation
```bash
npm install --save @fmm/react
```

## Adding Form Minimap
The code sample below shows the lines added to a simple form to add a minimap (M) or a minimap with panel (P)
```jsx
M P         import React from 'react';
M           import { FmmReactMinimapTag } from '@eafmm/react';
  P         import { FmmReactMinimapTag, FmmReactPanelTag } from '@eafmm/react';

            function App() {
M               var parentRef = React.useRef();
  P             var anchorRef = React.useRef();
  P             var panelRef = React.useRef();
M               var css = '.fmm-frame { height: 50px; }';
  P             var css = '.fmm-frame { height: 50px; } .fmm-panel { height: 0; }';
                return (
                    <div className="App">
M P                     <style>{css}</style>
M                       <div ref={parentRef} style={{width:'70px', height:'50px', marginLeft:'200px'}}></div>
  P                     <div ref={anchorRef} style={{width:'20px', height:'20px', marginLeft:'200px'}}></div>
  P                     <FmmReactPanelTag ref={panelRef}/>
                        <form>
M                           <FmmReactMinimapTag parentRef={parentRef} title='Title'/>
  P                         <FmmReactMinimapTag anchorRef={anchorRef} panelRef={panelRef} title='Title'/>
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
Adapter for [FmmMinimap](https://www.npmjs.com/package/@eafmm/core#fmmminimap) returned from [FmmReactMinimapTag](#fmmreactminimaptag) or [useFmmReactMinimap](#usefmmreactminimap).

| Method
| ---
| [destructor](https://www.npmjs.com/package/@eafmm/core#mm-destructor)
| [takeSnapshot](https://www.npmjs.com/package/@eafmm/core#mm-takesnapshot)

***
## FmmReactMinimapTag
Component to create and manage a [FmmReactMinimap](#fmmreactminimap).
The minimap is detached when this component is destroyed.
For minimaps in a panel, use the panelRef property; otherwise use the parentRef property to show an always-visible minimap, or anchorRef for a popup minimap.

Property | Type | Required
--- | --- | :---:
[aggregateLabels](https://www.npmjs.com/package/@eafmm/core#mcp-aggregatelabels) | [FmmMapString](https://www.npmjs.com/package/@eafmm/core#fmmmapstring)
[anchorRef](https://www.npmjs.com/package/@eafmm/core#mcp-anchor) | React.RefObject\<HTMLElement\>
[customElementIds](https://www.npmjs.com/package/@eafmm/core#mm-compose-customelementids) | string[]
[debounceMsec](https://www.npmjs.com/package/@eafmm/core#mcp-debouncemsec) | number
[dynamicLabels](https://www.npmjs.com/package/@eafmm/core#mcp-dynamiclabels) | string[]
[framework](https://www.npmjs.com/package/@eafmm/core#mcp-framework) | [FmmFramework](https://www.npmjs.com/package/@eafmm/core#fmmframework)
[onUpdate](https://www.npmjs.com/package/@eafmm/core#mcp-onupdate) | [FmmOnUpdate](https://www.npmjs.com/package/@eafmm/core#fmmonupdate)
[pageRef](https://www.npmjs.com/package/@eafmm/core#fmmform-page) | React.RefObject\<HTMLElement\>
panelRef | React.RefObject\<[FmmReactPanel](#fmmreactpanelt)\>
[parentRef](https://www.npmjs.com/package/@eafmm/core#pcm-parent) | React.RefObject\<HTMLElement\>
[storeRef](https://www.npmjs.com/package/@eafmm/core#mcp-store) | React.RefObject\<[FmmStore](https://www.npmjs.com/package/@eafmm/core#fmmstore)\>
[title](https://www.npmjs.com/package/@eafmm/core#mcp-title) | string | &check;
[usePanelDetail](https://www.npmjs.com/package/@eafmm/core#mcp-usepaneldetail) | boolean
[useWidthToScale](https://www.npmjs.com/package/@eafmm/core#mcp-usewidthtoscale) | boolean
[verbosity](https://www.npmjs.com/package/@eafmm/core#mcp-verbosity) | number
[zoomFactor](https://www.npmjs.com/package/@eafmm/core#mcp-zoomfactor) | number

***
## useFmmReactMinimap
Hook version of [FmmReactMinimapTag](#fmmreactminimaptag) that returns a [FmmReactMinimap](#fmmreactminimap).

Parameter | Type | Required | Description
--- | --- | :---: | ---
key | string | &check; | Minimap is recreated when key changes.  Any previous minimap is detached.
[form](https://www.npmjs.com/package/@eafmm/core#fmmminimapcreateparam) | React.RefObject\<HTMLFormElement\> | &check;
p | FmmReactMinimapProps | &check; | Object with properties of [FmmReactMinimapTag](#fmmreactminimaptag).

***
## FmmReactPanel
Adapter for [FmmPanel](https://www.npmjs.com/package/@eafmm/core#fmmpanel) returned from [FmmReactPanelTag](#fmmreactpaneltag) or [useFmmReactPanel](#usefmmreactpanel).

| Method
| ---
| [destroyDetached](https://www.npmjs.com/package/@eafmm/core#pm-destroydetached)

***
## FmmReactPanelTag
Component to create and manage a [FmmReactPanel](#fmmreactpanel).

Property | Type | Required
--- | --- | :---:
[detailParentRef](https://www.npmjs.com/package/@eafmm/core#pcp-detailparent) | React.RefObject\<HTMLDivElement\>
[vertical](https://www.npmjs.com/package/@eafmm/core#pcp-vertical) | boolean

***
## useFmmReactPanel
Hook version of [FmmReactPanelTag](#fmmreactpaneltag) that returns a [FmmReactPanel](#fmmreactpanel).

Parameter | Type | Required
--- | --- | :---:
[hostRef](https://www.npmjs.com/package/@eafmm/core#fmmcreatepanel) | string | &check;
[detailParentRef](https://www.npmjs.com/package/@eafmm/core#fmmcreatepanel) | React.RefObject\<HTMLDivElement\>
[vertical](https://www.npmjs.com/package/@eafmm/core#fmmcreatepanel) | boolean

***
## FmmReactStoreTag
Component to create and manage a [FmmStore](https://www.npmjs.com/package/@eafmm/core#fmmstore).

Property | Type | Required
--- | --- | :---:
[errors](https://www.npmjs.com/package/@eafmm/core#fmmcreatestore) | [FmmMapErrors](https://www.npmjs.com/package/@eafmm/core#fmmmaperrors)
[values](https://www.npmjs.com/package/@eafmm/core#fmmcreatestore) | [FmmMapValues](https://www.npmjs.com/package/@eafmm/core#fmmmapvalues) | &check;

***
## useFmmReactStore
Hook version of [FmmReactStoreTag](#fmmreactstoretag) that returns a [FmmStore](https://www.npmjs.com/package/@eafmm/core#fmmstore).

Parameter | Type | Required
--- | --- | :---:
[values](https://www.npmjs.com/package/@eafmm/core#scp-values) | [FmmMapValues](https://www.npmjs.com/package/@eafmm/core#fmmmapvalues) | &check;
[errors](https://www.npmjs.com/package/@eafmm/core#scp-errors) | [FmmMapErrors](https://www.npmjs.com/package/@eafmm/core#fmmmaperrors)
