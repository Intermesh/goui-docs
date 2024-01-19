import {Page} from "../Page.js";
import {
	btn,
	checkbox, comp, containerfield, DateField, datefield, DateInterval, DateTime, durationfield,
	fieldset,
	form,
	Form as GouiForm,
	numberfield,
	p,
	tbar,
	TextField,
	textfield, timefield,
	Window
} from "@intermesh/goui";


export class ContainerFieldPage extends Page {


	constructor() {
		super();

		this.title = "ContainerField";
		this.sourceURL = "form/ContainerFieldPage.ts";


		this.items.add(
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p("A container field is used to create a sub property in the form object. Press 'Save' below to see the result."),


				fieldset({

					},

					containerfield({
							name: "sub"
						},
						textfield({
							label: "Sub object",
							name: "prop"
						}),
						datefield({
							label: "Sub date",
							name: "date"
						})
					)
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