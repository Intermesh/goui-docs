import {Page} from "../Page.js";
import {
	btn,
	checkbox, comp, DateField, datefield, DateInterval, DateTime, DisplayField, displayfield, durationfield,
	fieldset,
	form,
	Form as GouiForm, Format, h2, h3,
	numberfield,
	p, span,
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

				p({html: "Forms can also be used to present data using display fields."}),


				fieldset({

					},

					comp({cls: "flow"},
						displayfield({
							icon: "person",
							name: "nameDisplay",
							label: "Name",
							value: "Don Doe",
							flex: "1"
						}),

						textfield({
							name: "name",
							label: "Name",
							value: "Don Doe",
							listeners: {
								change:({target, newValue}) => {
									const form = target.findAncestorByType(GouiForm)!;
									form.findField("nameDisplay")!.value = newValue;
								}
							},
							flex: "1",
						}),
					),


					comp({cls: "flow"},
						displayfield({

							icon: "today",
							name: "todayDisplay",
							label: "Date",
							renderer: (v, field) => {
								return (new DateTime(v)).format(Format.dateFormat)
							},
							value: (new DateTime()).format("Y-m-d"), // server typically sends in another format,
							flex: "1",
						}),

						datefield({

							flex: "1",
							name: "today",
							label: "Date",
							value: (new DateTime()).format("Y-m-d"),
							listeners: {
								change:({target, newValue}) => {
									const form = target.findAncestorByType(GouiForm)!
									form.findField("todayDisplay")!.value = newValue;
								}
							}
						})
					)

				),

				h3("Display field with icon renderer"),

				comp({cls: "hbox"},
					checkbox({
						flex: 1,
						name: "icon",
						label: "Toggle icon",
						value: true,
						type: "switch",
						listeners: {
							change:({target, newValue}) => {

								const displayField = target.nextSibling() as DisplayField;
								displayField.value = newValue ? 'check_circle' : 'warning';
							}
						},
					}),
					displayfield({
						flex: 1,
						escapeValue: false,
						name: "icon",
						value: 'check_circle',
						renderer: (v, field) => {
							return `<i class="icon">${v}</i>`;
						}
					}),


				),

				h3("Data in HTML elements"),

				p({},
					span("Data can be loaded into an HTML element by passing the 'tagName': "),
					displayfield({tagName: "strong", name: "email", value: "demo@foo.bar"})
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