import {Page} from "../Page.js";
import {
	btn,
	checkbox, comp, DateField, datefield, DateInterval, DateTime, displayfield, durationfield,
	fieldset,
	form,
	Form as GouiForm, Format,
	numberfield,
	p,
	tbar,
	TextField,
	textfield, timefield,
	Window
} from "@intermesh/goui";


export class DisplayFieldPage extends Page {


	constructor() {
		super();

		this.title = "DisplayField";
		this.sourceURL = "form/DisplayFieldPage.ts";


		this.items.add(
			form({
					itemId: "form",
					title: "Form",
					cls: "scroll fit",
					handler: (form) => {

						Window.alert("<code>" + JSON.stringify(form.value, null, 4) + "</code>");
					}
				},

				p("Forms can also be used to present data using display fields."),


				fieldset({

					},

					comp({cls: "hbox gap"},

						displayfield({
							icon: "person",
							name: "nameDisplay",
							label: "Name",
							value: "Don Doe"
						}),

						textfield({
							name: "name",
							label: "Name",
							value: "Don Doe",
							listeners: {
								change:(field, newValue, oldValue) => {
									const form = field.findAncestorByType(GouiForm)!;
									form.findField("nameDisplay")!.value = newValue;
								}
							}
						})
					),

					comp({cls: "hbox gap"},
						displayfield({

							icon: "today",
							name: "todayDisplay",
							label: "Date",
							renderer: (v, field) => {
								return (new DateTime(v)).format(Format.dateFormat)
							},
							value: (new DateTime()).format("Y-m-d") // server typically sends in another format
						}),

						datefield({
							name: "today",
							label: "Date",
							value: (new DateTime()).format("Y-m-d"),
							listeners: {
								change:(field, newValue, oldValue) => {
									const form = field.findAncestorByType(GouiForm)!
									form.findField("todayDisplay")!.value = newValue;
								}
							}
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