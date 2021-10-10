import React from 'react';
import { Formik, useFormikContext } from 'formik';
import {
	Button as MUButton,
	Checkbox as MUCheckbox,
	FormControl as MUFormControl,
	FormControlLabel as MUFormControlLabel,
	FormGroup as MUFormGroup,
	FormHelperText as MUFormHelperText,
	FormLabel as MUFormLabel,
	ImageList as MUImageList,
	ImageListItem as MUImageListItem,
	InputLabel as MUInputLabel,
	MenuItem as MUMenuItem,
	Radio as MURadio,
	RadioGroup as MURadioGroup,
	Select as MUSelect,
	Switch as MUSwitch,
	TextField as MUTextField
} from '@material-ui/core';
import {
	Button as RBButton,
	Col as RBCol,
	Form as RBForm
} from 'react-bootstrap';
import {
	Field as RFField,
	FieldRenderProps,
	Form as RFForm
} from 'react-final-form';
import {
	FieldArray as RFFieldArray,
	FieldArrayRenderProps
} from 'react-final-form-arrays';
import arrayMutators from 'final-form-arrays';
import * as yup from 'yup';
import '@eafmm/demo/dist/bootstrap4.css'; // Thanks to https://github.com/mribera-erre2web/bootstrap-iso
import { FmmBootstrap4, FmmStoreErrors, FmmStoreImpl  } from '@eafmm/core';
import { Ea, Earthsea, EaState } from '@eafmm/demo';
import {
	FmmMaterialUI,
	FmmReactMinimapProps,
	FmmReactMinimapTag,
	FmmReactPanel,
	FmmReactPanelTag,
	FmmReactStoreTag,
	useFmmReactMinimap
} from './index';

// =================================================================================================================================
//						A P P R E A C T
// =================================================================================================================================
export const AppReact = (): JSX.Element => {
	const titles = ['Uncontrolled Bootstrap4', 'Formik React-B4', 'React Final Material-UI'];
	const thisAnchors = [React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null), React.useRef<HTMLDivElement>(null)];
	const thisDetail = React.useRef<HTMLDivElement>(null);
	const thisHost = React.useRef<HTMLDivElement>(null);
	const thisPage = React.useRef<HTMLDivElement>(null);
	const thisPanel = React.useRef<FmmReactPanel>(null);
	const [anchor, setAnchor] = React.useState(false);
	const [popupDetail, setPanelDetail] = React.useState(false);
	const [step, setStep] = React.useState(0);
	const destroyDetached = (): number => window.setTimeout(() => thisPanel.current?.destroyDetached(), 10);
	const mkey = (step: number) => String(step) + String(anchor) + String(popupDetail);

	return (
		<div ref={thisPage}>
			<style>{Ea.css}</style>
			<div className='headbar' ref={thisHost}>
				<div className='heading'>
					<h1>Earthsea - Form Minimap React</h1>
					<div>Ursule K. LeGuin -- <select onChange={(ev) => setStep(ev.target.selectedIndex)}>
							{titles.map(title => (
								<option key={title} value={title}>{title}</option>
							))}
						</select>
					</div><br/>
					A minimap can be fixed in a panel or <input type='checkbox' onChange={(ev) => {setAnchor(ev.target.checked); destroyDetached()}}/>
						popped up from an anchor.<br/>
					Detail view can shown in the panel or <input type='checkbox' onChange={(ev) => {setPanelDetail(ev.target.checked); destroyDetached()}}/>
						floated per minimap.
				</div>
				<FmmReactPanelTag ref={thisPanel} minimapsCount={titles.length} detailParentRef={thisDetail} />
				<div ref={thisDetail} className='detail' style={{ display: `${popupDetail? 'none': 'block'}` }}></div>
				<div className='anchors'>
					<div className={`${step === 0 ? 'active' : ''}`} ref={thisAnchors[0]}></div>
					<div className={`${step === 1 ? 'active' : ''}`} ref={thisAnchors[1]}></div>
					<div className={`${step === 2 ? 'active' : ''}`} ref={thisAnchors[2]}></div>
				</div>
				<div style={{ clear: 'both' }}></div>
			</div>
			{step === 0 ? (
				<UncontrolledB4 anchorRef={anchor? thisAnchors[0]: undefined} mkey={mkey(0)} pageRef={thisPage} panelRef={thisPanel} title={titles[0]} />
			) : step === 1 ? (
				<FormikRB4 anchorRef={anchor? thisAnchors[1]: undefined} mkey={mkey(1)} pageRef={thisPage} panelRef={thisPanel} title={titles[1]} />
			) : step === 2 ? (
				<ReactFinalMUI anchorRef={anchor? thisAnchors[2]: undefined} mkey={mkey(2)} pageRef={thisPage} panelRef={thisPanel} title={titles[2]} />
			) : undefined}
		</div>
	);
};

