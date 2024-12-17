import {Page} from "../Page.js";
import {
	btn,
	checkbox, comp, DateField, datefield, DateInterval, daterangefield, DateTime, durationfield,
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


export class DateTimePage extends Page {


	constructor() {
		super();

		this.title = "Date and time fields";
		this.sourceURL = "form/DateTimePage.ts";


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

					datefield({
						label: "Date",
						name: "date",
						value: (new DateTime()).format("Y-m-d"),
						defaultTime: (new DateTime()).format("H:00"),
						min: (new DateTime()).addYears(-2).format("Y-m-d"),
						max: (new DateTime()).addDays(-1).format("Y-m-d"),
						hint: "Select a date in the past 2 years",
						width: 240,
						listeners: {
							change:(field, newValue, oldValue) => {
								console.log("datefield change", newValue, oldValue)
							}
						}
					}),

					checkbox({
						width: 160,
						label: "With time",
						listeners: {
							change: (cb, newVal) => {
								const df = cb.previousSibling() as DateField;

								df.withTime = newVal
							}
						}
					}),

					datefield({
						label: "Date & time",
						name: "datetime",
						withTime: true,
						defaultTime: "13:00",
						value: (new DateTime()).format("Y-m-dTH:i"),
						min: (new DateTime()).addYears(-2).format("Y-m-d"),
						max: (new DateTime()).addDays(-1).format("Y-m-d"),
						hint: "Select a date in the past 2 years"
					}),


					daterangefield({
						label: "Range",
						name:"daterange"
					}),


					comp(), //for breaking to next line


					timefield({
						name: "time",
						label: "Time",
						value: "22:15",
						listeners: {
							change:(field, newValue, oldValue) => {
								console.log("timefield change", newValue, oldValue)
							}
						}
					}),

					comp(), //for breaking to next line

					durationfield({
						name: "duration",
						label: "Duration",
						value: "99:15",
						min: new DateInterval("PT10H"),
						max: new DateInterval("PT100H")
					}),

					durationfield({
						name: "durationMin",
						label: "Duration (min)",
						value: 315,
						outputFormat: "j", //format as total number of minutes
						min: new DateInterval("PT10H"),
						max: new DateInterval("PT100H")
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