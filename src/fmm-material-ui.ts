import { FmmFormElementHTML, FmmFramework, FmmFrameworkItemHTML } from '@eafmm/core';

// =================================================================================================================================
//						F M M M A T E R I A L U I
// =================================================================================================================================
export const FmmMaterialUI: FmmFramework = {
	createFrameworkItem(_: string, e: FmmFormElementHTML): FmmFrameworkItemHTML {
		if (e.tagName === 'INPUT') {
			const type = (e as HTMLInputElement).type;
			if (type === 'checkbox' || type === 'radio') return G.Check;
		}
		return e.classList.contains('MuiSelect-nativeInput') ? G.Select : G.Other;
	}
};

// =================================================================================================================================
// =================================================================================================================================
// =================================================	P R I V A T E	============================================================
// =================================================================================================================================
// =================================================================================================================================

// =================================================================================================================================
//						F R A M E W O R K I T E M
// =================================================================================================================================
class FrameworkItem extends FmmFrameworkItemHTML {
	// =============================================================================================================================
	public constructor(wrapperClass?: string) {
		super(wrapperClass || 'MuiFormControl-root');
	}

	// =============================================================================================================================
	public getError(_: string, _e: HTMLElement, envelope: HTMLElement, _v: boolean) {
		return envelope?.querySelector('.MuiFormHelperText-root')?.textContent || '';
	}
}

// =================================================================================================================================
//						F R A M E W O R K I T E M C H E C K
// =================================================================================================================================
class FrameworkItemCheck extends FrameworkItem {
	// =============================================================================================================================
	public constructor() {
		super('MuiFormControlLabel-root');
	}

	// =============================================================================================================================
	public getLabel(_: string, envelope: HTMLElement) {
		return envelope?.querySelector('SPAN.MuiFormControlLabel-label') as HTMLElement;
	}
}

// =================================================================================================================================
//						F R A M E W O R K I T E M S E L E C T
// =================================================================================================================================
class FrameworkItemSelect extends FrameworkItem {
	// =============================================================================================================================
	public getValue(name: string, e: HTMLElement, _n: HTMLElement, _l: string) {
		return e.parentElement?.querySelector('#mui-component-select-' + name)?.textContent || '';
	}
}

// =================================================================================================================================
//						G
// =================================================================================================================================
const G = {
	Check: new FrameworkItemCheck(),
	Select: new FrameworkItemSelect(),
	Other: new FrameworkItem()
};