// =================================================================================================================================
// =================================================================================================================================
// =================================================	P R I V A T E	============================================================
// =================================================================================================================================
// =================================================================================================================================

// =================================================================================================================================
//						Y U P S C H E M A
// =================================================================================================================================
const YupSchema = yup.object().shape({
	adventure: yup.string().required(Ea.messages.adventure.required),
	adventure2: yup.string().required(Ea.messages.adventure2.required),
	adventureAuto: yup.string().required(Ea.messages.adventureAuto.required),
	agree: yup.bool().oneOf([true], Ea.messages.agree.required),
	danceDate: yup.string().required(Ea.messages.danceDate.required),
	danceRange: yup.number().min(0).max(10).moreThan(6, Ea.messages.danceRange.min),
	danceToggle: yup.bool().oneOf([true], Ea.messages.danceToggle.required),
	deed: yup.string().required(Ea.messages.deed.required),
	email: yup.string().email(Ea.messages.email.email),
	quoteRadios: yup.string().required(Ea.messages.quoteRadios.required),
	realName: yup.string().required(Ea.messages.realName.required).min(6, Ea.messages.realName.min),
	realNames: yup.array().of(yup.string()),
	realNames2: yup.array().of(yup.string()),
	useName: yup.string().required(Ea.messages.useName.required),
	useNames: yup.array().of(yup.string()),
	useNamesAll: yup.array().of(yup.string())
});

// =================================================================================================================================
//						F 0 C
// =================================================================================================================================
interface F0CProps {
	as?: React.ElementType;
	name: string;
	t?: 'checkbox' | 'radio' | 'switch';
}
const F0C: React.FC<F0CProps> = ({ as, name, t }: F0CProps) => {
	const c = Ea.controls[name];
	const { errors, handleChange, submitCount } = useFormikContext<Record<string, string>>();
	const invalid = !!submitCount && !!errors[name];
	// https://github.com/react-bootstrap/react-bootstrap/issues/3939
	return (
		<RBForm.Group as={as} controlId={name}>
			<RBForm.Check type={t || (c.type as 'checkbox' | 'radio' | 'switch')}>
				<RBForm.Check.Input isInvalid={invalid} onChange={handleChange} />
				<RBForm.Check.Label>{c.label}</RBForm.Check.Label>
				{invalid ? <RBForm.Control.Feedback type='invalid'>{errors[name]}</RBForm.Control.Feedback> : undefined}
			</RBForm.Check>
		</RBForm.Group>
	);
};

// =================================================================================================================================
//						F 0 C L
// =================================================================================================================================
interface F0CLProps {
	className: string;
	list: string[];
	listName: string;
}
const F0CL: React.FC<F0CLProps> = ({ className, list, listName }: F0CLProps) => {
	const { handleChange } = useFormikContext<Record<string, string>>();
	return (
		<React.Fragment>
			{list.map((name, i) => (
				<RBForm.Group key={name} className={className}>
					<RBForm.Check id={listName + String(i)} label={name} name={listName} onChange={handleChange} value={name} />
				</RBForm.Group>
			))}
		</React.Fragment>
	);
};

// =================================================================================================================================
//						F 0 I
// =================================================================================================================================
interface F0IProps {
	as?: React.ElementType;
	d?: boolean;
	name: string;
}
const F0I: React.FC<F0IProps> = ({ as, d, name }: F0IProps) => {
	const c = Ea.controls[name];
	const { errors, handleChange, submitCount } = useFormikContext<Record<string, string>>();
	const invalid = !!submitCount && !!errors[name];
	return (
		<RBForm.Group as={as} controlId={name}>
			<RBForm.Label>{c.label}</RBForm.Label>
			<RBForm.Control
				disabled={d}
				isInvalid={invalid}
				onChange={handleChange}
				max={c.max}
				min={c.min}
				placeholder={c.placeholder}
				type={c.type}
			/>
			{invalid ? <RBForm.Control.Feedback type='invalid'>{errors[name]}</RBForm.Control.Feedback> : undefined}
		</RBForm.Group>
	);
};

