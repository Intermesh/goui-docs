import {Page} from "../Page.js";
import {
	btn,
	checkbox,
	fieldset,
	form,
	HtmlField,
	htmlfield,
	p,
	tbar,
	textarea,
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
			value: `
<div>Checkout the text editor in GOUI</div>
<div>Resize the image by dragging the edges:</div>
<div><img src="resources/goui-calendar.png"></div>`,
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

				p({html: "Edit HTML in a user friendly way with the wysiwyg editor. It supports basic editing and image resizing. It also creates lists automatically by typing 1. or - ."}),


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
							change: ({newValue}) => {
								tf.cls = newValue ? "frame-hint" : "";
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