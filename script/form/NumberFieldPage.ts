import {Page} from "../Page.js";
import {
	btn,
	checkbox,
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

				p("For numeric input there's a NumberField and RangeField."),


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
							change: (field, checked) => {
								tf.disabled = checked;
							}
						}
					}),

					checkbox({

						label: "Required",
						listeners: {
							change: (field, checked) => {
								tf.required = checked;
							}
						}
					}),

					checkbox({

						label: "Read only",
						listeners: {
							change: (field, checked) => {
								tf.readOnly = checked;
							}
						}
					}),

					checkbox({

						label: "Leading icon",
						listeners: {
							change: (field, checked) => {
								tf.icon = checked ? "favorite" : undefined;
							}
						}
					}),

					checkbox({

						label: "Button",
						listeners: {
							change: (field, checked) => {
								tf.buttons = checked ? [btn({
									icon: "clear",
									handler: (clearBtn) => {
										clearBtn.findAncestorByType(TextField)!.reset();
									}
								})] : undefined
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