import {Page} from "../Page.js";
import {
	btn,
	checkbox, Field,
	fieldset,
	form,
	Form as GouiForm, HtmlField, htmlfield,
	p,
	tbar,
	textarea,
	TextField,
	textfield,
	Window
} from "@intermesh/goui";


export class HtmlFieldPage extends Page {


	constructor() {
		super();

		this.title = "HtmlField";
		this.sourceURL = "form/HtmlFieldPage.ts";

		const tf = htmlfield({
			label: "Html",
			name: "html",
			hint: "Attach files by dropping or pasting them"
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

				p("Forms can handle complex object structures using Container and Array type fields. They don't submit in the traditional way but return a Javascript Object that can be sent using an XHR or fetch API request. To see how this works fill in some data and press 'Save' below."),


				fieldset({
					},

					textfield({
						hidden: true,
						name: "hiddenTextField",
						value: "hiddenValue"
					}),

					tf,

					checkbox({

						label: "Add frame for hint",
						listeners: {
							change: (field, checked) => {
								tf.cls = checked ? "frame-hint" : "";
							}
						}
					}),


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
										clearBtn.findAncestorByType(HtmlField)!.reset();
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
						name: "textarea"
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