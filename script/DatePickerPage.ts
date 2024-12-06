import {Page} from "./Page.js";
import {cardmenu, cards, comp, datepicker, DateTime, h3, monthpicker, p, weekpicker} from "@intermesh/goui"

export class DatePickerPage extends Page {
	constructor() {
		super();
		this.title = "DatePicker";
		this.sourceURL = './DatePickerPage.ts';

		this.items.add(
			h3("Date picker"),
			datepicker(),

			h3("Month picker"),
			monthpicker({
				value: new DateTime()
			}),

			h3("Week picker"),
			weekpicker({
				value: new DateTime()
			}),
		);
	}
}