// =================================================================================================================================
//						F 0 R
// =================================================================================================================================
interface F0RProps {
	ea: EaState;
}
const F0R: React.FC<F0RProps> = ({ ea }: F0RProps) => {
	const name = 'quoteRadios';
	const c = Ea.controls[name];
	const { errors, handleChange, submitCount } = useFormikContext<Record<string, string>>();
	const invalid = submitCount && !!errors[name];
	return (
		<RBForm.Group as={RBCol} required md='9' controlId={name}>
			<RBForm.Label>{c.label}</RBForm.Label>
			{ea.randomQuotes.map(([key, value], i) => (
				<RBForm.Check
					id={name + String(i)}
					key={key}
					label={value}
					name={name}
					onChange={handleChange}
					type='radio'
					value={value}
				/>
			))}
			{invalid ? <RBForm.Control.Feedback type='invalid'>{errors[name]}</RBForm.Control.Feedback> : undefined}
		</RBForm.Group>
	);
};

// =================================================================================================================================
//						F 0 S
// =================================================================================================================================
interface F0SProps {
	as?: React.ElementType;
	multiple?: boolean;
	name: string;
	reRender?: number;
}
const F0S: React.FC<F0SProps> = ({ as, children, name, multiple, reRender }: React.PropsWithChildren<F0SProps>) => {
	const thisRef = React.useRef<HTMLSelectElement>(null);
	const c = Ea.controls[name];
	const { errors, handleChange, setFieldValue, submitCount } = useFormikContext<Record<string, string>>();
	const invalid = !!submitCount && !!errors[name];
	React.useEffect(() => {
		// Value doesn't get updated automatically when selected options are removed dynamically from multiple select
		if (thisRef.current) {
			const sel = Array.from(thisRef.current.selectedOptions).map(o => o.value);
			setFieldValue(name, sel);
		}
	}, [thisRef, name, reRender, setFieldValue]);
	return (
		<RBForm.Group as={as} controlId={name}>
			<RBForm.Label>{c.label}</RBForm.Label>
			<RBForm.Control
				as='select'
				isInvalid={invalid}
				multiple={multiple}
				onChange={handleChange}
				placeholder={c.placeholder}
				ref={multiple ? thisRef : undefined}>
				{children}
			</RBForm.Control>
			{invalid ? <RBForm.Control.Feedback type='invalid'>{errors[name]}</RBForm.Control.Feedback> : undefined}
		</RBForm.Group>
	);
};

// =================================================================================================================================
//						F 0 T
// =================================================================================================================================
interface F0TProps {
	as?: React.ElementType;
	name: string;
}
const F0T: React.FC<F0TProps> = ({ as, name }: F0TProps) => {
	const c = Ea.controls[name];
	const { errors, handleChange, submitCount } = useFormikContext<Record<string, string>>();
	const invalid = !!submitCount && !!errors[name];
	return (
		<RBForm.Group as={as} controlId={name}>
			<RBForm.Label>{c.label}</RBForm.Label>
			<RBForm.Control as='textarea' isInvalid={invalid} onChange={handleChange} placeholder={c.placeholder} />
			{invalid ? <RBForm.Control.Feedback type='invalid'>{errors[name]}</RBForm.Control.Feedback> : undefined}
		</RBForm.Group>
	);
};

// =================================================================================================================================
//						F O R M P R O P S
// =================================================================================================================================
interface FormProps {
	anchorRef?: React.RefObject<HTMLDivElement>;
	mkey: string;
	pageRef: React.RefObject<HTMLDivElement>;
	panelRef: React.RefObject<FmmReactPanel>;
	title: string;
}

