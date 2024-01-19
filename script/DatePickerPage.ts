import {Page} from "./Page.js";
import {cardmenu, cards, comp, datepicker, p} from "@intermesh/goui";

export class DatePickerPage extends Page {
	constructor() {
		super();
		this.title = "DatePicker";
		this.sourceURL = './DatePickerPage.ts';

		this.items.add(
			datepicker()
		);
	}
}

