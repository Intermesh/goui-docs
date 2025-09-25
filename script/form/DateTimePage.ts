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
	datetimefield, timefield,
	Window, DateTimeField, radio, TimeField, hr
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

				p({html: "This page shows all of the date and time form fields that come with GOUI."}),


				fieldset({

					},

					datefield({
						label: "Date",
						name: "date",
						value: (new DateTime()).format("Y-m-d"),
						min: (new DateTime()).addYears(-2),
						max: (new DateTime()).addDays(-1),
						hint: "Select a date in the past 2 years"
					}),

					hr(),

					datetimefield({
						label: "Date & time",
						name: "datetime",
						value: (new DateTime()).format("Y-m-d"),
						defaultTime: (new DateTime()).format("H:00"),
						min: (new DateTime()).addYears(-2).setHours(13,0),
						max: (new DateTime()).addDays(-1).setHours(13,0),
						hint: "Select a date in the past 2 years",
						listeners: {
							change:({newValue, oldValue}) => {
								console.log("datefield change", newValue, oldValue)
							}
						}
					}),

					checkbox({
						label: "With time",
						value: true,
						listeners: {
							change: ({target, newValue}) => {
								const df = target.previousSibling() as DateTimeField;
								df.withTime = newValue
							}
						}
					}),



					hr(), //for breaking to next line


					timefield({
						name: "time",
						label: "Time",
						value: "22:15",
						listeners: {
							change:({newValue, oldValue}) => {
								console.log("timefield change", newValue, oldValue)
							}
						}
					}),

					radio({
						value: "system",
						listeners: {
							change: ev => {
								const tf = ev.target.previousSibling() as TimeField;
								tf.twelveHour = ev.newValue == "system" ? DateTime.hour12() : ev.newValue == "12h";
							}
						},
						options: [{
							value: "system",
							text: "System format"
						},{
							value: "24h",
							text: "24h"
						},{
							value: "12h",
							text: "12h"
						}]
					})
					,

					hr(), //for breaking to next line

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
					comp(), //for breaking to next line
					daterangefield({
						label: "Range",
						name:"daterange"
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