// =================================================================================================================================
//						F O R M I K R B 4
// =================================================================================================================================
const FormikRB4: React.FC<FormProps> = ({ anchorRef, mkey, pageRef, panelRef, title }: FormProps) => {
	const [realNamesShown, setRealNamesShown] = React.useState<string[]>([]);
	const [useNamesShown, setUseNamesShown] = React.useState<string[]>([]);
	const thisFmmStore = React.useRef<FmmStoreImpl<Earthsea, FmmStoreErrors>>(null);
	const thisEa = React.useRef(new EaState());
	const ea = thisEa.current;
	ea.setStateMutators(setRealNamesShown, setUseNamesShown);

	return (
		<div className='bootstrap-iso card'>
			<Formik<Earthsea>
				initialValues={Ea.initialValues}
				onSubmit={(_, a) => a.setSubmitting(false)}
				validateOnChange
				validateOnMount
				validationSchema={YupSchema}>
				{({ errors, handleSubmit, values }) => (
					<RBForm className='card-body' noValidate onSubmit={handleSubmit}>
						<FmmReactStoreTag errors={errors as FmmStoreErrors} values={values} ref={thisFmmStore} />
						<FmmReactMinimapTag
							aggregateLabels={Ea.aggregateLabels}
							anchorRef={anchorRef}
							customElementIds={ea.customElementIds}
							framework={FmmBootstrap4}
							key={mkey}
							onUpdate={() => ea.onUpdate()}
							ordinal={parseInt(mkey)}
							pageRef={pageRef}
							panelRef={mkey.endsWith('truetrue')? undefined: panelRef}
							storeRef={thisFmmStore}
							title={title}
							usePanelDetail={mkey.endsWith('false')}
							verbosity={1}
							zoomFactor={2.5}
						/>
						<RBForm.Row>
							<F0I as={RBCol} name='useName' />
							<F0I as={RBCol} name='realName' />
						</RBForm.Row>
						<RBForm.Row>
							<F0R ea={ea} />
							<RBCol>
								<F0I name='email' />
								<F0S name='adventure'>
									{Object.entries(Ea.adventures).map(([key, value]) => (
										<option key={key} value={key}>
											{value}
										</option>
									))}
								</F0S>
							</RBCol>
						</RBForm.Row>
						<hr />
						<RBForm.Row>
							<F0C as={RBCol} name='danceToggle' t='switch' />
							<F0I as={RBCol} name='danceDate' d={!values.danceToggle} />
							<F0I as={RBCol} name='danceRange' d={!values.danceToggle} />
							<F0T as={RBCol} name='deed' />
						</RBForm.Row>
						<hr />
						<RBForm.Row>
							<RBCol>
								<RBForm.Group>
									<RBForm.Label>{Ea.controls.useNamesAll.label}</RBForm.Label>
								</RBForm.Group>
								<div style={{ height: '4.2em', overflowX: 'hidden', overflowY: 'scroll' }}>
									<F0CL list={ea.names1000} listName='useNamesAll' className='form-check m-0' />
								</div>
							</RBCol>
							<RBCol md='6'>
								<RBForm.Group>
									<RBForm.Label>{Ea.controls.useNames.label}</RBForm.Label>
									<RBButton
										variant='outline-dark'
										size='sm'
										className='float-right'
										onClick={ea.fRemoveUncheckedUseNames}>
										-
									</RBButton>
									<RBButton
										variant='outline-dark'
										size='sm'
										className='float-right mr-1'
										onClick={ea.fAddRandomUseName}>
										+
									</RBButton>
									<hr className='clearfix' />
								</RBForm.Group>
								<div style={{ height: '4.2em', overflowX: 'hidden', overflowY: 'scroll' }}>
									<TrackSelectedUseNames ea={ea} values={values} />
									<F0CL
										list={useNamesShown}
										listName='useNames'
										className='form-check-inline col-md-3 col-sm-6 m-0 p-0'
									/>
								</div>
							</RBCol>
							<F0S as={RBCol} name='realNames' multiple reRender={realNamesShown.length}>
								{realNamesShown.map(r => (
									<option key={r} value={r}>
										{r}
									</option>
								))}
							</F0S>
						</RBForm.Row>
						<hr />
						<RBForm.Row>
							<F0C name='agree' />
						</RBForm.Row>
						<div className='text-center'>
							<RBButton variant='primary' className='mr-1' type='submit'>
								Submit
							</RBButton>
							<RBButton variant='secondary' className='mr-1' type='reset'>
								Reset
							</RBButton>
						</div>
					</RBForm>
				)}
			</Formik>
		</div>
	);
};

// =================================================================================================================================
//						R 0 C
// =================================================================================================================================
interface R0CProps extends FieldRenderProps<string, HTMLElement> {
	t?: string;
}
const R0C: React.FC<R0CProps> = ({ input, t, ...rest }: R0CProps) => {
	const name = input.name;
	const c = Ea.controls[name];
	const r = !!Ea.messages[name]?.required;
	return (
		<MUFormGroup>
			<MUFormControlLabel
				control={
					t === 'switch' ? (
						<MUSwitch id={name} placeholder={c.placeholder} required={r} {...input} {...rest} />
					) : (
						<MUCheckbox placeholder={c.placeholder} required={r} {...input} {...rest} />
					)
				}
				label={c.label}
			/>
		</MUFormGroup>
	);
};

