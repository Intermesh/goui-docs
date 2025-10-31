import {Page} from "../Page.js";
import {
	btn,
	checkbox, Field,
	fieldset,
	form,
	Form as GouiForm, Format,
	numberfield,
	p, rangefield,
	tbar,
	TextField,
	textfield,
	Window
} from "@intermesh/goui";


export class NumberFieldPage extends Page {


	constructor() {
		super();

		this.title = "NumberField";
		this.sourceURL = "form/NumberFieldPage.ts";

		const numberField = numberfield({
			label: "Number",
			name: "number",
			value: 6003.35,
			min: -10000,
			max: 10000
		});

		this.items.add(
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {
						void Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p({html: "For numeric input there's a NumberField and RangeField."}),


				fieldset({
						legend: "NumberField"
					},

					numberField,

					checkbox({
						label: "Disabled",
						listeners: {
							change: ({newValue}) => {
								numberField.disabled = newValue;
							}
						}
					}),

					checkbox({
						label: "Required",
						listeners: {
							change: ({newValue}) => {
								numberField.required = newValue;
							}
						}
					}),

					checkbox({
						label: "Read only",
						listeners: {
							change: ({newValue}) => {
								numberField.readOnly = newValue;
							}
						}
					}),

					checkbox({
						label: "Leading icon",
						listeners: {
							change: ({newValue}) => {
								numberField.icon = newValue ? "favorite" : undefined;
							}
						}
					}),

					checkbox({
						label: "Button",
						listeners: {
							change: ({newValue}) => {
								numberField.buttons = newValue ? [btn({
									icon: "clear",
									handler: (clearBtn) => {
										const field = clearBtn.findAncestorByType(Field)!;
										field.value = undefined;
									}
								})] : []
							}
						}
					})
				),

				fieldset({
						legend: "RangeField"
					},
					rangefield({
						name: "rangefield",
						label: "Range",
						step: 1
					})
				),

				tbar({cls: "bottom"},

					"->",
					
					btn({
						cls: "primary",
						html: "Save",
						type: "submit"
					})
				)
			)
		)
	}
}