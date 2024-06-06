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

						label: "Hint",
						listeners: {
							change: (field, checked) => {
								tf.hint = checked ? t("Please enter something useful") : undefined;
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