// =================================================================================================================================
//						R 0 C L
// =================================================================================================================================
interface R0CLProps extends FieldArrayRenderProps<string, HTMLElement> {
	fullWidth?: boolean;
	options?: string[];
}
const R0CL: React.FC<R0CLProps> = ({ fields, fullWidth, options, ...rest }: R0CLProps) => {
	const listName = fields.name;
	const toggle = (ev: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
		if (checked) {
			fields.push(ev.target.value);
		} else {
			const ix = fields.value.indexOf(ev.target.value);
			if (ix >= 0) fields.remove(ix);
		}
	}
	const width = fullWidth ? { width: '100%' } : undefined;
	return (
		<React.Fragment>
			{options?.map((name: string, i: number) => (
				<MUFormControlLabel
					control={
						<MUCheckbox
							id={listName + String(i)}
							name={listName}
							onChange={toggle}
							size='small'
							{...rest}
							value={name}
						/>
					}
					key={name}
					label={name}
					style={width}
				/>
			))}
		</React.Fragment>
	);
};

// =================================================================================================================================
//						R 0 R
// =================================================================================================================================
interface R0RProps extends FieldRenderProps<string, HTMLElement> {
	ea: EaState;
}
const R0R: React.FC<R0RProps> = ({ ea, input, meta, ...rest }: R0RProps) => {
	const name = input.name;
	const e = meta?.error ? Ea.messages[name][meta.error as string] : undefined;
	return (
		<React.Fragment>
			<MURadioGroup name='quoteRadios' onChange={input.onChange} {...rest}>
				{ea.randomQuotes.map(([key, value]) => (
					<MUFormControlLabel control={<MURadio size='small' />} key={key} label={value} value={key} />
				))}
			</MURadioGroup>
			{e ? <MUFormHelperText>{e}</MUFormHelperText> : undefined}
		</React.Fragment>
	);
};

// =================================================================================================================================
//						R 0 S
// =================================================================================================================================
type R0SProps = FieldRenderProps<string, HTMLElement>;
const R0S: React.FC<R0SProps> = ({ children, input, meta, ...rest }: React.PropsWithChildren<R0SProps>) => {
	const name = input.name;
	const c = Ea.controls[name];
	const e = meta?.error ? Ea.messages[name][meta.error as string] : undefined;
	const r = !!Ea.messages[name]?.required;
	return (
		<MUFormControl>
			<MUInputLabel id={name + '-label'} required={r} shrink>
				{c.label}
			</MUInputLabel>
			<MUSelect autoWidth labelId={name + '-label'} placeholder={c.placeholder} {...input} {...rest}>
				{children}
			</MUSelect>
			{e ? <MUFormHelperText>{e}</MUFormHelperText> : undefined}
		</MUFormControl>
	);
};

// =================================================================================================================================
//						R 0 T
// =================================================================================================================================
type R0TProps = FieldRenderProps<string, HTMLElement>;
const R0T: React.FC<R0TProps> = ({ input, meta, ...rest }: R0TProps) => {
	const name = input.name;
	const c = Ea.controls[name];
	const e = meta?.error ? Ea.messages[name][meta.error as string] : undefined;
	const r = !!Ea.messages[name]?.required;
	return (
		<MUTextField
			fullWidth
			helperText={e}
			label={c.label}
			multiline={c.type === 'textarea' ? true : undefined}
			placeholder={c.placeholder}
			required={r}
			type={c.type}
			InputLabelProps={{ shrink: true }}
			{...input}
			{...rest}
		/>
	);
};

