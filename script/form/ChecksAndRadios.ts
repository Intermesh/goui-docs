import {Page} from "../Page.js";
import {btn, checkbox, checkboxgroup, fieldset, form, p, radio, tbar, Window} from "@intermesh/goui";


export class ChecksAndRadios extends Page {


	constructor() {
		super();

		this.title = "Checkbox and radio fields";
		this.sourceURL = "form/ChecksAndRadios.ts";


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

					checkbox({
						label: "A checkbox label comes after",
						name: "checkbox"
					}),
					checkbox({
						required: true,
						label: 'Agree to the <a target="_blank" href="/terms">terms</a>',
						name: "cbAgree"
					}),

					checkbox({
						label: "Checkbox type switch",
						name: "cbSwitch",
						type: "switch",
						required: true,
					}),

					checkbox({
						label: "Checkbox type button",
						name: "cbButton",
						type: "button",
						cls: "outlined",
						required: true,
					}),

					checkboxgroup({
						label: "Group",
						options: [
							{label: "Checkbox 1", name: "option1", value: true},
							{label: "Checkbox 2", name: "option2"},
							{label: "Checkbox 3", name: "option3"}
						]
					}),


					radio({
							label: "Radio with type='button'",
							type: "button",
							name: "radio-button",
							value: "option1",
							options: [
								{text: "Radio 1", value: "option1"},
								{text: "Radio 2", value: "option2"},
								{text: "Radio 3", value: "option3"}
							]
						}
					),

					radio({
							label: "Radio with type='box'",
							type: "box",
							name: "radio-box",
							value: "option1",
							options: [
								{text: "Option 1", value: "option1"},
								{text: "Option 2", value: "option2"},
								{text: "Option 3", value: "option3"}
							]
						}
					),
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