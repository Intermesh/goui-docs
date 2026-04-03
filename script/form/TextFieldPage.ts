import {Page} from "../Page.js";
import {
	btn,
	checkbox, comp,
	fieldset,
	form,
	Form as GouiForm, h4, numberfield,
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
			name: "text",
			pattern: "[a-zA-Z0-9_]*",
		}).on("validate", async ({target}) => {
			// Shows how a custom validation can be done. This event supports async operations so you could do a server side
			// check for example.
			if(target.value === "custom") {
				target.setInvalid("You can't use 'custom' as a value");
			}
		})

		this.items.add(
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p({html: "Text fields can have various states and types. Play around with them below."}),


				fieldset({
						legend: "TextField"
					},

					textfield({
						hidden: true,
						name: "hiddenTextField",
						value: "hiddenValue"
					}),

					tf,


					fieldset({
							cls: "card flow",
						},
						comp({text: "Appearance"}),

						comp({style: {display: "grid", gridTemplateColumns: "auto auto", gap: ".8rem"}},

							textfield({
								label: "Prefix",
								listeners: {
									input: ({value}) => {
										tf.prefix = value;
									}
								}
							}),

							textfield({
								label: "Suffix",
								listeners: {
									input: ({value}) => {
										tf.suffix = value;
									}
								}
							}),
						checkbox({
							label: "Disabled",
							listeners: {
								change: ({newValue}) => {
									tf.disabled = newValue;
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
					),

					fieldset({
							cls: "card flow",
						},
						comp({text: "Validation"}),
						p("You can use the following validation options. In the source code you'll also find how to handle a " +
							"custom validation asynchronically. In this example you can't use the text 'custom' as a value. " +
							"Validation occurs when the form is submitted or when an invalid field is changed."),
						checkbox({
							label: "Required",
							listeners: {
								change: ({newValue}) => {
									tf.required = newValue;
									tf.clearInvalid();
								}
							}
						}),

						textfield({
							label: "Pattern",
							value: "[a-zA-Z0-9_]*",
							listeners: {
								input: ({value}) => {
									tf.pattern = value ? value : undefined
									tf.clearInvalid();
								}
							}
						}),

						numberfield({
							label: "Min length",
							decimals: 0,
							listeners: {
								change: ({newValue}) => {
									tf.minLength = newValue;
									tf.clearInvalid();
								}
							}
						}),

						numberfield({
							label: "Max length",
							decimals: 0,
							listeners: {
								change: ({newValue}) => {
									tf.maxLength = newValue;
									tf.clearInvalid();
								}
							}
						})
					)
				),

				fieldset({
						legend: "TextArea"
					},

					textarea({
						label: "Text area",
						name: "textarea",
						height: 160, // in combination with autoHeight this will become a minimum height
						autoHeight: true,
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