// =================================================================================================================================
//						R E A C T F I N A L M U I
// =================================================================================================================================
const ReactFinalMUI: React.FC<FormProps> = ({ anchorRef, mkey, pageRef, panelRef, title }: FormProps) => {
	const [realNamesShown, setRealNamesShown] = React.useState<string[]>([]);
	const [useNamesShown, setUseNamesShown] = React.useState<string[]>([]);
	const thisFmmStore = React.useRef<FmmStoreImpl<Earthsea, FmmStoreErrors>>(null);
	const thisEa = React.useRef(new EaState());
	const ea = thisEa.current;
	ea.setStateMutators(setRealNamesShown, setUseNamesShown);
	const style = `form .MuiFormControl-root {
		width: 100%;
	}
	form .MuiImageListTile-tile {
		padding: 10px;
	}
	`;
	const validate = (values: Earthsea) => {
		const errors: Record<string, string> = {};
		try {
			YupSchema.validateSync(values, { abortEarly: false });
		} catch (errs) {
			(errs as yup.ValidationError).inner?.forEach(e => (errors[e.path || ''] = e.message));
		}
		return errors;
	};

	return (
		<RFForm initialValues={Ea.initialValues} mutators={{...arrayMutators}} onSubmit={(_: Earthsea) => {/**/}} validate={validate}>
			{({ errors, form, handleSubmit, values }) => (
		<form noValidate onSubmit={handleSubmit}>
			<style>{style}</style>
			<FmmReactStoreTag errors={errors} values={values} ref={thisFmmStore} />
			<FmmReactMinimapTag
				aggregateLabels={Ea.aggregateLabels}
				anchorRef={anchorRef}
				customElementIds={ea.customElementIds}
				framework={FmmMaterialUI}
				key={mkey}
				onUpdate={ea.fOnUpdate}
				ordinal={parseInt(mkey)}
				pageRef={pageRef}
				panelRef={panelRef}
				storeRef={thisFmmStore}
				title={title}
				usePanelDetail={mkey.endsWith('false')}
				verbosity={1}
				zoomFactor={3.0}
				/>
			<TrackSelectedUseNames ea={ea} values={(values as unknown) as Earthsea} />
			<MUImageList cellHeight='auto' cols={4}>
				<MUImageListItem cols={2}>
					<RFField name='useName' component={R0T} />
				</MUImageListItem>
				<MUImageListItem cols={2}>
					<RFField name='realName' component={R0T} />
				</MUImageListItem>
				<MUImageListItem cols={3}>
					<MUFormControl required component='fieldset'>
						<MUFormLabel component='legend'>{Ea.controls.quoteRadios.label}</MUFormLabel>
						<RFField name='quoteRadios' component={R0R} ea={ea} />
					</MUFormControl>
				</MUImageListItem>
				<MUImageListItem>
					<RFField name='email' component={R0T} />
					<MUFormControl />
					<RFField name='adventure' component={R0S}>
						{Object.entries(Ea.adventures).map(([key, value]) => (
							<MUMenuItem key={key} value={key}>
								{value}
							</MUMenuItem>
						))}
					</RFField>
					<MUFormControl />
					<RFField name='adventure2' component={R0S} native>
						{Object.entries(Ea.adventures).map(([key, value]) => (
							<option key={key} value={key}>
								{value}
							</option>
						))}
					</RFField>
				</MUImageListItem>
				<MUImageListItem>
					<RFField name='danceToggle' component={R0C} t='switch' />
				</MUImageListItem>
				<MUImageListItem>
					<RFField name='danceDate' component={R0T} disabled={!values.danceToggle} />
				</MUImageListItem>
				<MUImageListItem>
					<RFField name='danceRange' component={R0T} disabled={!values.danceToggle} min={0} max={10} />
				</MUImageListItem>
				<MUImageListItem>
					<RFField name='deed' component={R0T} />
				</MUImageListItem>
				<MUImageListItem>
					<label>{Ea.controls.useNamesAll.label}</label>
					<hr />
					<div style={{ height: '4.8em', overflowX: 'hidden', overflowY: 'scroll' }}>
						<RFFieldArray
							ea={ea}
							component={R0CL}
							fullWidth
							name='useNamesAll'
							options={ea.names1000}
						/>
					</div>
				</MUImageListItem>
				<MUImageListItem cols={2}>
					<div>
						<label>{Ea.controls.useNames.label}</label>
						<MUButton
							variant='outlined'
							size='small'
							style={{ float: 'right', minWidth: 0 }}
							onClick={ea.fRemoveUncheckedUseNames}>
							-
						</MUButton>
						<MUButton
							variant='outlined'
							size='small'
							style={{ float: 'right', minWidth: 0 }}
							onClick={ea.fAddRandomUseName}>
							+
						</MUButton>
						<hr style={{ clear: 'both' }} />
					</div>
					<div style={{ height: '4.2em', overflowX: 'hidden', overflowY: 'scroll' }}>
						<RFFieldArray component={R0CL} name='useNames' options={useNamesShown} />
					</div>
				</MUImageListItem>
				<MUImageListItem>
					<RFField name='realNames' component={R0S} multiple>
						{realNamesShown.map(r => (
							<MUMenuItem key={r} value={r}>
								{r}
							</MUMenuItem>
						))}
					</RFField>
				</MUImageListItem>
				<MUImageListItem cols={4}>
					<RFField name='agree' component={R0C} />
				</MUImageListItem>
				<MUImageListItem cols={4}>
					<div style={{ textAlign: 'center' }}>
						<MUButton variant='contained' color='primary' type='submit'>
							Submit
						</MUButton>
						<MUButton variant='contained' type='button' onClick={() => form.reset()}>
							Reset
						</MUButton>
					</div>
				</MUImageListItem>
			</MUImageList>
		</form>
			)}
		</RFForm>
	);
};

