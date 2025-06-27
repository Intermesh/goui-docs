import {Page} from "../Page.js";
import {
	btn,
	checkbox,
	fieldset,
	form,
	Form as GouiForm,
	p, t,
	tbar,
	textarea,
	TextField,
	textfield,
	Window
} from "@intermesh/goui";


export class TextFieldPage extends Page {


	constructor() {
		super();

		this.title = "TextField";
		this.sourceURL = "form/TextFieldPage.ts";


		const tf = textfield({
			label: "Text",
			name: "text"
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

				p("Text fields can have various states and types. Play around with them below."),


				fieldset({
						legend: "TextField"
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
						label: "Hint",
						listeners: {
							change: ({newValue}) => {
								tf.hint = newValue ? t("Please enter something useful") : undefined;
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
										clearBtn.findAncestorByType(TextField)!.reset();
									}
								})] : []
							}
						}
					}),
				),

				fieldset({
					legend: "TextArea"
				},

					textarea({
						label: "Text area",
						name: "textarea",
						height: 160
					}),
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