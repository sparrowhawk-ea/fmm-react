# Form Minimap React
React components and hooks for [Form Minimap](https://github.com/sparrowhawk-ea/fmm-core).
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
Adapter for [FmmMinimap](https://github.com/sparrowhawk-ea/fmm-core#fmmminimap) returned from [FmmReactMinimapTag](#fmmreactminimaptag) or [useFmmReactMinimap](#usefmmreactminimap).

| Method
| ---
| [destructor](https://github.com/sparrowhawk-ea/fmm-core#mm-destructor)
| [takeSnapshot](https://github.com/sparrowhawk-ea/fmm-core#mm-takesnapshot)

***
## FmmReactMinimapTag
Component to create and manage a [FmmReactMinimap](#fmmreactminimap).
The minimap is detached when this component is destroyed.
For minimaps in a panel, use the panelRef property; otherwise use the parentRef property to show an always-visible minimap, or anchorRef for a popup minimap.

Property | Type | Required
--- | --- | :---:
[aggregateLabels](https://github.com/sparrowhawk-ea/fmm-core#mcp-aggregatelabels) | [FmmMapString](https://github.com/sparrowhawk-ea/fmm-core#fmmmapstring)
[anchorRef](https://github.com/sparrowhawk-ea/fmm-core#mcp-anchor) | React.RefObject\<HTMLElement\>
[customWidgetIds](https://github.com/sparrowhawk-ea/fmm-core#mm-compose-customwidgetids) | string[]
[debounceMsec](https://github.com/sparrowhawk-ea/fmm-core#mcp-debouncemsec) | number
[dynamicLabels](https://github.com/sparrowhawk-ea/fmm-core#mcp-dynamiclabels) | string[]
[framework](https://github.com/sparrowhawk-ea/fmm-core#mcp-framework) | [FmmFramework](https://github.com/sparrowhawk-ea/fmm-core#fmmframework)
[onUpdate](https://github.com/sparrowhawk-ea/fmm-core#mcp-onupdate) | [FmmOnUpdate](https://github.com/sparrowhawk-ea/fmm-core#fmmonupdate)
[pageRef](https://github.com/sparrowhawk-ea/fmm-core#mcp-page) | React.RefObject\<HTMLElement\>
panelRef | React.RefObject\<[FmmReactPanel](#fmmreactpanelt)\>
[parentRef](https://github.com/sparrowhawk-ea/fmm-core#pcm-parent) | React.RefObject\<HTMLElement\>
[storeRef](https://github.com/sparrowhawk-ea/fmm-core#mcp-store) | React.RefObject\<[FmmStore](https://github.com/sparrowhawk-ea/fmm-core#fmmstore)\>
[title](https://github.com/sparrowhawk-ea/fmm-core#mcp-title) | string | &check;
[usePanelDetail](https://github.com/sparrowhawk-ea/fmm-core#mcp-usepaneldetail) | boolean
[useWidthToScale](https://github.com/sparrowhawk-ea/fmm-core#mcp-usewidthtoscale) | boolean
[verbosity](https://github.com/sparrowhawk-ea/fmm-core#mcp-verbosity) | number
[widgetFactories](https://github.com/sparrowhawk-ea/fmm-core#mcp-widgetfactories) | [FmmWidgetFactory](https://github.com/sparrowhawk-ea/fmm-core#fmmwidgetfactory)[]

***
## useFmmReactMinimap
Hook version of [FmmReactMinimapTag](#fmmreactminimaptag) that returns a [FmmReactMinimap](#fmmreactminimap).

Parameter | Type | Required | Description
--- | --- | :---: | ---
key | string | &check; | Minimap is recreated when key changes.  Any previous minimap is detached.
[form](https://github.com/sparrowhawk-ea/fmm-core#fmmminimapcreateparam) | React.RefObject\<HTMLFormElement\> | &check;
p | FmmReactMinimapProps | &check; | Object with properties of [FmmReactMinimapTag](#fmmreactminimaptag).

***
## FmmReactPanel
Adapter for [FmmPanel](https://github.com/sparrowhawk-ea/fmm-core#fmmpanel) returned from [FmmReactPanelTag](#fmmreactpaneltag) or [useFmmReactPanel](#usefmmreactpanel).

| Method
| ---
| [destroyDetached](https://github.com/sparrowhawk-ea/fmm-core#pm-destroydetached)

***
## FmmReactPanelTag
Component to create and manage a [FmmReactPanel](#fmmreactpanel).

Property | Type | Required
--- | --- | :---:
[detailParentRef](https://github.com/sparrowhawk-ea/fmm-core#pcp-detailparent) | React.RefObject\<HTMLDivElement\>
[vertical](https://github.com/sparrowhawk-ea/fmm-core#pcp-vertical) | boolean

***
## useFmmReactPanel
Hook version of [FmmReactPanelTag](#fmmreactpaneltag) that returns a [FmmReactPanel](#fmmreactpanel).

Parameter | Type | Required
--- | --- | :---:
[hostRef](https://github.com/sparrowhawk-ea/fmm-core#fmmcreatepanel) | string | &check;
[detailParentRef](https://github.com/sparrowhawk-ea/fmm-core#fmmcreatepanel) | React.RefObject\<HTMLDivElement\>
[vertical](https://github.com/sparrowhawk-ea/fmm-core#fmmcreatepanel) | boolean

***
## FmmReactStoreTag
Component to create and manage a [FmmStore](https://github.com/sparrowhawk-ea/fmm-core#fmmstore).

Property | Type | Required
--- | --- | :---:
[errors](https://github.com/sparrowhawk-ea/fmm-core#fmmcreatestore) | [FmmMapErrors](https://github.com/sparrowhawk-ea/fmm-core#fmmmaperrors)
[values](https://github.com/sparrowhawk-ea/fmm-core#fmmcreatestore) | [FmmMapValues](https://github.com/sparrowhawk-ea/fmm-core#fmmmapvalues) | &check;

***
## useFmmReactStore
Hook version of [FmmReactStoreTag](#fmmreactstoretag) that returns a [FmmStore](https://github.com/sparrowhawk-ea/fmm-core#fmmstore).

Parameter | Type | Required
--- | --- | :---:
[values](https://github.com/sparrowhawk-ea/fmm-core#scp-values) | [FmmMapValues](https://github.com/sparrowhawk-ea/fmm-core#fmmmapvalues) | &check;
[errors](https://github.com/sparrowhawk-ea/fmm-core#scp-errors) | [FmmMapErrors](https://github.com/sparrowhawk-ea/fmm-core#fmmmaperrors)