// =================================================================================================================================
//						T R A C K S E L E C T E D U S E N A M E S
// =================================================================================================================================
interface TrackSelectedUseNamesProps {
	ea: EaState;
	values: Earthsea;
}
const TrackSelectedUseNames: React.FC<TrackSelectedUseNamesProps> = ({ ea, values }: TrackSelectedUseNamesProps) => {
	let useNames = values.useNames || [];
	if (typeof useNames === 'string') useNames = [useNames];
	const thisUseNames = React.useRef<string>('');
	thisUseNames.current = useNames.join(',');
	// eslint-disable-next-line react-hooks/exhaustive-deps
	React.useEffect(() => ea.setUseNamesSelected(useNames), [thisUseNames.current]);
	return null;
};

// =================================================================================================================================
//						U 0 C
// =================================================================================================================================
interface U0CProps {
	className?: string;
	id: string;
	onChange?: React.ChangeEventHandler;
}
const U0C: React.FC<U0CProps> = ({ className, id, onChange, ...rest }: U0CProps) => {
	const c = Ea.controls[id];
	const r = !!Ea.messages[id]?.required;
	return (
		<div className={'form-group form-check ' + (className || '')}>
			<input className='form-check-input' id={id} name={id} onChange={onChange} required={r} type={c.type} {...rest} />
			<label className='form-check-label' htmlFor={id}>
				{c.label}
			</label>
		</div>
	);
};

// =================================================================================================================================
//						U 0 C L
// =================================================================================================================================
interface U0CLProps {
	className: string;
	divHeight: string;
	list: string[];
	listName: string;
	onChange?: React.ChangeEventHandler;
}
const U0CL: React.FC<U0CLProps> = ({ className, divHeight, list, listName, onChange }: U0CLProps) => (
	<div style={{ height: divHeight, overflowX: 'hidden', overflowY: 'scroll' }}>
		{list.map((name, i) => (
			<div key={name} className={className}>
				<input
					className='form-check-input'
					id={listName + String(i)}
					name={listName}
					onChange={onChange}
					type='checkbox'
					value={name}
				/>
				<label className='form-check-label' htmlFor={listName + String(i)}>
					{name}
				</label>
			</div>
		))}
	</div>
);

// =================================================================================================================================
//						U 0 G
// =================================================================================================================================
interface U0GProps {
	className?: string;
	id: string;
}
const U0G: React.FC<U0GProps> = ({ children, className, id }: React.PropsWithChildren<U0GProps>) => {
	const c = Ea.controls[id];
	return (
		<div className={'form-group ' + (className || '')}>
			<label htmlFor={id}>{c.label}</label>
			{children}
		</div>
	);
};

// =================================================================================================================================
//						U 0 I
// =================================================================================================================================
interface U0IProps {
	className?: string;
	disabled?: boolean;
	id: string;
}
const U0I: React.FC<U0IProps> = ({ className, disabled, id, ...rest }: U0IProps) => {
	const c = Ea.controls[id];
	const r = !!Ea.messages[id]?.required;
	return (
		<U0G className={className} id={id}>
			<input
				className='form-control'
				disabled={disabled}
				id={id}
				name={id}
				placeholder={c.placeholder}
				required={r}
				type={c.type}
				{...rest}
			/>
		</U0G>
	);
};

// =================================================================================================================================
//						U 0 S
// =================================================================================================================================
interface U0SProps {
	className?: string;
	id: string;
}
const U0S: React.FC<U0SProps> = ({ children, className, id, ...rest }: React.PropsWithChildren<U0SProps>) => {
	const c = Ea.controls[id];
	const r = !!Ea.messages[id]?.required;
	return (
		<U0G className={className} id={id}>
			<select
				className='form-control'
				id={id}
				multiple={c.size !== undefined}
				name={id}
				required={r}
				size={c.size ? +c.size : undefined}
				{...rest}>
				{children}
			</select>
		</U0G>
	);
};

// =================================================================================================================================
//						U 0 T
// =================================================================================================================================
interface U0TProps {
	className?: string;
	id: string;
}
const U0T: React.FC<U0TProps> = ({ className, id, ...rest }: U0TProps) => {
	const c = Ea.controls[id];
	const r = !!Ea.messages[id]?.required;
	return (
		<U0G className={className} id={id}>
			<textarea className='form-control' id={id} name={id} placeholder={c.placeholder} required={r} {...rest} />
		</U0G>
	);
};

