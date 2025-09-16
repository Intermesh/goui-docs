import {Page} from "../Page.js";
import {
	btn,
	checkbox, Field,
	fieldset,
	form,
	Form as GouiForm,
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

		const tf = numberfield({
			label: "Number",
			name: "number"
		});

		this.items.add(
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p({html: "For numeric input there's a NumberField and RangeField."}),


				fieldset({
						legend: "NumberField"
					},

					textfield({
						hidden: true,
						name: "hiddenTextField",
						value: "hiddenValue"
					}),

					tf,

					checkbox({
						label: "Disabled",
						listeners: {
							change: ({newValue}) => {
								tf.disabled = newValue;
							}
						}
					}),

					checkbox({
						label: "Required",
						listeners: {
							change: ({newValue}) => {
								tf.required = newValue;
							}
						}
					}),

					checkbox({
						label: "Read only",
						listeners: {
							change: ({newValue}) => {
								tf.readOnly = newValue;
							}
						}
					}),

					checkbox({
						label: "Leading icon",
						listeners: {
							change: ({newValue}) => {
								tf.icon = newValue ? "favorite" : undefined;
							}
						}
					}),

					checkbox({
						label: "Button",
						listeners: {
							change: ({newValue}) => {
								tf.buttons = newValue ? [btn({
									icon: "clear",
									handler: (clearBtn) => {
										const field = clearBtn.findAncestorByType(Field)!;
										field.reset();
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
						label: "Range"
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