// =================================================================================================================================
//						U N C O N T R O L L E D B 4
// =================================================================================================================================
const UncontrolledB4: React.FC<FormProps> = ({ anchorRef, mkey, pageRef, panelRef, title }: FormProps) => {
	const [danceToggle, setDanceToggle] = React.useState(false);
	const [realNamesShown, setRealNamesShown] = React.useState<string[]>([]);
	const [useNamesShown, setUseNamesShown] = React.useState<string[]>([]);
	const thisEa = React.useRef(new EaState());
	const thisForm = React.useRef<HTMLFormElement>(null);
	const ea = thisEa.current;
	ea.setStateMutators(setRealNamesShown, setUseNamesShown);
	const p: FmmReactMinimapProps = {
		aggregateLabels: Ea.aggregateLabels,
		anchorRef,
		customElementIds: ea.customElementIds,
		framework: FmmBootstrap4,
		onUpdate: ea.fOnUpdate,
		ordinal: parseInt(mkey),
		pageRef,
		panelRef,
		title,
		usePanelDetail: mkey.endsWith('false'),
		verbosity: 1,
		zoomFactor: 2.0
	};
	useFmmReactMinimap(mkey, thisForm, p); // can use hook instead of FmmReactMinimapT

	const onChangeUseName = (ev: React.ChangeEvent<HTMLInputElement>) => {
		ea.onChangeUseName((ev.target as HTMLInputElement).form?.elements.namedItem('useNames') as RadioNodeList);
	};
	const onDanceToggle = (ev: React.ChangeEvent<HTMLInputElement>) => {
		setDanceToggle(ev.target.checked);
	};

	return (
		<div className='bootstrap-iso'>
			<div className='card'>
				<form className='card-body' onSubmit={ea.fSubmit} ref={thisForm}>
					<div className='form-row'>
						<U0I className='col-md-6 col-sm-12' id='useName' />
						<U0I className='col-md-6 col-sm-12' id='realName' />
					</div>
					<div className='form-row'>
						<div className='col-md-9 col-sm-12 px-2'>
							<label>{Ea.controls.quoteRadios.label}</label>
							{ea.randomQuotes.map(([key, value]) => (
								<div key={key} className='form-group form-check m-0'>
									<input
										className='form-check-input'
										required
										type='radio'
										id={'quoteRadios-' + key}
										name='quoteRadios'
										value={value}
									/>
									<label className='form-check-label' htmlFor={'quoteRadios-' + key}>
										{value}
									</label>
								</div>
							))}
						</div>
						<div className='col-md-3 col-sm-12'>
							<U0I className='col-md-12 col-sm-12 mx-0 px-0' id='email' />
							<U0S className='col-md-12 col-sm-12 mx-0 px-0' id='adventure'>
								{Object.entries(Ea.adventures).map(([key, value]) => (
									<option key={key} value={key}>
										{value}
									</option>
								))}
							</U0S>
						</div>
					</div>
					<hr />
					<div className='form-row'>
						<U0C className='col-md-3 col-sm-6 px-2 text-center my-auto' id='danceToggle' onChange={onDanceToggle} />
						<U0I className='col-md-3 col-sm-6 mx-0 px-2' disabled={!danceToggle} id='danceDate' />
						<U0I className='col-md-3 col-sm-6 mx-0 px-2' disabled={!danceToggle} id='danceRange' />
						<U0T className='col-md-3 col-sm-6 mx-0 px-2' id='deed' />
					</div>
					<hr />
					<div className='form-row'>
						<div className='col-md-3 col-sm-6 px-2'>
							<div className='form-group'>
								<label className='align-top'>{Ea.controls.useNamesAll.label}</label>
							</div>
							<U0CL
								divHeight='5em'
								list={ea.names1000}
								listName='useNamesAll'
								className='form-group form-check m-0'
							/>
						</div>
						<div className='col-md-6 col-sm-12 px-2'>
							<div className='form-group'>
								<label className='align-top'>{Ea.controls.useNames.label}</label>
								<button
									type='button'
									className='btn btn-sm btn-outline-dark float-right'
									onClick={ea.fRemoveUncheckedUseNames}>
									--
								</button>
								<button
									type='button'
									className='btn btn-sm btn-outline-dark float-right mr-1'
									onClick={ea.fAddRandomUseName}>
									+
								</button>
								<hr className='clearfix' />
							</div>
							<U0CL
								divHeight='4em'
								list={useNamesShown}
								listName='useNames'
								className='form-group form-check-inline col-md-2 col-sm-4'
								onChange={onChangeUseName}
							/>
						</div>
						<U0S className='col-md-3 col-sm-6' id='realNames'>
							{realNamesShown.map(r => (
								<option key={r} value={r}>
									{r}
								</option>
							))}
						</U0S>
					</div>
					<hr />
					<div className='form-row'>
						<U0C id='agree' />
					</div>
					<div className='text-center'>
						<button className='btn btn-primary mr-1'>Submit</button>
						<button className='btn btn-secondary mr-1' type='reset'>
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
